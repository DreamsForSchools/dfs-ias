'use strict';

const SeasonAssignment = require('../model/seasonAssignment.model');





exports.lock = function(req, res) {
    const newAssignment = new SeasonAssignment(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }
    else {
        SeasonAssignment.lock(newAssignment, function(err, data) {
            if (err)
                res.send(err);
            else res.send({error:false, message:"Instructor assignment locked successfully!", data:data});
        });
    }
};

exports.unlock = function(req, res) {
    const assignmentToDelete = new SeasonAssignment(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }
    else {
        SeasonAssignment.unlock(assignmentToDelete, function(err, data) {
            if (err)
                res.send(err);
            else res.send({error:false, message:"Instructor assignment unlocked successfully! (deleted) ", data:data});
        });
    }
};


exports.sort = function (req, res) {
    if (!req.body.seasonId) {
        res.status(400).send({error: true, message: "No seasonId provided."});
    } else {
        let seasonId = req.body.seasonId;
        SeasonAssignment.sort(seasonId, function (err, data) {
            if (err)
                res.status(400).send({error: true, err});
            else
                res.send({error: false, message: "Sort finished!", data: data});
        });
    }
};