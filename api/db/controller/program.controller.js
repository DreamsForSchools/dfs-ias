'use strict';

const Program = require('../model/program.model');

exports.findAll = function(req, res) {
    Program.findAll(function(err, program) {
      if (err) res.send(err);
      else res.send(program);
    });
};

exports.create = function(req, res) {
    const new_program = new Program(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }
    else {
        Program.create(new_program, function(err, program) {
            if (err)
                res.send(err);
            else res.json({error:false, message:"Program added successfully!",data:program});
        });
    }
};

exports.findById = function(req, res) {
    Program.findById(req.params.id, function(err, program) {
        if (err) res.send(err);
        else res.send(program);
    })
}

exports.deleteById = function(req, res) {
    Program.deleteById(req.params.id, function(err, program) {
        if (err) res.send(err);
        else res.send(program);
    })
}

exports.updateById = function(req, res) {
    Program.updateById(req.params.id, new Program(req.body), function(err, program) {
        if (err) res.send(err);
        else res.send(program);
    })
}