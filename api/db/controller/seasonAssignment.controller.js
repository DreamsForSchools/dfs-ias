'use strict';

const SeasonAssignment = require('../model/seasonAssignment.model');


exports.sort = function(req, res) {
    // const newSort = new Sort(req.body);
    //handles null error
    // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    //     res.status(400).send({error: true, message: 'Please provide all required fields'});
    // } else {
    SeasonAssignment.sort(function (err, data) {
            if (err)
                res.send({error: true, err});
            else
                res.json({error: false, message: "Sort finished!", data:data});
        });
    // }
};