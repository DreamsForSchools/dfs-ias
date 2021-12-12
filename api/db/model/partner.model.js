'use strict';
var axios = require('axios');
var db = require('../promiseDb.config.js');

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

Partner.create = async function (newPartner, result) {
    try{
        // Starting transaction
        await db.beginTransaction();

        let partner = await db.query("INSERT INTO partners set ?", newPartner);

        let location = await getLocationCacheBy(newPartner);
        if(location.length == 0)
        {
            let address = newPartner.street + ", " + newPartner.city + ", " + newPartner.state + " " + newPartner.zip;
            location = await getGmapLocation(newPartner,address);
        }

        location.partnerId = partner.insertId;
        let results = await db.query("INSERT INTO locationCache set ?",location);

        // Commit changes if everything went well
        await db.commit();

        result(null,results);
    }catch(err){
        // Rollback changes if something went wrong
        // (We dont want to add the partner if we cant find their address)
        await db.rollback();

        console.log(err);
        result(err,null);
    }
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

Partner.deleteById = async function (id, result) {
    try {
        let data = await db.query("DELETE FROM partners WHERE partnerId = ?", id);
        result(null, data);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
}

Partner.updateById = async function (id, partner, result) {
    try{
        let originalPartner = await db.query("SELECT * FROM partners WHERE partnerId = ?",id);

        let partnerAddress = partner.street + ", " + partner.city + ", " + partner.state + " " + partner.zip;
        let originalAddress = originalPartner[0].street + ", " + originalPartner[0].city + ", " + originalPartner[0].state + " " + originalPartner[0].zip;

        //if name or address changed
        // if(originalPartner[0].name != partner.name || partnerAddress != originalAddress)
        // {
            //update partner
            await db.query("UPDATE partners SET name = ?, city = ?, state = ?, street = ?, zip = ?, district = ?, partnerType= ?, langRequest = ? WHERE partnerId = ?",
            [partner.name, partner.city, partner.state, partner.street, partner.zip, partner.district, partner.partnerType, partner.langRequest, id]);

            //update locationcache
            let results = null;
            if(partnerAddress != originalAddress)    //change address (and possibly address)
            {
                let gmapLocation = await getGmapLocation(partner,partnerAddress);
                results = await db.query("UPDATE locationCache SET name = ?, image = ?, address = ?, district = ?, longititude = ?, latitude = ?, rawOffset = ?, dstOffset = ?, placeId = ? WHERE partnerId = ?",
                [gmapLocation.name, gmapLocation.image, gmapLocation.address, gmapLocation.district, gmapLocation.longititude, gmapLocation.latitude, gmapLocation.rawOffset, gmapLocation.dstOffset, gmapLocation.placeId, id]);
            }else{
                //change name
                results = await db.query("UPDATE locationCache SET name = ? WHERE partnerId = ?",[partner.name, id]);
            }
            result(null,results);
        // }

    }catch(err){
        console.log(err);
        return result(err,null);
    }
}

//NOTE: this wont get called much because names are unique and can't match addresses with out country
async function getLocationCacheBy(partner)
{
    let rtn;
    let address = partner.street + ", " + partner.city + ", " + partner.state + " " + partner.zip;
    // console.log(address);    //NOTE FOR ADDRESS MATCHING NEEDS COUNTRY
    rtn = await db.query("SELECT * FROM locationCache where name = ? OR address = ?",[partner.name,address]);
    delete rtn['locationId'];
    delete rtn['instuctorId'];
    delete rtn['partnerId'];
    if(rtn.length > 0) rtn = rtn[0];
    return rtn;
}

async function getGmapLocation(partner, partnerAddress){
    let location = {};
    location.name = partner.name;
    location.district = partner.district; //keep if locationCache is keeping district
    let gmapPlace = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${process.env.GMAP_API_KEY}&inputtype=textquery&input=${partnerAddress}&inputtype=textquery&fields=geometry,photos,name,formatted_address,place_id`);
    // console.log("gmap", gmapPlace);

    if(gmapPlace.data.status == 'OK' && gmapPlace.data.candidates.length >= 1){
        location.address = gmapPlace.data.candidates[0].formatted_address;
        location.latitude = gmapPlace.data.candidates[0].geometry.location.lat;
        location.longititude = gmapPlace.data.candidates[0].geometry.location.lng;
        location.placeId = gmapPlace.data.candidates[0].place_id;

        let date = new Date();
        let gmapTimeZone = await axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${location.latitude},${location.longititude}&timestamp=${Math.floor(date.getTime()/1000)}&key=${process.env.GMAP_API_KEY}`);
        // console.log("gmapTimeZone", gmapTimeZone);

        location.rawOffset = gmapTimeZone.data.rawOffset;
        location.dstOffset = gmapTimeZone.data.dstOffset;
    }
    return location;
}

//#region old locationCache
function locationCacheCheck(partnerName, partnerLocation, insertedPartnerID,result){
    db.query("SELECT * FROM locationCache WHERE name = ?", partnerName, function(err,res){
        if(err) result(err,null)
        if(res.length >=1 ){    //if location cache exists, copy data over with new instructorId
            let location = res[0];
            location.partnerId = insertedPartnerID;
            delete location['id'];
            insertLocation(insertedPartnerID,location,result);
        }else{                  //new gmap
            let location = {};
            location.name = partnerName;
            location.district = partnerLocation.district; //keep if locationCache is keeping district
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
    db.query("SELECT * FROM locationCache WHERE partnerId = ?",insertedPartnerID,function(err,res){
        if(err) {result(err,null);
        }
        else{
            if(res.length > 0 && res.name != location.name){    //instructor already exists, update
                db.query("UPDATE locationCache SET name = ?, image = ?, address = ?, district = ?, longititude = ?, latitude = ?, rawOffset = ?, dstOffset = ?, placeId = ? WHERE partnerId = ?",
                    [location.name, location.image, location.address, location.district, location.longititude, location.latitude, location.rawOffset, location.dstOffset, location.placeId, insertedPartnerID],
                    function(err,res){
                        if(err) result(err,null);
                    });
            }else{
                 //inserting location

                delete location["locationCacheId"];
                db.query("INSERT INTO locationCache set ?",location,function(err,res){
                    if(err) result(err,null);
                });

            }
        }

    });
}
//#endregion



Partner.aggregatedAll = async function (seasonId, result) {
    const resultMap = {};

    try{
        const allPartners = await db.query("SELECT * from partners");
        allPartners.forEach((e) => resultMap[e.partnerId] = {...e, classes: []});

        const aggregatedClasses =
            await db.query(
                "SELECT c.classId, c.timings, c.instructorsNeeded, p.programId, p.name, p.color, p2.partnerId\n" +
                "FROM classes c\n" +
                "JOIN programs p on c.programId = p.programId\n" +
                "JOIN partners p2 on c.partnerId = p2.partnerId\n" +
                "WHERE c.seasonId = ?", seasonId);

        aggregatedClasses.forEach((e) => resultMap[e.partnerId].classes.push({
            classId: e.classId,
            timings: e.timings,
            instructorsNeeded: e.instructorsNeeded,
            program: {programId: e.programId, name: e.name, color: e.color},
        }));
        result(null, resultMap);
    } catch(err) {
        return result(err, null);
    }
}

module.exports = Partner;
