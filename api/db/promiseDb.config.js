const util = require('util');
const mysql = require('mysql2');
require('dotenv').config();

const config = {
    connectionLimit: 100,
    host: process.env.CLOUD_DB_IP,
    user: process.env.CLOUD_DB_DEV_USERNAME,
    password: process.env.CLOUD_DB_DEV_PASSWORD,
    database: process.env.CLOUD_DB_NAME,
    debug: false
}


function makeDb() {
    const connection = mysql.createConnection(config);
    return {
        query(sql, args) {
            return util.promisify(connection.query)
                .call(connection, sql, args);
        },
        close() {
            return util.promisify(connection.end).call(connection);
        },
        beginTransaction() {
            return util.promisify( connection.beginTransaction )
                .call( connection );
        },
        commit() {
            return util.promisify( connection.commit )
                .call( connection );
        },
        rollback() {
            return util.promisify( connection.rollback )
                .call( connection );
        }
    };
}

var db = makeDb(config);
module.exports = db;