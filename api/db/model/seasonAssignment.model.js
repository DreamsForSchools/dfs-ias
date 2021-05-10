'use strict';

const util = require('util');
const mysql = require('mysql2');
var axios = require('axios');

const config = {
    connectionLimit: 100,
    host: process.env.CLOUD_DB_IP,
    user: process.env.CLOUD_DB_DEV_USERNAME,
    password: process.env.CLOUD_DB_DEV_PASSWORD,
    database: process.env.CLOUD_DB_NAME,
    debug: false
}


function makeDb() {
    const connection = mysql.createConnection(config);
    return {
        query(sql, args) {
            return util.promisify(connection.query)
                .call(connection, sql, args);
        },
        close() {
            return util.promisify(connection.end).call(connection);
        }
    };
}

var db = makeDb(config);

var SeasonAssignment = function (assignment) {
    this.seasonId = assignment.seasonId;
    this.instructorId = assignment.instructorId;
    this.classId = assignment.classId;
};

SeasonAssignment.lock = async function (newAssignment,result) {
    try{
        await db.query("INSERT INTO seasonAssignments set ?", newAssignment);
        return result(null, newAssignment);
    } catch(err) {
        return result(err, null);
    }
}

SeasonAssignment.unlock = async function (assignmentToDelete,result) {
    try{
        await db.query("DELETE FROM seasonAssignments WHERE seasonId = ? and instructorId = ? and classId = ?", [assignmentToDelete.seasonId,assignmentToDelete.instructorId, assignmentToDelete.classId]);
        return result(null, assignmentToDelete);
    } catch(err) {
        return result(err, null);
    }
}


// Sort logic is based on the Stable Matching/ Gale–Shapley algorithm
// https://www.geeksforgeeks.org/stable-marriage-problem/
SeasonAssignment.sort = async function (seasonId,result) {
    let sortResults;

    try {
        // Populates distance between instructor and partners for pairings that have not been calculated yet
        await populateDistanceCache();

        // returns a mapping of each classId (that still needs assignments) with it available instructor array
        // {classId: {"classObj": classObj, "availableInstructors": sortResult}}
        let sortData = await getSortData(seasonId);

        console.log("Data Set for available instructors for each class:");
        console.log(JSON.stringify(sortData, null, 2));

        // Applies stable matching algorithm to our data set, returns classId's paired with array of soft assigned instructors.
        sortResults = await executeSort(sortData);

        console.log("Sort Complete, final sort data is: ");
        console.log(sortResults);
        return result(null, sortResults);
    } catch (err) {
        return result(err, null);
    }

}

async function executeSort(sortData) {
    let assignI2C = {}; // (holds soft assignments of Instructor to Classes)
    let assignC2I = {}; // (holds soft assignments of Class to Instructor)

    let loopMore = true;

    while (loopMore) {
        // Break from while loop when an iteration does not result in reassignment of an instructor. (No instructor can be matched with a better class)
        loopMore = false;

        for (const classId of Object.keys(sortData)) {
            let classObj = sortData[classId]["classObj"];
            let currentClassProgramId = classObj.programId;
            let availableInstructors = sortData[classId]["availableInstructors"];
            let instructorRemaining = classObj.instructorRemaining;
            let softAssignedCount = 0;

            // Check to see how many soft assignments the class has in our map
            if (assignC2I[classId]) {
                softAssignedCount = assignC2I[classId].length;
            }

            // if class still needs more instructors
            if (softAssignedCount < instructorRemaining) {

                // loop over availableInstructors for that class in order of closest distance
                for (const instructor of availableInstructors) {

                    // if instructor is hard assigned (locked) they are skipped
                    if (instructor.assignmentCount !== 0) {
                        continue;
                    }

                    // if instructor is not soft assigned in our map yet we assign them to this class
                    if (!assignI2C[instructor.instructorId]) {
                        assignI2C[instructor.instructorId] = classId;
                        if (!assignC2I[classId]) {
                            assignC2I[classId] = [instructor.instructorId];
                        } else {
                            assignC2I[classId].push(instructor.instructorId);
                        }
                        softAssignedCount++;
                    }

                    //  else the instructor is already soft assigned to another class
                    else {
                        let otherClassProgramId = sortData[assignI2C[instructor.instructorId]]["classObj"].programId;
                        let prefArray = JSON.parse(instructor.prefArray);
                        let currentAssignmentRank = prefArray.indexOf(otherClassProgramId) + 1;
                        let currentClassProgramRank = prefArray.indexOf(currentClassProgramId) + 1;

                        // if instructor prefers this new class over the class he is already assigned to, reassign him to this new class
                        if (currentAssignmentRank < currentClassProgramRank) {
                            loopMore = true;

                            let currentSoftAssignedClassId = assignI2C[instructor.instructorId];
                            assignI2C[instructor.instructorId] = classId;
                            if (!assignC2I[classId]) {
                                assignC2I[classId] = [instructor.instructorId];
                            } else {
                                assignC2I[classId].push(instructor.instructorId);
                            }
                            softAssignedCount++;
                            // delete previous instructor assignment from our mapping
                            assignC2I[currentSoftAssignedClassId].splice(assignC2I[currentSoftAssignedClassId].indexOf(instructor.instructorId), 1);
                        }
                    }
                    // Move to next class if the instructor requirement is met
                    if (softAssignedCount === instructorRemaining) {
                        break;
                    }
                }
            }
        }
    }
    return assignC2I;
}

