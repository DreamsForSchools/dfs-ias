const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// const dataSql = fs.readFileSync(path.resolve(__dirname, 'db.sql')).toString();

const dataSql = `
DROP SCHEMA IF EXISTS dfs;
CREATE SCHEMA dfs;
USE dfs;
`;


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dfs',
})

connection.execute(
    dataSql
);