const mysql = require('mysql2');
require('dotenv').config();

var db = mysql.createPool({
    connectionLimit: 100,
    host: process.env.CLOUD_DB_IP,
    user: process.env.CLOUD_DB_DEV_USERNAME,
    password: process.env.CLOUD_DB_DEV_PASSWORD,
    database: process.env.CLOUD_DB_NAME,
    debug: false
});

module.exports = db;