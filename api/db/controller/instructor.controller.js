'use strict';

const Instructor = require('../model/instructor.model');

exports.findAll = function(req, res) {
    Instructor.findAll(function(err, instructor) {
      if (err) res.send(err);
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
            if (err)
                res.send(err);
            else res.json({error:false, message:"Instructor added successfully!",data:instructor});
        });
    }
};

exports.createCSV = function(req, res) {
    const new_instructor = new Instructor(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }
    else {
        Instructor.createCSV(new_instructor, function(err, instructor) {
            if (err)
                res.send(err);
            else res.json({error:false, message:"Instructor added successfully!",data:instructor});
        });
    }
};

exports.findById = function(req, res) {
    Instructor.findById(req.params.id, function(err, instructor) {
        if (err) res.send(err);
        else res.send(instructor);
    })
}

exports.deleteById = function(req, res) {
    Instructor.deleteById(req.params.id, function(err, instructor) {
        if (err) res.send(err);
        else res.send(instructor);
    })
}

exports.updateById = function(req, res) {
    Instructor.updateById(req.params.id, new Instructor(req.body), function(err, instructor) {
        if (err) res.send(err);
        else res.send(instructor);
    })
}