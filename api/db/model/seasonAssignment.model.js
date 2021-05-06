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


SeasonAssignment.sort = async function (result) {
    await populateDistanceCache();
    await db.close();
    return result(null, "Sort Complete");
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

        distance = await calculateDistance(universityPlaceId,partnerPlaceId);

        // Insert distance into table
        await insertDistance(distance,universityPartnerSet[pair].university,universityPartnerSet[pair].partnerId);
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

async function calculateDistance(universityPlaceId, partnerPlaceId){
    let response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${universityPlaceId}&destinations=place_id:${partnerPlaceId}&key=${process.env.GMAP_API_KEY}`);
    return response.data.rows[0].elements[0].distance.value;
}

async function insertDistance(distance,university,partnerId){
    await db.query("INSERT INTO distanceCache (distance, university, partnerId) VALUES (?,?,?)",[distance, university, partnerId])
}

module.exports = SeasonAssignment;