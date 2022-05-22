'use strict';

const Class = require('../model/class.model');


exports.create = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        const new_class = new Class(req.body);
        //handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required fields'});
        } else {
            console.log(new_class)
            Class.create(new_class, function (err, mClass) {
                if (err) res.status(400).send({error: true, message: 'Failed to create class'});
                else res.json({error: false, message: "class added successfully!", data: mClass});
            });
        }
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
};

exports.findAll = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Class.findAll(function (err, mClass) {
            if (err) res.status(400).send({error: true, message: 'Failed to find all classes'});
            else res.send(mClass);
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
};

exports.findById = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Class.findById(req.params.id, function (err, mClass) {
            console.log(mClass);
            if (err) res.status(400).send({error: true, message: 'Failed to find class by id'});
            else if (mClass == "") res.send({error: true, message: "No class found!"});
            else res.send(mClass);
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}

exports.deleteById = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Class.deleteById(req.params.id, function (err, mClass) {
            if (err) res.status(400).send({error: true, message: 'Failed to delete'});
            else if (mClass.affectedRows === 0) res.status(400).send({
                error: true,
                message: "Deletion Failed, no rows affected"
            })
            else res.send({error: false, message: "Deletion Successful!", data: mClass});
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}

exports.updateById = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Class.updateById(req.params.id, new Class(req.body), function (err, mClass) {
            if (err) res.status(400).send({error: true, message: 'Failed to update'});
            else if (mClass.affectedRows === 0) res.status(400).send({
                error: true,
                message: "Update Failed, no rows affected"
            })
            else res.send({error: false, message: "Update Successful!", data: mClass});
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}


exports.allProgramClasses = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Class.allProgramClasses(req.params.id, function (err, mClass) {
            console.log(mClass);
            if (err) res.status(400).send({error: true, message: 'Failed to get all classes'});
            else if (mClass == "") res.send({error: true, message: "No classes found!"});
            else res.send(mClass);
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}

exports.allPartnerClasses = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Class.allPartnerClasses(req.params.id, function (err, mClass) {
            console.log(mClass);
            if (err) res.status(400).send({error: true, message: 'Failed to get all classes'});
            else if (mClass == "") res.send({error: true, message: "No classes found!"});
            else res.send(mClass);
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}

exports.allSeasonClasses = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Class.allSeasonClasses(req.params.id, function (err, mClass) {
            console.log(mClass);
            if (err) res.status(400).send({error: true, message: 'Failed to get all classes'});
            else if (mClass == "") res.send({error: true, message: "No classes found!"});
            else res.send(mClass);
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}