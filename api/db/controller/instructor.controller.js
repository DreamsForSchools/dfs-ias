'use strict';

const Instructor = require('../model/instructor.model');

exports.findAll = function(req, res) {
    Instructor.findAll(function(err, instructor) {
      if (err) res.status(400).send({error:true, message:'Failed to find all instructors'});
      else res.send(instructor);
    });
};

exports.createSingle = function(req, res) {
    const new_instructor = new Instructor(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }
    else {
        Instructor.createSingle(new_instructor, function(err, instructor) {
            if (err) res.status(400).send({error:true, message:'Failed to create Instructor'});
            else res.json({error:false, message:"Instructor added successfully!",data:instructor});
        });
    }
};

exports.createCSV = function(req, res) {
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }
    else {
        Instructor.createCSV(req.body, function(err, instructor) {
            if (err) res.status(400).send({error:true, message: 'Failed to create CSV'});
            else res.json({error:false, message:"Instructor added successfully!",data:instructor});
        });
    }
};

exports.allSeasonInstructors =  function(req, res) {
    if (!req.params.seasonId) {
        res.status(400).send({error: true, message: "No seasonId provided."});
    } else {
        let seasonId = req.params.seasonId;
        Instructor.allSeasonInstructors(seasonId, function(err, data) {
            if (err)
                res.status(500).send({error: true, err});
            else
                res.send(data);
        });
    }
};


exports.findById = function(req, res) {
    Instructor.findById(req.params.id, function(err, instructor) {
        if (err) res.status(400).send({error:true, message: 'Failed find by id'});
        else res.send(instructor);
    })
}

exports.deleteById = function(req, res) {
    Instructor.deleteById(req.params.id, function(err, instructor) {
        if (err) res.status(400).send({error:true, message: 'Failed to delete'});
        else if(instructor.affectedRows === 0) res.status(400).send({error:true, message: "Deletion Failed, no rows affected"})
        else res.send({error:false, message:"Instructor deleted successfully!", data:instructor});
    })
}

exports.updateById = function(req, res) {
    Instructor.updateById(req.params.id, new Instructor(req.body), function(err, instructor) {
        if (err) res.status(400).send({error:true, message: 'Failed to update'});
        else res.send(instructor);
    })
}