'use strict';

const Partner = require('../model/partner.model');


exports.create = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        const new_partner = new Partner(req.body);
        //handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required fields'});
        } else {
            Partner.create(new_partner, function (err, partner) {
                if (err)
                    res.status(400).send({error: true, err});
                else res.json({error: false, message: "Partner added successfully!", data: partner});
            });
        }
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
};

exports.findAll = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Partner.findAll(function (err, partner) {
            if (err) res.status(400).send({error: true, err});
            else res.send(partner);
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
};

exports.findById = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Partner.findById(req.params.id, function (err, partner) {
            console.log(partner);
            if (err) res.status(400).send({error: true, err});
            else if (partner == "") res.status(400).send({error: true, message: "No Partner found!"});
            else res.send(partner);
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}

exports.deleteById = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Partner.deleteById(req.params.id, function (err, partner) {
            if (err) res.status(400).send({error: true, err});
            else if (partner.affectedRows === 0) res.status(400).send({
                error: true,
                message: "Deletion Failed, no rows affected!"
            })
            else res.send({error: false, message: "Deletion Successful!", data: partner});
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}

exports.updateById = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Partner.updateById(req.params.id, new Partner(req.body), function (err, partner) {
            if (err) res.status(400).send({error: true, err});
            else if (partner.affectedRows === 0) res.status(400).send({error: true, message: "Update Failed!"})
            else res.send({error: false, message: "Update Successful!", data: partner});
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}

exports.aggregatedAll = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        Partner.aggregatedAll(req.params.seasonId, function (err, partner) {
            if (err) res.status(400).send({error: true, err});
            else res.send(partner);
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}