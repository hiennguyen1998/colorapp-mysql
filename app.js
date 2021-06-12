const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const dotenv = require('dotenv')
dotenv.config({path:'./config/config.env'})
const PORT = process.env.PORT||7004
const colorRoute = require('./route/colorRoute')
const app = express()
const connection = require('./config/db')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connection.connect((err)=>{
    if(err){
        console.log(`err: ${err.message}`)
        return
    }
    console.log("Db connected successfully")
})
app.use((req,res,next)=>{
    req.con = connection 
    next()
})
app.use("/api/v1/colors",colorRoute)

app.listen(PORT,()=>{
    console.log("server run on port: "+ PORT)
})