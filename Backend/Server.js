const mongoose = require('mongoose')
const express = require('express')
const connectionDB = require('./Config/db')
const dotenv = require('dotenv')
const userRouter = require('./Routes/userRouter')
// const User = require('./Model/User')
dotenv.config();

const app = express();

// moddleware 
app.use(express.json());

//Mongodb connection
connectionDB()

app.use('/user',userRouter)

PORT = process.env.PORT || 3000 ;

app.listen(PORT,()=>{
  console.log(`Your Server is Running on http://localhost:${PORT}`)
})