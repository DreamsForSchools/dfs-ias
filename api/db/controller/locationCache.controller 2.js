'use strict';

const LocationCache = require('../model/locationCache.model');

exports.findAll = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        LocationCache.findAll(function (err, locationCache) {
            if (err) res.send(err);
            else res.send(locationCache);
        });
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
};

exports.create = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        const new_locationCache = new LocationCache(req.body);
        //handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            LocationCache.create(new_locationCache, function (err, locationCache) {
                if (err)
                    res.send(err);
                else res.json({error: false, message: "LocationCache added successfully!", data: locationCache});
            });
        }
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
};

exports.findById = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        LocationCache.findById(req.params.id, function (err, locationCache) {
            if (err) res.send(err);
            else res.send(locationCache);
        })
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}
exports.findByName = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        LocationCache.findByName(req.params.name, function (err, locationCache) {
            if (err) res.send(err);
            else res.send(locationCache);
        })
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}

exports.deleteById = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        LocationCache.deleteById(req.params.id, function (err, locationCache) {
            if (err) res.send(err);
            else res.send(locationCache);
        })
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}

exports.updateById = function (req, res) {
    const auth = req.currentUser;
    if (auth) {
        LocationCache.updateById(req.params.id, new LocationCache(req.body), function (err, locationCache) {
            if (err) res.send(err);
            else res.send(locationCache);
        })
    } else {
        res.status(403).send({error: true, message: "Not authorized.", data: null});
    }
}