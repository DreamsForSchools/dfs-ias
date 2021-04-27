'use strict';

var db = require('../db.config');

var Class = function(mClass) {
    this.instructorsNeeded = mClass.instructorsNeeded;
    this.seasonId = mClass.seasonId;
    this.schoolId = mClass.schoolId;
    this.programId = mClass.programId;
    this.timings = mClass.timings;
};

Class.create = function (newClass, result) {
    db.query("INSERT INTO classes set ?", newClass, function (err, res){
        if (err) result(err, null);
        else result(null, res);
    })
}

Class.findAll = function (result) {
    db.query("SELECT * from classes", function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
};

Class.findById = function (id, result) {
    db.query("SELECT * from classes where classId = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
}

Class.deleteById = function (id, result) {
    db.query("DELETE FROM classes WHERE classId = ?", id,
        function (err, res) {
            if (err) result(err, null);
            else result(null, res);
        })
}

Class.updateById = function (id, mClass, result) {
    db.query("UPDATE classes SET instructorsNeeded = ?, timings = ?, seasonId = ?, schoolId = ?, programId = ?  WHERE classId = ?",
        [mClass.instructorsNeeded, mClass.timings, mClass.seasonId, mClass.schoolId, mClass.programId, id],
        function(err, res) {
            if (err) result(err, null);
            else result(null, res);
        })
}

Class.allProgramClasses = function (id, result) {
    db.query("SELECT * from classes where programId = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
}

Class.allSchoolClasses = function (id, result) {
    db.query("SELECT * from classes where schoolId = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
}

Class.allSeasonClasses = function (id, result) {
    db.query("SELECT * from classes where seasonId = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
}

module.exports = Class;