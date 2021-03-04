'use strict';

var db = require('../db.config');

var Section = function(section) {
    this.instructors_needed = section.instructors_needed;
    this.season_id = section.season_id;
    this.school_id = section.school_id;
    this.program_id = section.program_id;
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
    db.query("SELECT * from sections where section_id = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
}

Section.deleteById = function (id, result) {
    db.query("DELETE FROM sections WHERE section_id = ?", id,
        function (err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

Section.updateById = function (id, section, result) {
    db.query("UPDATE sections SET instructors_needed = ?, timings = ?, season_id = ?, school_id = ?, program_id = ?  WHERE section_id = ?",
        [section.instructors_needed, section.timings, section.season_id, section.school_id, section.program_id, id],
        function(err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

Section.allProgramSections = function (id, result) {
    db.query("SELECT * from sections where program_id = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
}

Section.allSchoolSections = function (id, result) {
    db.query("SELECT * from sections where school_id = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
}

Section.allSeasonSections = function (id, result) {
    db.query("SELECT * from sections where season_id = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
}

module.exports = Section;