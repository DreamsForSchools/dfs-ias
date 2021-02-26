'use strict';

const InstructorAvailability = require('../model/instructorAvailability.model');

exports.findAll = function(req, res) {
    InstructorAvailability.findAll(function(err, instructorAvailability) {
      if (err) res.send(err);
      else res.send(instructorAvailability);
    });
};

exports.create = function(req, res) {
    const new_instructorAvailability = new InstructorAvailability(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }
    else {
        InstructorAvailability.create(new_instructorAvailability, function(err, instructorAvailability) {
            if (err)
                res.send(err);
            else res.json({error:false, message:"instructorAvailability added successfully!",data:instructorAvailability});
        });
    }
};

exports.findById = function(req, res) {
    InstructorAvailability.findById(req.params.id, function(err, instructorAvailability) {
        if (err) res.send(err);
        else res.send(instructorAvailability);
    })
}

exports.deleteById = function(req, res) {
    InstructorAvailability.deleteById(req.params.id, function(err, instructorAvailability) {
        if (err) res.send(err);
        else res.send(instructorAvailability);
    })
}

exports.updateById = function(req, res) {
    InstructorAvailability.updateById(req.params.id, new InstructorAvailability(req.body), function(err, instructorAvailability) {
        if (err) res.send(err);
        else res.send(instructorAvailability);
    })
}