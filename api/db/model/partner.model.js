'use strict';
var axios = require('axios');
var db = require('../db.config');

var Partner = function(partner) {
    this.name = partner.name;
    this.city = partner.city;
    this.state = partner.state;
    this.street = partner.street;
    this.zip = partner.zip;
    this.district = partner.district;
    this.partnerType = partner.partnerType;
    this.langRequest = partner.langRequest;
};

Partner.create = function (newPartner, result) {
    console.log(newPartner);
    db.query("INSERT INTO partners set ?", newPartner, function (err, res){
        if (err) result(err, null);
        else {
            let insertedPartnerId = res.insertId;
            let address = newPartner.street + ", " + newPartner.city + ", " + newPartner.state + " " + newPartner.zip;
            locationCacheCheck(newPartner.name,address,insertedPartnerId,result);
            result(null, res);
        }
    })
}

Partner.findAll = function (result) {
    db.query("SELECT * from partners", function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
};

Partner.findById = function (id, result) {
    db.query("SELECT * from partners where partnerId = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
}

Partner.deleteById = function (id, result) {
    db.query("DELETE FROM partners WHERE partnerId = ?", id,
        function (err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

Partner.updateById = function (id, partner, result) {
    console.log("i[date");
    db.query("UPDATE partners SET name = ?, city = ?, state = ?, street = ?, zip = ?, district = ?, partnerType= ?, langRequest = ? WHERE partnerId = ?",
        [partner.name, partner.city, partner.state, partner.street, partner.zip, partner.district, partner.partnerType, partner.langRequest, id],
        function(err, res) {
            if (err) result(err, null);
            else {
                let address = partner.street + ", " + partner.city + ", " + partner.state + " " + partner.zip;
                locationCacheCheck(partner.name, address, id,result);
                result(null, res);
            }
    })
}

function locationCacheCheck(partnerName, partnerLocation, insertedPartnerID,result){
    db.query("SELECT * FROM locationCache WHERE name = ?", partnerName, function(err,res){
        if(err) result(err,null)
        if(res.length >=1 ){    //if location cache exists, copy data over with new instructorId
            let location = res[0];
            location.partnerId = insertedPartnerID;
            location.district = partnerLocation.district; //keep if locationCache is keeping district
            delete location['id'];
            insertLocation(insertedPartnerID,location,result);
        }else{                  //new gmap
            let location = {};
            location.name = partnerName;
            axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${process.env.GMAP_API_KEY}&inputtype=textquery&input=${partnerLocation}&inputtype=textquery&fields=geometry,photos,name,formatted_address,place_id`)
                .then((response) => {
                    if(response.data.status == 'OK' && response.data.candidates.length >= 1){
                        location.address = response.data.candidates[0].formatted_address;
                        location.latitude = response.data.candidates[0].geometry.location.lat;
                        location.longititude = response.data.candidates[0].geometry.location.lng;
                        location.placeId = response.data.candidates[0].place_id;
                        if(response.data.candidates[0].photos != undefined && response.data.candidates[0].photos.length >= 1)
                            location.image = response.data.candidates[0].photos[0].photo_reference;
                        let date = new Date();
                        axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${location.latitude},${location.longititude}&timestamp=${Math.floor(date.getTime()/1000)}&key=${process.env.GMAP_API_KEY}`)
                            .then((response) => {
                                location.rawOffset = response.data.rawOffset;
                                location.dstOffset = response.data.dstOffset;
                                db.query("INSERT INTO locationCache set ?",location,function(err,res){ //insert location cache w/o instructor id
                                    if(err) result(err,null);
                                    else{
                                        //insert into location cache WITH instructor ID
                                        location.partnerId = insertedPartnerID;
                                        console.log("location====",location);
                                        insertLocation(insertedPartnerID,location,result);
                                    }
                                });

                            });
                    }else{
                        result(err,null);
                    }
                });
        }
    });
}

//insert location with partnerID
function insertLocation(insertedPartnerID,location,result)
{
    console.log(insertedPartnerID, "=========\n",location);
    db.query("SELECT * FROM locationCache WHERE partnerId = ?",insertedPartnerID,function(err,res){
        if(err) {console.log(err);result(err,null);
        }
        else{
            console.log("res==",res);
            if(res.length > 0 && res.name != location.name){    //instructor already exists, update
                db.query("UPDATE locationCache SET name = ?, image = ?, address = ?, district = ?, longititude = ?, latitude = ?, rawOffset = ?, dstOffset = ?, placeId = ? WHERE partnerId = ?",
                    [location.name, location.image, location.address, location.district, location.longititude, location.latitude, location.rawOffset, location.dstOffset, location.placeId, insertedPartnerID],
                    function(err,res){
                        console.log(err);  
                        if(err) result(err,null);
                    });
            }else{
                 //inserting location with instructor id
                 
                 delete location["locationCacheId"];
                 console.log(location);
                db.query("INSERT INTO locationCache set ?",location,function(err,res){
                    if(err) result(err,null);
                });

            }
        }

    });
}



module.exports = Partner;