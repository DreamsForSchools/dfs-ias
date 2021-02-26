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
    this.instructor_id  = locationCache.instructor_id;
    this.school_id  = locationCache.school_id;
};

LocationCache.create = function (newlocationCache, result) {
    db.query("INSERT INTO location_cache set ?", newlocationCache, function (err, res){
        if (err) result(err, null);
        else result(null, res);
    })
}

LocationCache.findAll = function (result) {
    db.query("SELECT * from location_cache", function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
};

LocationCache.findById = function (id, result) {
    db.query("SELECT * from location_cache where id = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);

    });
}
LocationCache.findByName = function (name, result) {
    db.query("SELECT * from location_cache where name = ?", name, function (err, res) {
        if(err) result(err, null);
        else result(null, res);

    });
}
LocationCache.deleteById = function (id, result) {
    db.query("DELETE FROM location_cache WHERE id = ?", id,
        function (err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

LocationCache.updateById = function (id, locationCache, result) {
    db.query("UPDATE location_cache SET name = ?, address = ?, image = ?, district = ?, longititude = ?, latitude = ?, rawOffset = ?, dstOffset = ?, instructor_id = ?,school_id=? WHERE id = ?",
        [locationCache.name, locationCache.address, locationCache.image, locationCache.district, locationCache.longititude, locationCache.longititude, locationCache.rawOffset, locationCache.dstOffset, locationCache.instructor_id, locationCache.school_id, id],
        function(err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

module.exports = LocationCache;