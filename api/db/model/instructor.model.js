'use strict';
var axios = require('axios');
var db = require('../promiseDb.config.js');

var Instructor = function (instructor) {
    this.firstName = instructor.firstName;
    this.lastName = instructor.lastName;
    this.email = instructor.email;
    this.phoneNumber = instructor.phoneNumber;
    this.gender = instructor.gender;
    this.ethnicity = instructor.ethnicity;
    this.university = instructor.university;
    this.major = instructor.major;
    this.schoolYear = instructor.schoolYear;
    this.graduationDate = instructor.graduationDate;
    this.otherLanguages = instructor.otherLanguages;
    this.programmingLanguages = instructor.programmingLanguages;
    this.hasCar = instructor.hasCar;
    this.shirtSize = instructor.shirtSize;
    this.firstPref = instructor.firstPref;
    this.secondPref = instructor.secondPref;
    this.thirdPref = instructor.thirdPref;
    this.fourthPref = instructor.fourthPref;
    this.isASL = instructor.isASL;
    this.availability = instructor.availability;
    this.approve = instructor.approve;
    this.seasonId = instructor.seasonId;
};

Instructor.createSingle = async function (newInstructor, result) {

    try {
        // Starting transaction
        await db.beginTransaction();

        console.log(newInstructor);
        delete newInstructor['approve'];

        let exists = await db.query("SELECT * FROM instructors WHERE email = ? OR phoneNumber = ? ", [newInstructor.email, newInstructor.phoneNumber]);

        if (exists.length > 0)//update
        {
            await Instructor.updateById(exists[0].instructorId, newInstructor);
        } else {
            let availability = newInstructor.availability;
            delete newInstructor['availability'];
            let seasonId = newInstructor.seasonId;
            delete newInstructor['seasonId'];
            let insertedInstructor = await db.query("INSERT INTO instructors set ?", newInstructor);
            let insertedInstructorID = insertedInstructor.insertId;
            await insertAvailability(availability, insertedInstructorID);

            //location
            let location = await getLocationCacheBy(newInstructor.university);
            if (location.length == 0) {
                location = await getGmapLocation(newInstructor);
            }
            location.instructorId = insertedInstructorID;

            await db.query("INSERT INTO seasonInstructors (instructorId,seasonId) VALUES (?,?)", [insertedInstructorID, seasonId]);
            let results = await db.query("INSERT INTO locationCache set ?", location);

            // Commit changes if everything went well
            await db.commit();

            if (result) {
                result(null, results);
            }
        }

    } catch (err) {
        // Rollback changes if something went wrong
        await db.rollback();

        console.log(err);
        if (result) {
            result(null, err);
        }
    }

}

Instructor.createCSV = async function (requestBody, result) {
    let newInstructorArray = requestBody.newInstructorArray;
    let seasonId = requestBody.seasonId

    let responseReturn;

    try {
        let i = 0;
        for (i = 0; i < newInstructorArray.length; i++) {
            responseReturn = await Instructor.createSingle({...newInstructorArray[i], seasonId});
        }

        result(null, responseReturn);
    } catch (err) {
        console.log(err);
        result(err, null);

    }
}

Instructor.allSeasonInstructors = async function (seasonId, result) {
    const instructorMap = {};

    try {
        let allSeasonInstructors = await db.query("SELECT *, instructors.instructorId as instructorId\n" +
            "        FROM instructors\n" +
            "        JOIN instructorAvailability ON instructors.instructorId = instructorAvailability.instructorId\n" +
            "        JOIN locationCache ON instructors.instructorId = locationCache.instructorId\n" +
            "        JOIN seasonInstructors on instructors.instructorId = seasonInstructors.instructorId\n" +
            "        LEFT JOIN seasonAssignments on  instructors.instructorId = seasonAssignments.instructorId\n" +
            "        LEFT JOIN classes on  seasonAssignments.classId = classes.classId\n" +
            "        where seasonInstructors.seasonId = ?", seasonId);


        allSeasonInstructors.forEach((e) => {

            if (e.instructorId in instructorMap) {

                instructorMap[e.instructorId]['availability'].push({
                    availabilityId: e.id,
                    weekday: e.weekday,
                    startTime: e.startTime,
                    endTime: e.endTime
                });

                let instClasses = instructorMap[e.instructorId]['classes'];
                if (e.classId && e.classId !== (instClasses[instClasses.length - 1].classId)) {
                    instructorMap[e.instructorId]['classes'].push({
                        classId: e.classId,
                        instructorsNeeded: e.instructorsNeeded,
                        partnerId: e.partnerId,
                        programId: e.programId,
                        timings: e.timings
                    });
                }

            } else {
                instructorMap[e.instructorId] = e;

                instructorMap[e.instructorId]['availability'] = [{
                    availabilityId: e.id,
                    weekday: e.weekday,
                    startTime: e.startTime,
                    endTime: e.endTime
                }];
                if (e.classId) {
                    instructorMap[e.instructorId]['classes'] = [{
                        classId: e.classId,
                        instructorsNeeded: e.instructorsNeeded,
                        partnerId: e.partnerId,
                        programId: e.programId,
                        timings: e.timings
                    }];
                }

                delete instructorMap[e.instructorId]["id"];
                delete instructorMap[e.instructorId]["weekday"];
                delete instructorMap[e.instructorId]["startTime"];
                delete instructorMap[e.instructorId]["endTime"];
                delete instructorMap[e.instructorId]["locationCacheId"];
                delete instructorMap[e.instructorId]["name"];
                delete instructorMap[e.instructorId]["district"];
                delete instructorMap[e.instructorId]["partnerId"];
                delete instructorMap[e.instructorId]["seasonId"];
                delete instructorMap[e.instructorId]["assignmentId"];
                delete instructorMap[e.instructorId]["classId"];
                delete instructorMap[e.instructorId]["instructorsNeeded"];
                delete instructorMap[e.instructorId]["timings"];
                delete instructorMap[e.instructorId]["programId"];

            }
        });

        result(null, instructorMap);
    } catch (err) {
        return result(err, null);
    }
}


