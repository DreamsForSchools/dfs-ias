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
    db.query("INSERT INTO instructors set ?", newInstructor, function (err, res){
        if (err) result(err, null);
        else result(null, res);
    })
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