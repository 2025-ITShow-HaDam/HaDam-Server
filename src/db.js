const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('DB 연결 실패:', err);
    } else {
        console.log('MySQL 연결 성공');
        connection.release();
    }
});

module.exports = db.promise();
