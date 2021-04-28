'use strict';

var axios = require('axios');
var db = require('../db.config');

var Instructor = function(instructor) {
    this.firstName = instructor.firstName;
    this.lastName = instructor.lastName;
    this.email = instructor.email;
    this.phoneNumber  = instructor.phoneNumber;
    this.gender  = instructor.gender;
    this.ethnicity  = instructor.ethnicity;
    this.university = instructor.university;
    this.major = instructor.major;
    this.schoolYear  = instructor.schoolYear;
    this.graduationDate  = instructor.graduationDate;
    this.otherLanguages  = instructor.otherLanguages;
    this.programmingLanguages  = instructor.programmingLanguages;
    this.hasCar  = instructor.hasCar;
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

Instructor.createSingle = function (newInstructor, result) {

    //if not approve some how
    if(!newInstructor.approve){
        result("missing approve or is not approved",null);
    }
    
    console.log(newInstructor);
    delete newInstructor['approve'];

    db.query("SELECT * FROM instructors WHERE email = ? OR phoneNumber = ? ",[newInstructor.email, newInstructor.phoneNumber],function(err,res) {
        if (err) result(err, null);
         //if email already exitsts, update instructor
        else if(res.length >= 1){
            let instructorID = res[0].instructorId
            Instructor.updateById(instructorID,newInstructor, result);
        }
        //insert new instructor
        else{
            let availability = newInstructor.availability;
            delete newInstructor['availability'];
            let seasonId = newInstructor.seasonId;
            delete newInstructor['seasonId'];
            db.query("INSERT INTO instructors set ?", newInstructor, function (err, res) {
                if (err) result(err, null);
                else {
                    let insertedInstructorID = res.insertId;

                    //insert all availability
                    insertAvailability(availability, insertedInstructorID, result);

                    // //check if locaction cache exists + inserts location
                    locationCacheCheck(newInstructor.university, insertedInstructorID, result);

                    //add to seasonInstructors
                    db.query("INSERT INTO seasonInstructors (instructorId,seasonId) VALUES (?,?)",[insertedInstructorID,seasonId],function(err,res){
                        if(err) result(err,null);
                    });

                    result(null, res);
                }
            });

        }
    });

}

Instructor.createCSV = function (requestBody, result) {
    let newInstructorArray = requestBody.newInstructorArray;
    let seasonId = requestBody.seasonId

    let responseReturn;

    newInstructorArray.forEach(instructor => {
        Instructor.createSingle({...instructor, seasonId}, function (err, res) {
            if (err) result(err, null);
            else responseReturn = res;
        });
    });
    result(null, responseReturn);
}

//check if location exists (and insert)
function locationCacheCheck(instructorUniversity, insertedInstructorID,result){
    db.query("SELECT * FROM locationCache WHERE name = ?", instructorUniversity, function(err,res){
        if(err) result(err,null)
        if(res.length >=1 ){    //if location cache exists, copy data over with new instructorId
            let location = res[0];
            location.instructorId = insertedInstructorID;
            delete location['id'];
            insertLocation(insertedInstructorID,location,result);
        }else{                  //new gmap
            let location = {};
            location.name = instructorUniversity;
            axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${process.env.GMAP_API_KEY}&inputtype=textquery&input=${instructorUniversity}&inputtype=textquery&fields=geometry,photos,name,formatted_address`)
            .then((response) => {
                if(response.data.status == 'OK' && response.data.candidates.length >= 1){
                    location.address = response.data.candidates[0].formatted_address;
                    location.latitude = response.data.candidates[0].geometry.location.lat; 
                    location.longititude = response.data.candidates[0].geometry.location.lng;
                    if(response.data.candidates[0].photos.length >= 1)
                        location.image = response.data.candidates[0].photos[0].photo_reference;                        
                    let date = new Date();
                    axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${location.latitude},${location.longititude}&timestamp=${Math.floor(date.getTime()/1000)}&key=${process.env.GMAP_API_KEY}`)
                    .then((response) => {
                        location.rawOffset = response.data.rawOffset;
                        location.dstOffset = response.data.dstOffset;
                        db.query("INSERT INTO locationCache set ?",location,function(err,res){ //insert location cache w/o instructor id
                            if(err) result(err,null);
                            else{
                                //insert into location cache WITH instructor ID
                                location.instructorId = insertedInstructorID;
                                insertLocation(insertedInstructorID,location,result);
                            }
                        });
                        
                    });
                }else{
                    result(err,null);
                }
            });
        }
    });
}

