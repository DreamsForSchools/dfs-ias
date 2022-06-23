const util = require('util');
require('dotenv').config();

const knex = require('knex') ({ 
    client: 'mysql',
    connection: { 
        host: process.env.CLOUD_DB_IP,
        user: process.env.CLOUD_DB_DEV_USERNAME,
        password: process.env.CLOUD_DB_DEV_PASSWORD,
        database: process.env.CLOUD_DB_NAME,
        debug: false
    }
});

module.exports = knex;