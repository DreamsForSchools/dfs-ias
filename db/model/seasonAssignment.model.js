'use strict';
var axios = require('axios');

var db = require('../promiseDb.config.js');
var knex = require('../knexDb.config.js');

var SeasonAssignment = function (assignment) {
    this.seasonId = assignment.seasonId;
    this.instructorId = assignment.instructorId;
    this.classId = assignment.classId;
};

/**
 * @deprecated
 * Fetches distances for instructors to specific school locations. Returns a dictionary, where keys are InstructorIDs and values are distances to the given school
 * @param {*} instructors A list of instructors
 * @param {*} universityPlaceID University Place ID
 * @param {*} partnerPlaceID partner Place ID
 * @returns 
 */
SeasonAssignment.fetchDistancesForInstructors = async function (instructors, universityPlaceID, partnerPlaceID) { 
    try { 
        let universityPartnerSet = await db.query("select distinct university, partnerId from instructors cross join partners");
        console.log("\n LOOK HERE LOOK HERE");
        console.log(universityPartnerSet);
        // 'data' is in the format:
        // {
        //     InstructorID: distanceToSchool,
        //     InstructorID2: distanceToSchool2,
        // }
        let data = {};

    } catch (err) { return result(err, null); }
}

/**
 * @deprecated
 * Fetches all instructorIDs that are availability before the startTime AND after the endTime values that are passed in 
 * @param {*} starTime The time when a class begins. Represented as a String in the database ("14:00:00").
 * @param {*} endTime The time when a class ends. Represented as a String in the database ("14:00:00").
 * @returns 
 */

// TODO: Make a check for the specific season so we're not fetching ALL instructors
SeasonAssignment.fetchAvailableInstructorsDuringTime = async function (data, result) { 
    try { 
        let instructorIDs = await knex('instructorAvailability')
                                .join('seasonInstructors', 'seasonInstructors.instructorId', '=',  'instructorAvailability.instructorId')
                                .select('instructorAvailability.instructorId', 'instructorAvailability.startTime', 'instructorAvailability.endTime', 'instructorAvailability.weekday')
                                .where({'weekday': data.weekday})
                                .where('startTime', '<=', data.startTime)
                                .where('endTime', '>=', data.endTime)
                                .where({'seasonId': data.seasonSelected.seasonId});

        return result(null, instructorIDs);

    } catch (err) { return result(err, null); }
}

/**
 * Adds an individual instructor to the 'seasonAssignment' table
 * @param {*} data 
 * @param {*} result 
 * @returns 
 */
SeasonAssignment.assignInstructor = async function (data, result) { 
    // Schema: assignmentId, seasonId, instructorId, classId
    const { seasonId, instructorId, classId } = data;
    try { 
        await db.query('INSERT INTO seasonAssignments(seasonId, instructorId, classId) VALUES (?, ?, ?);', [seasonId, instructorId, classId]);
        return result(null, instructorId);
    } catch (err) { return result(err, null); }
}

SeasonAssignment.unassignInstructor = async function (data, result) { 
    const { seasonId, instructorId, classId } = data;
    console.log(data);
	try {
		await db.query('DELETE FROM seasonAssignments WHERE seasonId = ? AND instructorId = ? AND classId = ?;', [seasonId, instructorId, classId]);
		return result(null, instructorId);
	} catch (err) {
		return result(err, null);
	}
}

SeasonAssignment.lock = async function (newAssignment, result) {
    try {
        await knex('seasonAssignments').insert({'set': newAssignment});
        return result(null, newAssignment);
    } catch (err) {
        return result(err, null);
    }
}

SeasonAssignment.unlock = async function (assignmentToDelete, result) {
    try {
        await db.query("DELETE FROM seasonAssignments WHERE seasonId = ? and instructorId = ? and classId = ?", [assignmentToDelete.seasonId, assignmentToDelete.instructorId, assignmentToDelete.classId]);
        return result(null, assignmentToDelete);
    } catch (err) {
        return result(err, null);
    }
}

