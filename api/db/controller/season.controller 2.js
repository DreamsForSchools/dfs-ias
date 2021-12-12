'use strict';

const Season = require('../model/season.model');

exports.create = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        const new_season = new Season(req.body);
        //handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required fields'});
        } else {
            Season.create(new_season, function (err, season) {
                if (err)
                    res.status(400).send({error: true, err});
                else res.send({error: false, message: "Season added successfully!", data: season});
            });
        }
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
};

exports.findAll = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Season.findAll(function (err, season) {
            if (err) res.status(400).send({error: true, err});
            else res.send(season);
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
};

exports.deleteById = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Season.deleteById(req.params.id, function (err, season) {
            if (err) res.send({error: true, err});
            else if (season.affectedRows === 0) res.send({error: true, message: "Deletion Failed, no rows affected!"})
            else res.send({error: false, message: "Deletion Successful!", data: season});
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}

exports.findById = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Season.findById(req.params.id, function (err, season) {
            console.log(season);
            if (err) res.send({error: true, err});
            else if (season == "") res.send({error: true, message: "No Season found!"});
            else res.send(season);
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}

exports.updateById = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Season.updateById(req.params.id, new Season(req.body), function (err, season) {
            if (err) res.send({error: true, err});
            else if (season.affectedRows === 0) res.send({error: true, message: "Update Failed!"})
            else res.send({error: false, message: "Update Successful!", data: season});
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}


exports.getCurrent = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Season.getCurrent(function (err, season) {
            if (err) res.send({error: true, err});
            else res.send(season);
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
};