async function getLocationCacheBy(name) {
    let rtn;
    rtn = await db.query("SELECT * FROM locationCache where name = ?", name);
    if (rtn.length > 0) rtn = rtn[0];
    delete rtn['locationCacheId'];
    delete rtn['instructorId'];
    delete rtn['partnerId'];
    return rtn;
}

async function getGmapLocation(instructor) {

    let location = {};
    location.name = instructor.university;
    let gmapPlace = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${process.env.GMAP_API_KEY}&inputtype=textquery&input=${instructor.university}&inputtype=textquery&fields=geometry,photos,name,formatted_address,place_id`);
    // console.log("gmap", gmapPlace);

    if (gmapPlace.data.status == 'OK' && gmapPlace.data.candidates.length >= 1) {
        location.address = gmapPlace.data.candidates[0].formatted_address;
        location.latitude = gmapPlace.data.candidates[0].geometry.location.lat;
        location.longititude = gmapPlace.data.candidates[0].geometry.location.lng;
        location.placeId = gmapPlace.data.candidates[0].place_id;
        let date = new Date();
        let gmapTimeZone = await axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${location.latitude},${location.longititude}&timestamp=${Math.floor(date.getTime() / 1000)}&key=${process.env.GMAP_API_KEY}`);
        // console.log("gmapTimeZone", gmapTimeZone);
        location.rawOffset = gmapTimeZone.data.rawOffset;
        location.dstOffset = gmapTimeZone.data.dstOffset;
    }
    return location;
}

//#region old locationCache
//check if location exists (and insert)
function locationCacheCheck(instructorUniversity, insertedInstructorID, result) {
    db.query("SELECT * FROM locationCache WHERE name = ?", instructorUniversity, function (err, res) {
        if (err) result(err, null)
        if (res.length >= 1) {    //if location cache exists, copy data over with new instructorId
            let location = res[0];
            location.instructorId = insertedInstructorID;
            delete location['id'];
            insertLocation(insertedInstructorID, location, result);
        } else {                  //new gmap
            let location = {};
            location.name = instructorUniversity;
            axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${process.env.GMAP_API_KEY}&inputtype=textquery&input=${instructorUniversity}&inputtype=textquery&fields=geometry,photos,name,formatted_address,place_id`)
                .then((response) => {
                    if (response.data.status == 'OK' && response.data.candidates.length >= 1) {
                        location.address = response.data.candidates[0].formatted_address;
                        location.latitude = response.data.candidates[0].geometry.location.lat;
                        location.longititude = response.data.candidates[0].geometry.location.lng;
                        location.placeId = response.data.candidates[0].place_id;
                        if (response.data.candidates[0].photos != undefined && response.data.candidates[0].photos.length >= 1)
                            location.image = response.data.candidates[0].photos[0].photo_reference;
                        let date = new Date();
                        axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${location.latitude},${location.longititude}&timestamp=${Math.floor(date.getTime() / 1000)}&key=${process.env.GMAP_API_KEY}`)
                            .then((response) => {
                                location.rawOffset = response.data.rawOffset;
                                location.dstOffset = response.data.dstOffset;
                                db.query("INSERT INTO locationCache set ?", location, function (err, res) { //insert location cache w/o instructor id
                                    if (err) result(err, null);
                                    else {
                                        //insert into location cache WITH instructor ID
                                        location.instructorId = insertedInstructorID;
                                        insertLocation(insertedInstructorID, location, result);
                                    }
                                });

                            });
                    } else {
                        result(err, null);
                    }
                });
        }
    });
}

