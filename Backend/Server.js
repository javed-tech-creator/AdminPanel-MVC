const mongoose = require('mongoose')
const express = require('express')
const connectionDB = require('./Config/db')
const dotenv = require('dotenv')
dotenv.config();

const app = express();

// moddleware 
app.use(express.json());

connectionDB()

PORT = process.env.PORT || 3000 ;

app.listen(PORT,()=>{
  console.log(`Your Server is Running on http://localhost:${PORT}`)
})