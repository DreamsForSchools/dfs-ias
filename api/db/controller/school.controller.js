'use strict';

const School = require('../model/school.model');


exports.create = function(req, res) {
    const new_school = new School(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({error:true, message: 'Please provide all required fields'});
    }
    else {
        School.create(new_school, function(err, school) {
            if (err)
                res.send({error:true,err});
            else res.json({error:false, message:"School added successfully!", data:school});
        });
    }
};

exports.findAll = function(req, res) {
    School.findAll(function(err, school) {
      if (err) res.send({error:true,err});
      else res.send(school);
    });
};

exports.findById = function(req, res) {
    School.findById(req.params.id, function(err, school) {
        console.log(school);
        if (err) res.send({error:true,err});
        else if (school == "") res.send({error:true, message: "No School found!"});
        else res.send(school);
    });
}

exports.deleteById = function(req, res) {
    School.deleteById(req.params.id, function(err, school) {
        if (err) res.send({error:true,err});
        else if(school.affectedRows === 0) res.send({error:true, message: "Deletion Failed!"})
        else res.send({error:false, message: "Deletion Successful!", data:school});
    });
}

exports.updateById = function(req, res) {
    School.updateById(req.params.id, new School(req.body), function(err, school) {
        if (err) res.send({error:true,err});
        else if(school.affectedRows === 0) res.send({error:true, message: "Update Failed!"})
        else res.send({error:false, message: "Update Successful!", data:school});
    });
}