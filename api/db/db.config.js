const mysql = require('mysql2');

var db = mysql.createPool({
    connectionLimit: 100,
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'dfs',
    debug: false
});

module.exports = db;