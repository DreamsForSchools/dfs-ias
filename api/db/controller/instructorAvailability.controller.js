'use strict';

const InstructorAvailability = require('../model/instructorAvailability.model');

exports.findAll = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        InstructorAvailability.findAll(function (err, instructorAvailability) {
            if (err) res.send(err);
            else res.send(instructorAvailability);
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
};

exports.create = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        const new_instructorAvailability = new InstructorAvailability(req.body);
        //handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            InstructorAvailability.create(new_instructorAvailability, function (err, instructorAvailability) {
                if (err)
                    res.send(err);
                else res.json({
                    error: false,
                    message: "instructorAvailability added successfully!",
                    data: instructorAvailability
                });
            });
        }
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
};

exports.findById = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        InstructorAvailability.findById(req.params.id, function (err, instructorAvailability) {
            if (err) res.send(err);
            else res.send(instructorAvailability);
        })
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}

exports.deleteById = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        InstructorAvailability.deleteById(req.params.id, function (err, instructorAvailability) {
            if (err) res.send(err);
            else res.send(instructorAvailability);
        })
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}

exports.updateById = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        InstructorAvailability.updateById(req.params.id, new InstructorAvailability(req.body), function (err, instructorAvailability) {
            if (err) res.send(err);
            else res.send(instructorAvailability);
        })
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}