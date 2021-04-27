'use strict';

var db = require('../db.config');

var Season = function(season) {
    this.name = season.name;
    this.startDate = season.startDate;
    this.endDate = season.endDate;
};

Season.create = function (newSeason, result) {
    db.query("INSERT INTO seasons set ?", newSeason, function (err, res){
        if (err) result(err, null);
        else result(null, res);
    });
}

Season.deleteById = function (id, result) {
    db.query("DELETE FROM seasons WHERE seasonId = ?", id,
        function (err, res) {
            if (err) result(err, null);
            else result(null, res);
        })
}

Season.findAll = function (result) {
    db.query("SELECT * from seasons", function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
};


Season.findById = function (id, result) {
    db.query("SELECT * from seasons where seasonId = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
}

Season.updateById = function (id, season, result) {
    db.query("UPDATE seasons SET name = ?, startDate = ?, endDate = ?  WHERE seasonId = ?",
        [season.name, season.startDate, season.endDate, id],
        function(err, res) {
            if (err) result(err, null);
            else result(null, res);
        })
}

Season.getCurrent = function (result) {
    db.query("SELECT * from seasons ORDER BY seasonId DESC LIMIT 1", function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
};

module.exports = Season;