SeasonAssignment.getLockedInstructors = async function (seasonId, result) {
    try {
        let lockedInstructors = await db.query("SELECT * FROM seasonAssignments where seasonId = ?", seasonId);
        let dataMap = {};

        for (const instructor of lockedInstructors) {
            if (!dataMap[instructor.classId]) {
                dataMap[instructor.classId] = [instructor.instructorId];
            } else {
                dataMap[instructor.classId].push(instructor.instructorId);
            }
        }
        return result(null, dataMap);
    } catch (err) {
        return result(err, null);
    }
}

// Sort logic is based on the Stable Matching/ Gale–Shapley algorithm
// https://www.geeksforgeeks.org/stable-marriage-problem/
// pairs classes and instructors together such that there are no combinations who would both rather have each other than their current partners
SeasonAssignment.sort = async function (seasonId, result) {
    let sortResults;

    try {
        // Populates distance between instructor and partners for pairings that have not been calculated yet
        await populateDistanceCache();

        // returns a mapping of each classId (that still needs assignments) with it available instructor array.
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
            let availableInstructors = sortData[classId].availableInstructors;
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
                        console.log("---------------------------");
                        console.log("Assigning Instructor: ");
                        console.log(instructor.instructorId);
                        console.log("To class: ");
                        console.log(classId);
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

                        let otherAssignmentRank = instructor.prefArray.indexOf(otherClassProgramId) + 1;
                        let currentClassProgramRank = instructor.prefArray.indexOf(currentClassProgramId) + 1;

                        // if instructor prefers this new class over the class he is already assigned to, reassign him to this new class (higher index means less preference)
                        if (otherAssignmentRank > currentClassProgramRank) {
                            loopMore = true;
                            console.log("---------------------------");
                            console.log("Already assigned Instructor: ");
                            console.log(instructor.instructorId);
                            console.log("Prefers class: ");
                            console.log(classId);
                            console.log("Over the old class: ");
                            console.log(otherClassProgramId);

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
        "       from instructorAvailability\n"

    let sortQueryFragTimings = "(weekday = ? and instructorAvailability.startTime <= ? and instructorAvailability.endTime >= ?)";

    let sortQueryFragEnd = " GROUP BY instructorAvailability.instructorId\n" +
        "       having count(*) = ?)\n" +
        "ORDER BY distance ASC;"


    for (const aClass in unassignedClasses) {
        let queryArray = [];
        let fullQuery;

        classObj = unassignedClasses[aClass];
        queryArray.push(currentSeasonId);
        queryArray.push(classObj.partnerId);
        fullQuery = sortQueryFragStart;
        if (classObj.timings && classObj.timings.length > 0) {
            fullQuery = fullQuery + "       where (";
            for (const time in classObj.timings) {
                fullQuery = fullQuery + sortQueryFragTimings;
                if (time != (classObj.timings).length - 1) {
                    fullQuery = fullQuery + " or ";
                }
                queryArray.push(classObj.timings[time].weekday);
                queryArray.push(classObj.timings[time].startTime);
                queryArray.push(classObj.timings[time].endTime);
            }
            fullQuery = fullQuery + ")";
        }
        fullQuery = fullQuery + sortQueryFragEnd;
        console.log("---------------------------------------------------------------------------------------")
        console.log("Full query to get all available instructors for a given class sorted by distance: ");
        console.log(fullQuery);
        console.log("---------------------------------------------------------------------------------------")
        queryArray.push((classObj.timings).length);

        // Will get available instructors in order of distance for a given class
        // Query is dynamically built with the current seasonId, each class timings, and its partnerId for distance
        let sortResult = await db.query(fullQuery, queryArray);
        // console.log("❗️ Sort result for class:");
        // console.log(classObj);
        // console.log(sortResult);

        // Perform secondary sort on preference. All instructors for a given distance should be sorted in order of
        // preference for the program being taught
        let sortedInstructors = await secondarySort(sortResult, classObj.programId);

        // Query results are stored into a mapping of each classId with it available instructor array
        // {classId: {"classObj": classObj, "availableInstructors": sortResult}}
        let classInstructors = {"classObj": classObj, "availableInstructors": sortedInstructors}
        sortData[classObj["classId"]] = classInstructors;

    }

    return sortData;

}

// Performs a secondary sort on the available instructors for each class.
// All instructors for the same distance should be sorted in order of preference for the given programId
async function secondarySort(availableInstructors, programId) {
    let masterIndex = 0;
    let chunkSize = 0;
    let chunk;
    let finalArray = [];
    let tempArray = [];

    if (availableInstructors.length === 0) {
        return availableInstructors;
    }

    for (const instructor of availableInstructors) {
        if (instructor.prefArray) {
            let prefArray = JSON.parse(instructor.prefArray);
            instructor.prefArray = prefArray;
        }
    }

    // Determine size of chunk (how many instructors with the same distance) and extracts it so that we can sort it
    chunkSize = 1;
    let distance = availableInstructors[masterIndex]["distance"];

    while (true) {
        masterIndex = masterIndex + 1;
        if (masterIndex >= availableInstructors.length) {
            // extract chunk and sort it in order of preference
            if (chunkSize > 0) {
                chunk = availableInstructors.slice(masterIndex - chunkSize, masterIndex);
                tempArray = await reorderChunk(chunk, programId);
                finalArray = finalArray.concat(tempArray);
            }
            break;
        } else if (distance === availableInstructors[masterIndex]["distance"]) {
            chunkSize = chunkSize + 1;
            continue;
        } else {
            distance = availableInstructors[masterIndex]["distance"]
            // extract chunk and sort it in order of preference
            chunk = availableInstructors.slice(masterIndex - chunkSize, masterIndex);
            tempArray = await reorderChunk(chunk, programId);
            finalArray = finalArray.concat(tempArray);
            chunkSize = 1;
        }
    }
    return finalArray;
}

// Receives chunk of instructors with the same distance and reorders them by preference for the given programId
async function reorderChunk(sameDistanceInstructors, programId) {
    let rank = 0
    let preferenceArrayMaxSize = 4;
    let newArray = [];

    while (rank < preferenceArrayMaxSize) {
        for (const instructor of sameDistanceInstructors) {
            if (instructor.prefArray) {
                let assignmentRank = instructor.prefArray.indexOf(programId);
                if (assignmentRank === rank) {
                    newArray.push(instructor);
                }
            }
        }
        rank = rank + 1;
    }
    for (const instructor of sameDistanceInstructors) {
        if (instructor.prefArray) {
            let assignmentRank = instructor.prefArray.indexOf(programId);
            if (assignmentRank === -1) {
                newArray.push(instructor);
            }
        }
    }
    return newArray;
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

        console.log("-----------------------------------------------------------")
        console.log("-----------------------------------------------------------")
        console.log("-----------------------------------------------------------")
        console.log(distance, universityPartnerSet[pairIndex].university, universityPartnerSet[pairIndex].partnerId);
        console.log("-----------------------------------------------------------")
        console.log("-----------------------------------------------------------")
        console.log("-----------------------------------------------------------")

        // Insert distance into table
        await insertDistance(distance, universityPartnerSet[pairIndex].university, universityPartnerSet[pairIndex].partnerId);
    }

}

async function getUniversityPlaceId(universityName) {
    let universityPlaceID = await knex('locationCache').select('placeId').where('name', universityName);
    return universityPlaceID[0].placeId;
}

async function getPartnerPlaceId(partnerId) {
    let partnerPlaceID = await knex('locationCache').select('placeId').where('partnerId', partnerId);
    return partnerPlaceID[0].placeId;
}
/**
 * Returns the distance from a university to the defined partner
 * @param {*} universityPlaceId 
 * @param {*} partnerPlaceId 
 * @returns 
 */
async function calculateDistance(universityPlaceId, partnerPlaceId) {
    let response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${universityPlaceId}&destinations=place_id:${partnerPlaceId}&key=${process.env.GMAP_API_KEY}`);
    return response.data.rows[0].elements[0].distance.value;
}

async function insertDistance(distance, university, partnerId) {
    await db.query("INSERT INTO distanceCache (distance, university, partnerId) VALUES (?,?,?)", [distance, university, partnerId])
}

module.exports = SeasonAssignment;
