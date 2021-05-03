'use strict';

var db = require('../db.config');

var Partner = function(partner) {
    this.name = partner.name;
    this.city = partner.city;
    this.state = partner.state;
    this.street = partner.street;
    this.zip = partner.zip;
    this.partnerType = partner.partnerType;
    this.langRequest = partner.langRequest;
};

Partner.create = function (newPartner, result) {
    db.query("INSERT INTO partners set ?", newPartner, function (err, res){
        if (err) result(err, null);
        else result(null, res);
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
    db.query("UPDATE partners SET name = ?, city = ?, state = ?, street = ?, zip = ?, partnerType= ? langRequest = ? WHERE partnerId = ?",
        [partner.name, partner.city, partner.state, partner.zip, partner.partnerType, partner.langRequest, id],
        function(err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

module.exports = Partner;