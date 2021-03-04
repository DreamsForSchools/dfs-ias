'use strict';

var db = require('../db.config');

var Season = function(season) {
    this.name = season.name;
    this.is_current = season.is_current;
};

Season.create = function (newSeason, result) {
    db.query("INSERT INTO seasons set ?", newSeason, function (err, res){
        if (err) result(err, null);
        else result(null, res);
    });
}

Season.deleteById = function (id, result) {
    db.query("DELETE FROM seasons WHERE season_id = ?", id,
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
    db.query("SELECT * from seasons where season_id = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
}

Season.updateById = function (id, season, result) {
    db.query("UPDATE seasons SET name = ?, is_current = ? WHERE season_id = ?",
        [season.name, season.is_current, id],
        function(err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

Season.getCurrent = function (result) {
    db.query("SELECT * from seasons ORDER BY season_id DESC LIMIT 1", function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
};

module.exports = Season;