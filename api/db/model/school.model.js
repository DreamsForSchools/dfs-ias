'use strict';

var db = require('../sqlconnector');

var School = function(school) {
    this.name = school.name;
    this.city = school.city;
    this.state = school.state;
    this.zip = school.zip;
    this.lang_request = school.lang_request;
};

School.create = function (newSchool, result) {
    db.query("INSERT INTO schools set ?", newSchool, function (err, res){
        if (err) result(err, null);
        else result(null, res);
    })
}

School.findAll = function (result) {
    db.query("SELECT * from schools", function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
};

School.findById = function (id, result) {
    db.query("SELECT * from schools where school_id = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
}

School.deleteById = function (id, result) {
    db.query("DELETE FROM schools WHERE school_id = ?", id,
        function (err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

School.updateById = function (id, school, result) {
    db.query("UPDATE schools SET name = ?, city = ?, state = ?, zip = ?,lang_request = ? WHERE school_id = ?",
        [school.name, school.city, school.state, school.zip, school.lang_request, id],
        function(err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

module.exports = School;