'use strict';

const Partner = require('../model/partner.model');


exports.create = function(req, res) {
    const new_partner = new Partner(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({error:true, message: 'Please provide all required fields'});
    }
    else {
        Partner.create(new_partner, function(err, partner) {
            if (err)
                res.status(400).send(err);
            else res.json({error:false, sqlMessage:"Partner added successfully!", data:partner});
        });
    }
};

exports.findAll = function(req, res) {
    Partner.findAll(function(err, partner) {
      if (err) res.status(400).send({error:true,err});
      else res.send(partner);
    });
};

exports.findById = function(req, res) {
    Partner.findById(req.params.id, function(err, partner) {
        console.log(partner);
        if (err) res.status(400).send({error:true,err});
        else if (partner == "") res.send({error:true, message: "No Partner found!"});
        else res.send(partner);
    });
}

exports.deleteById = function(req, res) {
    Partner.deleteById(req.params.id, function(err, partner) {
        if (err) res.status(400).send({error:true,err});
        else if(partner.affectedRows === 0) res.send({error:true, message: "Deletion Failed!"})
        else res.send({error:false, message: "Deletion Successful!", data:partner});
    });
}

exports.updateById = function(req, res) {
    Partner.updateById(req.params.id, new Partner(req.body), function(err, partner) {
        if (err) res.status(400).send({error:true,err});
        else if(partner.affectedRows === 0) res.send({error:true, message: "Update Failed!"})
        else res.send({error:false, message: "Update Successful!", data:partner});
    });
}