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
app.use((req,res,next)=>{
    req.con = connection 
    next()
})
app.use(express.static(`${__dirname}/client/build`))
app.use("/api/v1/colors",cors(),colorRoute)

app.get('/',(req,res)=>{
    res.sendFile(`${__dirname}/client/build/index.html`)
})

app.listen(PORT,()=>{
    console.log("server run on port: "+ PORT)
})