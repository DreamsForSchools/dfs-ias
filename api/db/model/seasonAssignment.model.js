'use strict';

const util = require('util');
const mysql = require('mysql2');
var axios = require('axios');
const Class = require("./class.model");

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


SeasonAssignment.sort = async function (result) {
    let currentSeason = 1;
    let sortResults;

    try {
        await populateDistanceCache();
        let sortData = await getSortData(currentSeason);
        console.log(JSON.stringify(sortData, null, 2));
        sortResults = await executeSort(sortData);
    } catch (err){
        return result(err, null);
    } finally{
        await db.close();
    }
    console.log("Sort Complete, final sort data is: ");
    console.log(sortResults);
    return result(null, sortResults);
}

async function executeSort(sortData) {

    let assignI2C = {};
    let assignC2I = {};
    let loopMore = true
    while (loopMore) {
        loopMore = false;
        for (const classId of Object.keys(sortData)) {
            let classObj = sortData[classId]["classObj"];
            let currentClassProgramId = classObj.programId;
            let availableInstructors = sortData[classId]["availableInstructors"];
            let instructorRemaining = classObj.instructorRemaining;
            let softAssignedCount = 0;
            if (assignC2I[classId]) {
                softAssignedCount = assignC2I[classId].length;
            }
            if (softAssignedCount < instructorRemaining) {
                for (const instructor of availableInstructors) {
                    if (instructor.assignmentCount !== 0) {// already hard assigned/locked
                        continue;
                    }
                    if (!assignI2C[instructor.instructorId]) { // not soft assigned yet
                        assignI2C[instructor.instructorId] = classId;
                        if (!assignC2I[classId]) {
                            assignC2I[classId] = [instructor.instructorId];
                        } else {
                            assignC2I[classId].push(instructor.instructorId);
                        }
                        softAssignedCount++;
                    } else { //already soft assigned by this function
                        let otherClassProgramId = sortData[assignI2C[instructor.instructorId]]["classObj"].programId;
                        let prefArray = JSON.parse(instructor.prefArray);
                        let currentAssignmentRank = prefArray.indexOf(otherClassProgramId) + 1;
                        let currentClassProgramRank = prefArray.indexOf(currentClassProgramId) + 1;

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
                            assignC2I[currentSoftAssignedClassId].splice(assignC2I[currentSoftAssignedClassId].indexOf(instructor.instructorId), 1);
                        }
                    }
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

    let unassignedClasses = await db.query("select classes.classId,(classes.instructorsNeeded - (select count(*) from seasonAssignments where seasonAssignments.classId = classes.classId)) as instructorRemaining, instructorsNeeded, timings, partnerId, programId, classes.seasonId\n" +
        "from classes\n" +
        "         left join seasonAssignments on classes.classId = seasonAssignments.classId\n" +
        "where classes.seasonId = ?\n" +
        "  and ((select count(*) from seasonAssignments where seasonAssignments.classId = classes.classId) <\n" +
        "       classes.instructorsNeeded);", currentSeasonId);


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

        let sortResult = await db.query(fullQuery, queryArray);

        let classInstructors = {"classObj": classObj, "availableInstructors": sortResult}
        sortData[classObj["classId"]] = classInstructors;
        // console.log("CLASS IS: ");
        // console.log(classObj);
        // console.log("INSTRUCTORS FOUND: ");
        // console.log(sortResult);

    }
    // console.log("Sort Data is: ");
    // console.log(JSON.stringify(sortData, null, 2));
    return sortData;

}

async function populateDistanceCache() {
    let universityPlaceId;
    let partnerPlaceId;
    let distance;
    // Gets unique university/partner combinations that do not yet have an entry in distanceCache
    let universityPartnerSet = await db.query("select distinct university, partnerId from instructors  cross join partners where (university, partnerId)\n" +
        "NOT IN  (select university, partnerId from distanceCache)");
    console.log(universityPartnerSet);


    for (const pair in universityPartnerSet) {

        // For each unique university/partner pair, get placeId for both university and partner and calculate distance between them using GMAP api
        universityPlaceId = await getUniversityPlaceId(universityPartnerSet[pair].university);
        partnerPlaceId = await getPartnerPlaceId(universityPartnerSet[pair].partnerId);

        distance = await calculateDistance(universityPlaceId, partnerPlaceId);

        // Insert distance into table
        await insertDistance(distance, universityPartnerSet[pair].university, universityPartnerSet[pair].partnerId);
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