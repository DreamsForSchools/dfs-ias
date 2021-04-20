'use strict';

var db = require('../db.config');

var Section = function(section) {
    this.instructorsNeeded = section.instructorsNeeded;
    this.seasonId = section.seasonId;
    this.schoolId = section.schoolId;
    this.programId = section.programId;
    this.timings = section.timings;
};

Section.create = function (newSection, result) {
    db.query("INSERT INTO sections set ?", newSection, function (err, res){
        if (err) result(err, null);
        else result(null, res);
    })
}

Section.findAll = function (result) {
    db.query("SELECT * from sections", function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
};

Section.findById = function (id, result) {
    db.query("SELECT * from sections where sectionId = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
}

Section.deleteById = function (id, result) {
    db.query("DELETE FROM sections WHERE sectionId = ?", id,
        function (err, res) {
            if (err) result(err, null);
            else result(null, res);
        })
}

Section.updateById = function (id, section, result) {
    db.query("UPDATE sections SET instructorsNeeded = ?, timings = ?, seasonId = ?, schoolId = ?, programId = ?  WHERE sectionId = ?",
        [section.instructorsNeeded, section.timings, section.seasonId, section.schoolId, section.programId, id],
        function(err, res) {
            if (err) result(err, null);
            else result(null, res);
        })
}

Section.allProgramSections = function (id, result) {
    db.query("SELECT * from sections where programId = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
}

Section.allSchoolSections = function (id, result) {
    db.query("SELECT * from sections where schoolId = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
}

Section.allSeasonSections = function (id, result) {
    db.query("SELECT * from sections where seasonId = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
}

module.exports = Section;