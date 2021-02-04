'use strict';

const Program = require('../model/program.model');

exports.findAll = function(req, res) {
    Program.findAll(function(err, program) {
      console.log('controller')
      if (err)
      res.send(err);
      console.log('res', program);
      res.send(program);
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
                res.json({error:false,message:"Program added successfully!",data:program});
        });
    }
};