async function getSortData(currentSeasonId) {
    let sortData = {};
    let classObj;

    // Will get all classes that still need instructor assignments
    let unassignedClasses = await db.query("select classes.classId,(classes.instructorsNeeded - (select count(*) from seasonAssignments where seasonAssignments.classId = classes.classId)) as instructorRemaining, instructorsNeeded, timings, partnerId, programId, classes.seasonId\n" +
        "from classes\n" +
        "         left join seasonAssignments on classes.classId = seasonAssignments.classId\n" +
        "where classes.seasonId = ?\n" +
        "  and ((select count(*) from seasonAssignments where seasonAssignments.classId = classes.classId) <\n" +
        "       classes.instructorsNeeded);", currentSeasonId);

    // Will get instructors who are available in the given time slots, in sorted order of distance for a given class
    // Query is dynamically built with the current seasonId, each class timings, and its partnerId for distance
    let sortQueryFragStart = "select distinct instructors.instructorId,\n" +
        "                instructors.university,\n" +
        "                distanceCache.distance,\n" +
        "                CONCAT('[',  (select programId from programs where programs.name = instructors.firstPref), ',',\n" +
        "                (select programId from programs where programs.name = instructors.secondPref), ',',\n" +
        "                (select programId from programs where programs.name = instructors.thirdPref), ',',\n" +
        "                (select programId from programs where programs.name = instructors.fourthPref), ']') as prefArray," +
        "                (select count(*)\n" +
        "                 from seasonAssignments\n" +
        "                 where instructors.instructorId = seasonAssignments.instructorId) as assignmentCount\n" +
        "\n" +
        "from instructors,\n" +
        "     distanceCache,\n" +
        "     instructorAvailability,\n" +
        "     seasonInstructors\n" +
        "         left join seasonAssignments on seasonAssignments.instructorId = seasonInstructors.instructorId\n" +
        "where seasonInstructors.seasonId = ?\n" +
        "  and seasonInstructors.instructorId = instructors.instructorId\n" +
        "  and instructors.instructorId = instructorAvailability.instructorId\n" +
        "  and instructors.university = distanceCache.university\n" +
        "  and distanceCache.partnerId = ?\n" +
        "\n" +
        "  and instructors.instructorId in\n" +
        "      (select instructorAvailability.instructorId\n" +
        "       from instructorAvailability\n" +
        "       where ("

    let sortQueryFragTimings = "(weekday = ? and instructorAvailability.startTime <= ? and instructorAvailability.endTime >= ?)";

    let sortQueryFragEnd = ") GROUP BY instructorAvailability.instructorId\n" +
        "       having count(*) = ?)\n" +
        "ORDER BY distance ASC;"


    for (const aClass in unassignedClasses) {
        let queryArray = [];
        let fullQuery;

        classObj = unassignedClasses[aClass];
        queryArray.push(currentSeasonId);
        queryArray.push(classObj.partnerId);
        fullQuery = sortQueryFragStart;
        for (const time in classObj.timings) {
            fullQuery = fullQuery + sortQueryFragTimings;
            if (time != (classObj.timings).length - 1) {
                fullQuery = fullQuery + " or ";
            }
            queryArray.push(classObj.timings[time].weekday);
            queryArray.push(classObj.timings[time].startTime);
            queryArray.push(classObj.timings[time].endTime);
        }
        fullQuery = fullQuery + sortQueryFragEnd;
        queryArray.push((classObj.timings).length);

        // Will get available instructors in order of distance for a given class
        // Query is dynamically built with the current seasonId, each class timings, and its partnerId for distance
        let sortResult = await db.query(fullQuery, queryArray);

        // Query results are stored into a mapping of each classId with it available instructor array
        // {classId: {"classObj": classObj, "availableInstructors": sortResult}}
        let classInstructors = {"classObj": classObj, "availableInstructors": sortResult}
        sortData[classObj["classId"]] = classInstructors;

    }

    return sortData;

}

async function populateDistanceCache() {
    let universityPlaceId;
    let partnerPlaceId;
    let distance;
    // Gets unique university/partner combinations that do not yet have an entry in distanceCache
    let universityPartnerSet = await db.query("select distinct university, partnerId from instructors cross join partners where (university, partnerId)\n" +
        "NOT IN  (select university, partnerId from distanceCache)");

    for (const pairIndex in universityPartnerSet) {

        // For each unique university/partner pair, get placeId for both university and partner and calculate distance between them using GMAP api
        universityPlaceId = await getUniversityPlaceId(universityPartnerSet[pairIndex].university);
        partnerPlaceId = await getPartnerPlaceId(universityPartnerSet[pairIndex].partnerId);

        distance = await calculateDistance(universityPlaceId, partnerPlaceId);

        // Insert distance into table
        await insertDistance(distance, universityPartnerSet[pairIndex].university, universityPartnerSet[pairIndex].partnerId);
    }

}

async function getUniversityPlaceId(universityName) {
    let universityPlaceId = await db.query("SELECT placeId from locationCache where name = ?", universityName);
    return universityPlaceId[0].placeId;
}

async function getPartnerPlaceId(partnerId) {
    let partnerPlaceId = await db.query("SELECT placeId from locationCache where partnerId = ?", partnerId);
    return partnerPlaceId[0].placeId;
}

async function calculateDistance(universityPlaceId, partnerPlaceId) {
    let response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${universityPlaceId}&destinations=place_id:${partnerPlaceId}&key=${process.env.GMAP_API_KEY}`);
    return response.data.rows[0].elements[0].distance.value;
}

async function insertDistance(distance, university, partnerId) {
    await db.query("INSERT INTO distanceCache (distance, university, partnerId) VALUES (?,?,?)", [distance, university, partnerId])
}

module.exports = SeasonAssignment;