//insert location with instructor ID
function insertLocation(insertedInstructorID,location,result)
{
    db.query("SELECT * FROM locationCache WHERE instructorId = ?",insertedInstructorID,function(err,res){
        if(err) result(err,null);
        else{
            if(res.length > 0 && res.name != location.name){    //instructor already exists, update
                db.query("UPDATE locationCache SET name = ?, image = ?, address = ?, district = ?, longititude = ?, latitude = ?, rawOffset = ?, dstOffset = ?, schoolId = ? WHERE instructorId = ?",
                [location.name, location.image, location.address, location.district, location.longititude, location.latitude, location.rawOffset, location.dstOffset, location.schoolId, insertedInstructorID],
                function(err,res){
                    if(err) result(err,null);
                });
            }else{
                 //inserting location with instructor id
                 delete location["locationCacheId"];
                db.query("INSERT INTO locationCache set ?",location,function(err,res){
                    if(err) result(err,null);                    
                });
 
            }
        }

    });
}

function insertAvailability(availability, insertedInstructorID,result)
{
    availability.forEach( el => {
        el.instructorId = insertedInstructorID;
        db.query("INSERT INTO instructorAvailability set ?", el, function(err, res){
            if(err) result(err, null);
        });
    });
}

Instructor.findAll = function (result) {

    db.query("SELECT *, instructorAvailability.id as availabilityId\
        FROM instructors\
        JOIN instructorAvailability ON instructors.instructorId = instructorAvailability.instructorId\
        JOIN locationCache ON instructors.instructorId = locationCache.instructorId\
        JOIN seasonInstructors on instructors.instructorId = seasonInstructors.instructorId;",function(err,res){
            if(err) result(err,null);
            else{
                let rtn = {};

                res.forEach(function(item){
                    var instruct = item;
                    var id = item.instructorId;
        
                    var avaiability = {
                        'availabilityId' : item['availabilityId'],
                        'weekday' : item['weekday'],
                        'startTime' : item['startTime'],
                        'endTime' : item['endTime']
                    };
                    if(id in rtn){
                        rtn[id]['avaiability'].push(avaiability);
                    }else{
                        rtn[id] = instruct;
                        rtn[id]['avaiability'] = [avaiability];
                    }

                    delete instruct['availabilityId'];
                    delete instruct['weekday'];
                    delete instruct['startTime'];
                    delete instruct['endTime'];
                    delete instruct['id'];

                });
                result(null,Object.values(rtn));
            }
        });
};

Instructor.findById = function (id, result) {
    let rtn = {};
    db.query("SELECT * FROM instructors JOIN locationCache ON instructors.instructorId = locationCache.instructorId JOIN seasonInstructors on instructors.instructorId = seasonInstructors.instructorId WHERE instructors.instructorId  = ?", id, function (err, res) {
        if(err) result(err, null);
        else if(res.length >=1) {
            rtn = res[0];
            db.query("SELECT * FROM instructorAvailability WHERE instructorId = ?",id,function(err,res){
                if(err) result(err,null);
                else{
                    rtn['availability'] = res;
                    result(null, rtn);
                }
            });            
        } 
    });
}

Instructor.deleteById = function (id, result) {
    db.query("DELETE FROM instructors WHERE instructorId = ?", id,
        function (err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

Instructor.updateById = function (id, instructor, result) {
    db.query("UPDATE instructors SET email = ?, phoneNumber = ?, firstName = ?, lastName = ?, gender = ?, ethnicity = ?, university = ?,  major = ?, schoolYear  = ?, graduationDate = ?, otherLanguages = ?, programmingLanguages = ?, hasCar = ?, shirtSize = ?, firstPref = ?, secondPref = ?, thirdPref = ?, fourthPref = ?, isASL = ?  WHERE instructorId = ?",
        [instructor.email, instructor.phoneNumber, instructor.firstName, instructor.lastName, instructor.gender, instructor.ethnicity, instructor.university, instructor.major, instructor.schoolYear, instructor.graduationDate, instructor.otherLanguages, instructor.programmingLanguages, instructor.hasCar, instructor.shirtSize, instructor.firstPref, instructor.secondPref, instructor.thirdPref,instructor.fourthPref, instructor.isASL, id],
        function(err, res) {
            if (err) result(err, null);
            else {
                //update seasonInstructor
                db.query("UPDATE seasonInstructors SET seasonId = ? WHERE instructorId = ?",[instructor.seasonId, id],function(err,res){
                    if(err) result(err,null);
                });

                locationCacheCheck(instructor.university, id,result);
                db.query("DELETE FROM instructorAvailability WHERE instructorId = ?", id, function(err,res){
                    if(err) result(err, null);
                    let availability = instructor.availability;
                    insertAvailability(availability, id, result);                    
                    
                });
                result(null,res);
            }
    });
}

module.exports = Instructor;
