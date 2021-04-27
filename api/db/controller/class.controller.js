'use strict';

const Class = require('../model/class.model');


exports.create = function(req, res) {
    const new_class = new Class(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({error:true, message: 'Please provide all required fields'});
    }
    else {
        Class.create(new_class, function(err, mClass) {
            if (err)
                res.send({error:true,err});
            else res.json({error:false, message:"class added successfully!", data:mClass});
        });
    }
};

exports.findAll = function(req, res) {
    Class.findAll(function(err, mClass) {
      if (err) res.send({error:true,err});
      else res.send(mClass);
    });
};

exports.findById = function(req, res) {
    Class.findById(req.params.id, function(err, mClass) {
        console.log(mClass);
        if (err) res.send({error:true,err});
        else if (mClass == "") res.send({error:true, message: "No class found!"});
        else res.send(mClass);
    });
}

exports.deleteById = function(req, res) {
    Class.deleteById(req.params.id, function(err, mClass) {
        if (err) res.send({error:true,err});
        else if(mClass.affectedRows === 0) res.send({error:true, message: "Deletion Failed!"})
        else res.send({error:false, message: "Deletion Successful!", data:mClass});
    });
}

exports.updateById = function(req, res) {
    Class.updateById(req.params.id, new Class(req.body), function(err, mClass) {
        if (err) res.send({error:true,err});
        else if(mClass.affectedRows === 0) res.send({error:true, message: "Update Failed!"})
        else res.send({error:false, message: "Update Successful!", data:mClass});
    });
}


exports.allProgramClasses = function(req, res) {
    Class.allProgramClasses(req.params.id, function(err, mClass) {
        console.log(mClass);
        if (err) res.send({error:true,err});
        else if (mClass == "") res.send({error:true, message: "No classes found!"});
        else res.send(mClass);
    });
}

exports.allSchoolClasses = function(req, res) {
    Class.allSchoolClasses(req.params.id, function(err, mClass) {
        console.log(mClass);
        if (err) res.send({error:true,err});
        else if (mClass == "") res.send({error:true, message: "No classes found!"});
        else res.send(mClass);
    });
}

exports.allSeasonClasses = function(req, res) {
    Class.allSeasonClasses(req.params.id, function(err, mClass) {
        console.log(mClass);
        if (err) res.send({error:true,err});
        else if (mClass == "") res.send({error:true, message: "No classes found!"});
        else res.send(mClass);
    });
}