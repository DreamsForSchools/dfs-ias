'use strict';

var axios = require('axios');
var db = require('../db.config');

var Instructor = function(instructor) {
    this.email = instructor.email;
    this.phone  = instructor.phone;
    this.fname = instructor.fname;
    this.lname = instructor.lname;
    this.gender  = instructor.gender;
    this.ethnicity  = instructor.ethnicity;
    this.university = instructor.university;
    this.seasons_taught = instructor.seasons_taught;
    this.school_year  = instructor.school_year;
    this.graduation  = instructor.graduation;
    this.car  = instructor.car;
    this.language_pref  = instructor.language_pref ;
    this.shirtsize = instructor.shirtsize;
    this.firstpref = instructor.firstpref;
    this.secondpref = instructor.secondpref;
    this.thirdpref = instructor.thirdpref;
    this.fourthpref = instructor.fourthpref;
    this.is_ASL = instructor.is_ASL;
    this.major = instructor.major;
    this.availability = instructor.availability;
};

Instructor.create = function (newInstructor, result) {
    let availability = JSON.parse(newInstructor.availability);
    delete newInstructor['availability'];

    db.query("SELECT instructor_id FROM instructors WHERE email = ?", newInstructor.email, function(err,res) {
        if(err) result(err,null);
        else{
            let insertedInstructorID;;            

            //if email exists update seasons_taught
            if(res.length == 1){
                insertedInstructorID = res[0].instructor_id;

                //check if uni place has changed
                db.query("SELECT university FROM instructors WHERE instructor_id = ? ",insertedInstructorID,function(err,res){
                    if(err) result(err,null);
                    else{
                        if(res.length > 0 && res[0].university != newInstructor.university)
                            locationCacheCheck(newInstructor.university, insertedInstructorID, result);
                        db.query("DELETE FROM instructor_availability WHERE instructor_id = ?", insertedInstructorID, function(err,res){
                            if(err) result(err, null);
                            //then insert all availability
                            insertAvailability(availability, insertedInstructorID, result);
                            result(null,res);
                        });
                    } 
                });
                
                //delete all instructor availability with this id
                
            }else{ 
                 //insert new instructor
                db.query("INSERT INTO instructors set ?", newInstructor, function (err, res) {
                    if (err) result(err, null);
                    else {
                        
                        db.query("SELECT instructor_id from instructors WHERE email = ?", newInstructor.email, function (err, res) {
                            if(err) result(err, null);
                            else {
                                insertedInstructorID = res[0].instructor_id;
                                //check if locaction cache has same name
                                locationCacheCheck(newInstructor.university, insertedInstructorID, result);

                                //insert all availability
                                insertAvailability(availability, insertedInstructorID, result);
                                result(null,res);
                            }
                        });
                    }
                });
            }         
        }
    });
}

function locationCacheCheck(instructorUniversity, insertedInstructorID,result){
    db.query("SELECT * FROM location_cache WHERE name = ?", instructorUniversity, function(err,res){
        if(err) result(err,null)
        if(res.length >=1 ){    //if location cache exists, copy data over with new instructor_id
            let location = res[0];
            location.instructor_id = insertedInstructorID;
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
                    if(response.data.candidates[0].photos[0].length > 1)
                        location.image = response.data.candidates[0].photos[0].photo_reference;
                    let date = new Date();
                    axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${location.latitude},${location.longititude}&timestamp=${Math.floor(date.getTime()/1000)}&key=${process.env.GMAP_API_KEY}`)
                    .then((response) => {
                        location.rawOffset = response.data.rawOffset;
                        location.dstOffset = response.data.dstOffset;
                        db.query("INSERT INTO location_cache set ?",location,function(err,res){ //insert location cache w/o instructor id
                            if(err) result(err,null);
                            else{
                                //insert into location cache WITH instructor ID
                                location.instructor_id = insertedInstructorID;
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

function insertLocation(insertedInstructorID,location,result)
{
    db.query("SELECT * FROM location_cache WHERE instructor_id = ?",insertedInstructorID,function(err,res){
        if(err) result(err,null);
        else{
            if(res.length > 0 ){    //instructor already exists, update
                db.query("UPDATE location_cache SET name = ?, image = ?, address = ?, district = ?, longititude = ?, latitude = ?, rawOffset = ?, dstOffset = ?, school_id = ? WHERE instructor_id = ?",
                [location.name, location.image, location.address, location.district, location.longititude, location.latitude, location.rawOffset, location.dstOffset, location.school_id, insertedInstructorID],
                function(err,res){
                    if(err) result(err,null);
                });
            }else{
                 //inserting location with instructor id
                db.query("INSERT INTO location_cache set ?",location,function(err,res){
                    if(err) result(err,null);                    
                });
 
            }
        }

    });
}

function insertAvailability(availability, insertedInstructorID,result)
{
    availability.forEach( el => {
        el.instructor_id = insertedInstructorID;
        db.query("INSERT INTO instructor_availability set ?", el, function(err, res){
            if(err) result(err, null);
        });
    });
}

Instructor.findAll = function (result) {
    db.query("SELECT * from instructors", function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
};

Instructor.findById = function (id, result) {
    db.query("SELECT * from instructors where instructor_id = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);

    });
}

Instructor.deleteById = function (id, result) {
    db.query("DELETE FROM instructors WHERE instructor_id = ?", id,
        function (err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

Instructor.updateById = function (id, instructor, result) {
    db.query("UPDATE instructors SET email = ?, phone = ?, fname = ?, lname = ?, gender = ?, ethnicity = ?, university = ?, seasons_taught = ?, school_year = ?, graduation = ?, shirtsize = ?, car = ?, language_pref = ?, firstpref = ?, secondpref = ?, thirdpref = ?, fourthpref = ?, is_ASL = ?, major = ?  WHERE instructor_id = ?",
        [instructor.email, instructor.phone, instructor.fname, instructor.lname, instructor.gender, instructor.ethnicity, instructor.university, instructor.seasons_taught, instructor.school_year, instructor.graduation, instructor.shirtsize, instructor.car, instructor.language_pref, instructor.firstpref, instructor.secondpref, instructor.thirdpref,instructor.fourthpref, instructor.is_ASL,instructor.major, id],
        function(err, res) {
            if (err) result(err, null);
            else {
                locationCacheCheck(instructor.university, id,result);
                result(null, res);
            }
    })
}

module.exports = Instructor;