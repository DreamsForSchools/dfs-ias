'use strict';

const Section = require('../model/section.model');


exports.create = function(req, res) {
    const new_section = new Section(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({error:true, message: 'Please provide all required fields'});
    }
    else {
        Section.create(new_section, function(err, section) {
            if (err)
                res.send({error:true,err});
            else res.json({error:false, message:"Section added successfully!", data:section});
        });
    }
};

exports.findAll = function(req, res) {
    Section.findAll(function(err, section) {
      if (err) res.send({error:true,err});
      else res.send(section);
    });
};

exports.findById = function(req, res) {
    Section.findById(req.params.id, function(err, section) {
        console.log(section);
        if (err) res.send({error:true,err});
        else if (section == "") res.send({error:true, message: "No Section found!"});
        else res.send(section);
    });
}

exports.deleteById = function(req, res) {
    Section.deleteById(req.params.id, function(err, section) {
        if (err) res.send({error:true,err});
        else if(section.affectedRows === 0) res.send({error:true, message: "Deletion Failed!"})
        else res.send({error:false, message: "Deletion Successful!", data:section});
    });
}

exports.updateById = function(req, res) {
    Section.updateById(req.params.id, new Section(req.body), function(err, section) {
        if (err) res.send({error:true,err});
        else if(section.affectedRows === 0) res.send({error:true, message: "Update Failed!"})
        else res.send({error:false, message: "Update Successful!", data:section});
    });
}


exports.allProgramSections = function(req, res) {
    Section.allProgramSections(req.params.id, function(err, section) {
        console.log(section);
        if (err) res.send({error:true,err});
        else if (section == "") res.send({error:true, message: "No Section found!"});
        else res.send(section);
    });
}

exports.allSchoolSections = function(req, res) {
    Section.allSchoolSections(req.params.id, function(err, section) {
        console.log(section);
        if (err) res.send({error:true,err});
        else if (section == "") res.send({error:true, message: "No Section found!"});
        else res.send(section);
    });
}

exports.allSeasonSections = function(req, res) {
    Section.allSeasonSections(req.params.id, function(err, section) {
        console.log(section);
        if (err) res.send({error:true,err});
        else if (section == "") res.send({error:true, message: "No Section found!"});
        else res.send(section);
    });
}