//insert location with instructor ID
function insertLocation(insertedInstructorID, location, result) {
    db.query("SELECT * FROM locationCache WHERE instructorId = ?", insertedInstructorID, function (err, res) {
        if (err) result(err, null);
        else {
            if (res.length > 0 && res.name != location.name) {    //instructor already exists, update
                db.query("UPDATE locationCache SET name = ?, image = ?, address = ?, district = ?, longititude = ?, latitude = ?, rawOffset = ?, dstOffset = ?, partnerId = ?, placeId = ? WHERE instructorId = ?",
                    [location.name, location.image, location.address, location.district, location.longititude, location.latitude, location.rawOffset, location.dstOffset, location.partnerId, location.placeId, insertedInstructorID],
                    function (err, res) {
                        if (err) {
                            console.log(err);
                            result(err, null);
                        } else {
                            result(null, res);
                        }
                    });
            } else {
                //inserting location with instructor id

                delete location["locationCacheId"];
                db.query("INSERT INTO locationCache set ?", location, function (err, res) {
                    if (err) result(err, null);
                });

            }
        }

    });
}

//#endregion

async function insertAvailability(availability, insertedInstructorID) {
    let i = 0;
    for (i = 0; i < availability.length; i++) {
        let el = availability[i];
        el.instructorId = insertedInstructorID;
        await db.query("INSERT INTO instructorAvailability set ?", el);
    }
}

Instructor.findAll = function (result) {

    db.query("SELECT *, instructorAvailability.id as availabilityId\
        FROM instructors\
        JOIN instructorAvailability ON instructors.instructorId = instructorAvailability.instructorId\
        JOIN locationCache ON instructors.instructorId = locationCache.instructorId\
        JOIN seasonInstructors on instructors.instructorId = seasonInstructors.instructorId;", function (err, res) {
        if (err) result(err, null);
        else {
            let rtn = {};

            res.forEach(function (item) {
                var instruct = item;
                var id = item.instructorId;

                var availability = {
                    'availabilityId': item['availabilityId'],
                    'weekday': item['weekday'],
                    'startTime': item['startTime'],
                    'endTime': item['endTime']
                };
                if (id in rtn) {
                    rtn[id]['availability'].push(availability);
                } else {
                    rtn[id] = instruct;
                    rtn[id]['availability'] = [availability];
                }

                delete instruct['availabilityId'];
                delete instruct['weekday'];
                delete instruct['startTime'];
                delete instruct['endTime'];
                delete instruct['id'];

            });
            result(null, Object.values(rtn));
        }
    });
};

Instructor.findById = function (id, result) {
    let rtn = {};
    db.query("SELECT * FROM instructors JOIN locationCache ON instructors.instructorId = locationCache.instructorId JOIN seasonInstructors on instructors.instructorId = seasonInstructors.instructorId WHERE instructors.instructorId  = ?", id, function (err, res) {
        if (err) result(err, null);
        else if (res.length >= 1) {
            rtn = res[0];
            db.query("SELECT * FROM instructorAvailability WHERE instructorId = ?", id, function (err, res) {
                if (err) result(err, null);
                else {
                    rtn['availability'] = res;
                    result(null, rtn);
                }
            });
        }
    });
}

Instructor.deleteById = async function (id, result) {
    try {
        let data = await db.query("DELETE FROM instructors WHERE instructorId = ?", id);
        result(null, data);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
}

Instructor.updateById = async function (id, instructor, result) {

    console.log("updating", id, "\n", instructor);
    try {
        let oldInstructor = await db.query("SELECT * FROM instructors WHERE instructorId = ?", id);

        let updatedInstructor = await db.query("UPDATE instructors SET email = ?, phoneNumber = ?, firstName = ?, lastName = ?, gender = ?, ethnicity = ?, university = ?,  major = ?, schoolYear  = ?, graduationDate = ?, otherLanguages = ?, programmingLanguages = ?, hasCar = ?, shirtSize = ?, firstPref = ?, secondPref = ?, thirdPref = ?, fourthPref = ?, isASL = ?  WHERE instructorId = ?",
            [instructor.email, instructor.phoneNumber, instructor.firstName, instructor.lastName, instructor.gender, instructor.ethnicity, instructor.university, instructor.major, instructor.schoolYear, instructor.graduationDate, instructor.otherLanguages, instructor.programmingLanguages, instructor.hasCar, instructor.shirtSize, instructor.firstPref, instructor.secondPref, instructor.thirdPref, instructor.fourthPref, instructor.isASL, id])


        await db.query("UPDATE seasonInstructors SET seasonId = ? WHERE instructorId = ?", [instructor.seasonId, id]);
        await db.query("DELETE FROM instructorAvailability WHERE instructorId = ?", id);
        let results = await insertAvailability(instructor.availability, id, result);
        if (oldInstructor[0].university != instructor.university) {
            let location = await getLocationCacheBy(instructor.university);
            if (location.length == 0) {
                location = await getGmapLocation(instructor);
            }
            results = await db.query("INSERT INTO locationCache set ?", location);
        }

        if (result) {
            result(null, results);
        }

    } catch (err) {
        console.log(err);
        if (result) {
            result(err, null);
        }
    }
}

module.exports = Instructor
