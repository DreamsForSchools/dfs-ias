'use strict';

var db = require('../db.config');

var LocationCache = function(locationCache) {
    this.name = locationCache.name;
    this.address  = locationCache.address;
    this.image  = locationCache.image;
    this.district  = locationCache.district;
    this.longititude  = locationCache.longititude;
    this.latitude = locationCache.latitude;
    this.rawOffset  = locationCache.rawOffset;
    this.dstOffset = locationCache.dstOffset;
    this.instructorId  = locationCache.instructorId;
    this.partnerId  = locationCache.partnerId;
};

LocationCache.create = function (newlocationCache, result) {
    db.query("INSERT INTO locationCache set ?", newlocationCache, function (err, res){
        if (err) result(err, null);
        else result(null, res);
    })
}

LocationCache.findAll = function (result) {
    db.query("SELECT * from locationCache", function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
};

LocationCache.findById = function (id, result) {
    db.query("SELECT * from locationCache where id = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);

    });
}
LocationCache.findByName = function (name, result) {
    db.query("SELECT * from locationCache where name = ?", name, function (err, res) {
        if(err) result(err, null);
        else result(null, res);

    });
}
LocationCache.deleteById = function (id, result) {
    db.query("DELETE FROM locationCache WHERE id = ?", id,
        function (err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

LocationCache.updateById = function (id, locationCache, result) {
    db.query("UPDATE locationCache SET name = ?, address = ?, image = ?, district = ?, longititude = ?, latitude = ?, rawOffset = ?, dstOffset = ?, instructorId = ?, partnerId=? WHERE id = ?",
        [locationCache.name, locationCache.address, locationCache.image, locationCache.district, locationCache.longititude, locationCache.longititude, locationCache.rawOffset, locationCache.dstOffset, locationCache.instructorId, locationCache.partnerId, id],
        function(err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

module.exports = LocationCache;