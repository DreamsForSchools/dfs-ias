'use strict';

var db = require('../db.config');

var Program = function(program) {
    this.name = program.name;
    this.color = program.color;
    this.logo = program.logo;
};

Program.create = function (newProgram, result) {
    db.query("INSERT INTO programs set ?", newProgram, function (err, res){
        if (err) result(err, null);
        else result(null, res);
    })
}

Program.findAll = function (result) {
    db.query("SELECT * from programs", function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
};

Program.findById = function (id, result) {
    db.query("SELECT * from programs where program_id = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);

    });
}

Program.deleteById = function (id, result) {
    db.query("DELETE FROM programs WHERE program_id = ?", id,
        function (err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

Program.updateById = function (id, program, result) {
    db.query("UPDATE programs SET name = ?, style = ?, logo = ? WHERE program_id = ?",
        [program.name, program.color, program.logo, id],
        function(err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

module.exports = Program;