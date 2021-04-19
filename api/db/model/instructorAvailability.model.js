'use strict';

var db = require('../db.config');

var InstructorAvailability = function(instructorAvailability) {
    this.weekday = instructorAvailability.weekday;
    this.start_time = instructorAvailability.start_time;
    this.end_time = instructorAvailability.end_time;
    this.instructor_id = instructorAvailability.instructor_id;
};

InstructorAvailability.create = function (newInstructorAvailability, result) {
    db.query("INSERT INTO instructor_availability set ?", newInstructorAvailability, function (err, res){
        if (err) result(err, null);
        else result(null, res);
    })
}

InstructorAvailability.findAll = function (result) {
    db.query("SELECT * FROM instructor_availability", function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
};

InstructorAvailability.findById = function (id, result) {
    db.query("SELECT * from instructor_availability where id = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);

    });
}

InstructorAvailability.deleteById = function (id, result) {
    db.query("DELETE FROM instructor_availability WHERE id = ?", id,
        function (err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

InstructorAvailability.updateById = function (id, instructorAvailability, result) {
    db.query("UPDATE instructor_availability SET weekday = ?, start_time = ?, end_time = ?, instructor_id = ? WHERE id = ?",
        [instructorAvailability.weekday, instructorAvailability.start_time, instructorAvailability.end_time, instructorAvailability.instructor_id, id],
        function(err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

module.exports = InstructorAvailability;