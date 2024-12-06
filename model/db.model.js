const mysql = require('mysql2');

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'railway_system'
});

module.exports = db;
