const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root'
})

db.connect(function(err) {
    if (err) {
      console.error("error connecting");
      return null;
    } else {
      console.log("Database Connected!");
    }
  });

module.exports = db;