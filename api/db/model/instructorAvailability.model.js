'use strict';

var db = require('../db.config');

var InstructorAvailability = function(instructorAvailability) {
    this.weekday = instructorAvailability.weekday;
    this.startTime = instructorAvailability.startTime;
    this.endTime = instructorAvailability.endTime;
    this.instructorId = instructorAvailability.instructorId;
};

InstructorAvailability.create = function (newInstructorAvailability, result) {
    db.query("INSERT INTO instructorAvailability set ?", newInstructorAvailability, function (err, res){
        if (err) result(err, null);
        else result(null, res);
    })
}

InstructorAvailability.findAll = function (result) {
    db.query("SELECT * FROM instructorAvailability", function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
};

InstructorAvailability.findById = function (id, result) {
    db.query("SELECT * from instructorAvailability where id = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);

    });
}

InstructorAvailability.deleteById = function (id, result) {
    db.query("DELETE FROM instructorAvailability WHERE id = ?", id,
        function (err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

InstructorAvailability.updateById = function (id, instructorAvailability, result) {
    db.query("UPDATE instructorAvailability SET weekday = ?, startTime = ?, endTime = ?, instructorId = ? WHERE id = ?",
        [instructorAvailability.weekday, instructorAvailability.startTime, instructorAvailability.endTime, instructorAvailability.instructorId, id],
        function(err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

module.exports = InstructorAvailability;