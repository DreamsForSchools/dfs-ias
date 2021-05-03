'use strict';

var db = require('../db.config');

var Class = function(mClass) {
    this.instructorsNeeded = mClass.instructorsNeeded;
    this.seasonId = mClass.seasonId;
    this.partnerId = mClass.partnerId;
    this.programId = mClass.programId;
    this.timings = mClass.timings;
};

Class.create = function (mClass, result) {
    db.query("INSERT INTO classes (instructorsNeeded, seasonId, partnerId, programId, timings) VALUES (?,?,?,?,?)",[mClass.instructorsNeeded, mClass.seasonId, mClass.partnerId, mClass.programId, JSON.stringify(mClass.timings)], function (err, res){
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
    db.query("UPDATE classes SET instructorsNeeded = ?, timings = ?, seasonId = ?, partnerId = ?, programId = ?  WHERE classId = ?",
        [mClass.instructorsNeeded, mClass.timings, mClass.seasonId, mClass.partnerId, mClass.programId, id],
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

Class.allPartnerClasses = function (id, result) {
    db.query("SELECT * from classes where partnerId = ?", id, function (err, res) {
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