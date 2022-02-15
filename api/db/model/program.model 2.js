'use strict';

var db = require('../promiseDb.config.js');

var Program = function(program) {
    this.name = program.name;
    this.color = program.color;
    this.logo = program.logo;
};

Program.create = async function (newProgram, result) {
    try {
        const res = await db.query("INSERT INTO programs set ?", newProgram);
        result(null, res);
    } catch (e) {
        return result(e, null);
    }
}

Program.findAll = function (result) {
    db.query("SELECT * from programs", function (err, res) {
        if(err) result(err, null);
        else result(null, res);
    });
};

Program.findById = function (id, result) {
    db.query("SELECT * from programs where programId = ?", id, function (err, res) {
        if(err) result(err, null);
        else result(null, res);

    });
}

Program.deleteById = async function (id, result) {
    try {
        let data = await db.query("DELETE FROM programs WHERE programId = ?", id);
        result(null, data);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
}

Program.updateById = function (id, program, result) {
    db.query("UPDATE programs SET name = ?, style = ?, logo = ? WHERE programId = ?",
        [program.name, program.color, program.logo, id],
        function(err, res) {
            if (err) result(err, null);
            else result(null, res);
    })
}

Program.aggregatedAll = async function (seasonId, result) {
    const resultMap = {};

    try{
        const allPrograms = await db.query("SELECT * from programs;");
        allPrograms.forEach((e) => resultMap[e.programId] = {...e, classes: []});

        const aggregatedClasses =
            await db.query(
                "SELECT c.classId, c.timings, c.instructorsNeeded, p.programId, p2.partnerId, p2.name, p2.partnerType, p2.district\n" +
                "FROM classes c\n" +
                "JOIN programs p on c.programId = p.programId\n" +
                "JOIN partners p2 on c.partnerId = p2.partnerId\n" +
                "WHERE c.seasonId = ?", seasonId);

        aggregatedClasses.forEach((e) => resultMap[e.programId].classes.push({
            classId: e.classId,
            timings: e.timings,
            instructorsNeeded: e.instructorsNeeded,
            partner: {partnerId: e.partnerId, name: e.name, district: e.district, type: e.partnerType},
        }));
        result(null, resultMap);
    } catch(err) {
        return result(err, null);
    }
}

module.exports = Program;