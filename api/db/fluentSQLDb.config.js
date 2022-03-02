const util = require('util');
require('dotenv').config();

const fluentSQL = require('fluent-mysql');
const db = fluentSQL.connect({
    host: process.env.CLOUD_DB_IP,
    user: process.env.CLOUD_DB_DEV_USERNAME,
    password: process.env.CLOUD_DB_DEV_PASSWORD,
    database: process.env.CLOUD_DB_NAME,
    debug: false
});

module.exports = db;