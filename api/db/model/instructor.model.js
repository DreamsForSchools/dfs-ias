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
    this.shirtsize = instructor.shirtsize;
    this.firstPref = instructor.firstPref;
    this.secondPref = instructor.secondPref;
    this.thirdPref = instructor.thirdPref;
    this.fourthPref = instructor.fourthPref;
    this.isASL = instructor.isASL;
    this.availability = instructor.availability;
};

Instructor.createSingle = function (newInstructor,result){
    let availability = JSON.parse(newInstructor.availability);
    delete newInstructor['availability'];
    
    console.log(newInstructor);
    db.query("INSERT INTO instructors set ?", newInstructor, function (err, res) {
        if (err) result(err, null);
        else {
            db.query("SELECT instructorId from instructors WHERE email = ?", newInstructor.email, function (err, res) {
                if(err) result(err, null);
                else {
                    let insertedInstructorID = res[0].instructorId;
                    //insert all availability
                    insertAvailability(availability, insertedInstructorID, result);

                    //check if locaction cache has same name
                    locationCacheCheck(newInstructor.university, insertedInstructorID, result);

                    result(null,res);
                }
            });
        }
    });

}

Instructor.createCSV = function (requestBody, result) {
    

    let CSVjson = JSON.parse(requestBody.CSVraw);
    let responseReturn;
    CSVjson.forEach( el => {
        el.availability = JSON.stringify(el.availability);
        axios.post('http://localhost:5000/api/instructor',el).then((response) => {
            responseReturn = response;
        }, (error) => {
            responseReturn = error;       
            result(error,null);     //TODO unsure what to put here
        });

    });
    result(null,responseReturn);

    

    // let CSVjson = JSON.parse(requestBody.CSVraw);
    
    // CSVjson.availability = JSON.stringify(CSVjson.availability);

    // let responseReturn;

    //     axios.post('http://localhost:5000/api/instructor',CSVjson).then((response) => {
    //         responseReturn = response;
    //     }, (error) => {
    //         responseReturn = error;       
    //         result(error,null);     //TODO unsure what to put here
    //     });
    // result(null,responseReturn);

    


    
    




    // let availability = JSON.parse(newInstructor.availability);
    // delete newInstructor['availability'];

    // db.query("SELECT * FROM instructors WHERE email = ?", newInstructor.email, function(err,res) {
    //     if(err) result(err,null);
    //     else{
    //         let insertedInstructorID;;            

    //         //if email exists update seasons_taught
    //         if(res.length == 1){
    //             insertedInstructorID = res[0].instructorId;
    //             db.query("UPDATE instructors SET seasons_taught = ? WHERE instructorId = ?", [res[0].seasons_taught+1, insertedInstructorID], function(err,res){
    //                 if(err) result(err,null);
    //                 else{
    //                     //check if uni place has changed
    //                     db.query("SELECT university FROM instructors WHERE instructorId = ? ",insertedInstructorID,function(err,res){
    //                         if(err) result(err,null);
    //                         else{
    //                             if(res.length > 0 && res[0].university != newInstructor.university)
    //                                 locationCacheCheck(newInstructor.university, insertedInstructorID, result);
    //                                 //delete all instructor availability with this id
    //                             db.query("DELETE FROM instructorAvailability WHERE instructorId = ?", insertedInstructorID, function(err,res){
    //                                 if(err) result(err, null);
    //                                 //then insert all availability
    //                                 insertAvailability(availability, insertedInstructorID, result);
    //                                 result(null,res);
    //                             });
    //                         } 
    //                     });
    //                 }
    //             });             
                
    //         }else{ 
    //              //insert new instructor
    //             db.query("INSERT INTO instructors set ?", newInstructor, function (err, res) {
    //                 if (err) result(err, null);
    //                 else {
                        
    //                     db.query("SELECT instructorId from instructors WHERE email = ?", newInstructor.email, function (err, res) {
    //                         if(err) result(err, null);
    //                         else {
    //                             insertedInstructorID = res[0].instructorId;
    //                             //check if locaction cache has same name
    //                             locationCacheCheck(newInstructor.university, insertedInstructorID, result);

    //                             //insert all availability
    //                             insertAvailability(availability, insertedInstructorID, result);
    //                             result(null,res);
    //                         }
    //                     });
    //                 }
    //             });
    //         }         
    //     }
    // });
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
            if(res.length > 0 ){    //instructor already exists, update
                db.query("UPDATE locationCache SET name = ?, image = ?, address = ?, district = ?, longititude = ?, latitude = ?, rawOffset = ?, dstOffset = ?, school_id = ? WHERE instructorId = ?",
                [location.name, location.image, location.address, location.district, location.longititude, location.latitude, location.rawOffset, location.dstOffset, location.school_id, insertedInstructorID],
                function(err,res){
                    if(err) result(err,null);
                });
            }else{
                 //inserting location with instructor id
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

    db.query("SELECT *, instructorAvailability.id as availabilityId, locationCache.id as locationId\
        FROM instructors\
        JOIN instructorAvailability ON instructors.instructorId = instructorAvailability.instructorId\
        JOIN locationCache ON instructors.instructorId = locationCache.instructorId;",function(err,res){
            if(err) result(err,null);
            else{
                let rtn = {};

                res.forEach(function(item){
                    var instruct = item;
                    var id = item.instructorId;
        
                    var avaiability = {
                        'id' : item['availability_id:'],
                        'weekday' : item['weekday'],
                        'start_time' : item['startTime'],
                        'end_time' : item['endTime']
                    };
                    if(id in rtn){
                        rtn[id]['avaiability'].push(avaiability);
                    }else{
                        rtn[id] = instruct;
                        rtn[id]['avaiability'] = [avaiability];
                    }

                    delete instruct['availability_id:'];
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
    db.query("SELECT * FROM instructors JOIN locationCache ON instructors.instructorId = locationCache.instructorId WHERE instructors.instructorId  = ?", id, function (err, res) {
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
    db.query("UPDATE instructors SET email = ?, phoneNumber = ?, firstName = ?, lastName = ?, gender = ?, ethnicity = ?, university = ?,  major = ?, schoolYear  = ?, graduationDate = ?, otherLanguages = ?, programmingLanguages = ?, hasCar = ?, shirtsize = ?, firstPref = ?, secondPref = ?, thirdPref = ?, fourthPref = ?, isASL = ?  WHERE instructorId = ?",
        [instructor.email, instructor.phoneNumber, instructor.firstName, instructor.lastName, instructor.gender, instructor.ethnicity, instructor.university, instructor.major, instructor.schoolYear, instructor.graduationDate, instructor.otherLanguages, instructor.programmingLanguages, instructor.hasCar, instructor.shirtsize, instructor.firstPref, instructor.secondPref, instructor.thirdPref,instructor.fourthPref, instructor.isASL, id],
        function(err, res) {
            if (err) result(err, null);
            else {
                locationCacheCheck(instructor.university, id,result);
                db.query("DELETE FROM instructorAvailability WHERE instructorId = ?", id, function(err,res){
                    if(err) result(err, null);
                    let availability = JSON.parse(instructor.availability);
                    delete instructor['availability'];
                    insertAvailability(availability, id, result);
                    result(null,res);
                });
            }
    })
}

module.exports = Instructor;