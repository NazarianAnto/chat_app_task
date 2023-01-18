const mysql = require('mysql2/promise');

let pool;

module.exports = function con() {
    if (pool) { return pool; }
    const config = {
        connectionLimit: 10,
        host: process.env.SQL_HOST,
        port: process.env.SQL_PORT,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATABASE,
        debug: false,
        waitForConnections: true,
        multipleStatements: true,
        queueLimit: 0
    };
    pool = mysql.createPool(config);
    return pool
};