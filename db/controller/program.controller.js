'use strict';

const Program = require('../model/program.model');

exports.findAll = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Program.findAll(function (err, program) {
            if (err) res.send(err);
            else res.send(program);
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
};

exports.create = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        const new_program = new Program(req.body);
        //handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            Program.create(new_program, function (err, program) {
                if (err)
                    res.status(400).send(err);
                else res.json({error: false, message: "Program added successfully!", data: program});
            });
        }
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
};


exports.findById = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Program.findById(req.params.id, function (err, program) {
            if (err) res.send(err);
            else res.send(program);
        })
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}

exports.deleteById = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Program.deleteById(req.params.id, function (err, program) {
            if (err) res.status(400).send({error: true, message: 'Failed to delete'});
            else if (program.affectedRows === 0) res.status(400).send({
                error: true,
                message: "Deletion Failed, no rows affected"
            })
            else res.send({error: false, message: "Deletion Successful!", data: program});
        })
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}

exports.updateById = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Program.updateById(req.params.id, new Program(req.body), function (err, program) {
            if (err) res.send(err);
            else res.send(program);
        })
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}

exports.aggregatedAll = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Program.aggregatedAll(req.params.seasonId, function (err, partner) {
            if (err) res.status(400).send({error: true, err});
            else res.send(partner);
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}