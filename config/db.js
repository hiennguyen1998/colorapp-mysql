const mysql = require('mysql2')
require('dotenv').config({path:'config.env'})

module.exports=mysql.createConnection({
    host: process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database: process.env.DATABASE
})