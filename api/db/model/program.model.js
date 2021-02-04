'use strict';

var db = require('../sqlconnector');

var Program = function(program) {
    this.name = program.name;
    this.color = program.color;
    this.logo = program.logo;
};

Program.create = function (newProgram, result) {
    db.query("INSERT INTO program_masterlist set ?", newProgram, function (err, res){
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    })
}

Program.findAll = function (result) {
    db.query("Select * from program_masterlist", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('employees : ', res);
            result(null, res);
        }
    });
};
    

module.exports = Program;