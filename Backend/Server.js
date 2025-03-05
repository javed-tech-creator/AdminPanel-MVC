const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const connectionDB = require('./Config/db')
const dotenv = require('dotenv')
const userRouter = require('./Routes/AdminRouter')
// const User = require('./Model/User')
dotenv.config();

const app = express();

// middleware 
app.use(express.json());
app.use(cors());

//Mongodb connection
connectionDB()

app.use('/user',userRouter)

PORT = process.env.PORT || 3000 ;

app.listen(PORT,()=>{
  console.log(`Your Server is Running on http://localhost:${PORT}`)
})