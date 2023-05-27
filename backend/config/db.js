const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config()


db = mysql.createConnection({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
})

db.connect((err) => {
    if (err) {
        console.log('#====== TRY TO CONNECT | MYSQL | ======#');
        db = handleDisconnect(db)
    } else {
        console.log("#======= CONNECTED | MYSQL | =======#")
    }
})


function handleDisconnect(connection) {
    if (connection) connection.destroy()
    db = mysql.createConnection({
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT
    })
    db.connect((err) => {
        if (err) {
            console.log('#====== TRY TO CONNECT | MYSQL | ======#');
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log("#======= CONNECTED | MYSQL | =======#")
        }
    })

}


module.exports = db;