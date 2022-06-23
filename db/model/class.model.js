'use strict';

var db = require('../promiseDb.config');

var Class = function(mClass) {
    this.instructorsNeeded = mClass.instructorsNeeded;
    this.seasonId = mClass.seasonId;
    this.partnerId = mClass.partnerId;
    this.programId = mClass.programId;
    this.timings = mClass.timings;
};

Class.create =  async function (mClass, result) {
    try {
        const res = await db.query(
            "INSERT INTO classes (instructorsNeeded, seasonId, partnerId, programId, timings) VALUES (?,?,?,?,?)",
            [mClass.instructorsNeeded, mClass.seasonId, mClass.partnerId, mClass.programId, JSON.stringify(mClass.timings)]);
        result(null, res);
    } catch (e) {
        return result(e, null);
    }
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

Class.deleteById = async function (id, result) {
    try {
        let data = await db.query("DELETE FROM classes WHERE classId = ?", id);
        result(null, data);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
}

Class.updateById = async function (id, mClass, result) {
    try {
        const res = await db.query("UPDATE classes SET instructorsNeeded = ?, timings = ?, seasonId = ?, partnerId = ?, programId = ?  WHERE classId = ?",
          [mClass.instructorsNeeded, JSON.stringify(mClass.timings), mClass.seasonId, mClass.partnerId, mClass.programId, id]);
        result(null, res);
    } catch (e) {
        return result(e, null);
    }
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
