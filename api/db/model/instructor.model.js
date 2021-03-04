'use strict';

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
    //post
    //do location
    //do schedule [{},{}]
};

Instructor.create = function (newInstructor, result) {
    let availability = JSON.parse(newInstructor.availability);
    delete newInstructor['availability'];

    db.query("SELECT instructor_id FROM instructors WHERE email = ?", newInstructor.email, function(err,res) {
        if(err) result(err,null);
        else{
            let insertedInstructorID;;
            console.log(res);
            console.log(res.length);
            console.log(typeof res);
            

            //if email exists update seasons_taught
            if(res.length == 1){
                console.log("======instructor exists, updating======");
                insertedInstructorID = res[0].instructor_id;
                //check if uni place has changed
                //if has, check if has cache
                locationCacheCheck(newInstructor, insertedInstructorID);

                //delete all instructor availability with this id
                db.query("DELETE FROM instructor_availability WHERE instructor_id = ?", insertedInstructorID, function(err,res){
                    if(err) result(err, null);
                    //then insert all availability
                    insertAvailability(availability, insertedInstructorID)
                });
            }else{  
                console.log("======inserting new instructo======");
                //else insert new instructor
                db.query("INSERT INTO instructors set ?", newInstructor, function (err, res) {
                    if (err) result(err, null);
                    else {
                        
                        db.query("SELECT instructor_id from instructors WHERE email = ?", newInstructor.email, function (err, res) {
                            if(err) result(err, null);
                            else {
                                insertedInstructorID = res[0].instructor_id;
                                //check if locaction cache has same name
                                locationCacheCheck(newInstructor, insertedInstructorID);

                                //insert all availability
                                insertAvailability(availability, insertedInstructorID);
                            }
                        });
                    }
                });
            }         
        }
    });
}

function locationCacheCheck(newInstructor, insertedInstructorID){
    db.query("SELECT * FROM location_cache WHERE name = ?", newInstructor.university, function(err,res){
        if(err) result(err,null)
        if(res.length >=1 ){    //has same name, copy data over with new instructor_id
            let location = res[0];
            location.instructor_id = insertedInstructorID;
            delete location['id'];
            console.log("=== inserting into location cache, dup location ===");
            console.log(location);
            db.query("INSERT INTO location_cache set ?",location,function(err,res){
                if(err) result(err,null);
            });
        }else{//new gmap
            console.log("=== location doesnt exist, calling gmap ===");
            let location;
            location.instructor_id = insertedInstructorID;
            location.name = newInstructor.university;
            // location.address
            // location.longititude  
            // location.latitude   
            // location.rawOffset   
            // location.dstOffset 
            axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${process.env.GMAP_API_KEY}&inputtype=textquery&input=${newInstructor.university}`)
            .then((response) => {res.send(response.data)});
        }
    });
}

function insertAvailability(availability, insertedInstructorID)
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
        [instructor.email, instructor.phone, instructor.fname, instructor.lname, instructor.gender, instructor.ethnicity, instructor.university, instructor.seasons_taught, instructor.school_year, instructor.graduation, instructor.car, instructor.language_pref, instructor.shirtsize, instructor.firstpref, instructor.secondpref, instructor.thirdpref,instructor.fourthpref, instructor.is_ASL,instructor.major, id],
        function(err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

module.exports = Instructor;