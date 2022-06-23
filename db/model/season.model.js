'use strict';

var db = require('../promiseDb.config');

var Season = function(season) {
    this.name = season.name;
    this.startDate = season.startDate;
    this.endDate = season.endDate;
};

Season.create = async function (newSeason, result) {
    try {
        const res = await db.query("INSERT INTO seasons set ?", newSeason);
        result(null, res);
    } catch (e) {
        return result(e, null);
    }
}

Season.deleteById = async function (id, result) {
    try {
        let data = await db.query("DELETE FROM seasons WHERE seasonId = ?");
        result(null, data);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
}

Season.findAll = async function (result) {
    const resultMap = {};

    try {
        const allSeasons = await db.query("SELECT * from seasons;");
        allSeasons.forEach((e) => resultMap[e.seasonId] = {...e});
        result(null, resultMap);
    } catch (e) {
        return result(e, null);
    }
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