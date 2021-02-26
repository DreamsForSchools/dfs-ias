'use strict';

const LocationCache = require('../model/locationCache.model');

exports.findAll = function(req, res) {
    LocationCache.findAll(function(err, locationCache) {
      if (err) res.send(err);
      else res.send(locationCache);
    });
};

exports.create = function(req, res) {
    const new_locationCache = new LocationCache(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }
    else {
        LocationCache.create(new_locationCache, function(err, locationCache) {
            if (err)
                res.send(err);
            else res.json({error:false, message:"LocationCache added successfully!",data:locationCache});
        });
    }
};

exports.findById = function(req, res) {
    LocationCache.findById(req.params.id, function(err, locationCache) {
        if (err) res.send(err);
        else res.send(locationCache);
    })
}

exports.deleteById = function(req, res) {
    LocationCache.deleteById(req.params.id, function(err, locationCache) {
        if (err) res.send(err);
        else res.send(locationCache);
    })
}

exports.updateById = function(req, res) {
    LocationCache.updateById(req.params.id, new LocationCache(req.body), function(err, locationCache) {
        if (err) res.send(err);
        else res.send(locationCache);
    })
}