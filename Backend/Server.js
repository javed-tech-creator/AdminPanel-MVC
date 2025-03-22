const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const connectionDB = require('./Config/db')
const dotenv = require('dotenv')
const userRouter = require('./Routes/AdminRouter')
const sliderRouter = require('./Routes/SliderRouter')
const ProductRouter = require('./Routes/ProductRouter')
const path = require('path')
const CartItemsRouter = require('./Routes/CartItemsRoutes')

// const User = require('./Model/User')
dotenv.config();

const app = express();

// middleware 
app.use(express.json());
app.use(cors());

// for accessing the image from frontend 
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Use specific frontend domain for security
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use('/uploads',express.static(path.join(__dirname,"uploads")))
app.use('/products',express.static(path.join(__dirname,"product_uploads")))


//Mongodb connection
connectionDB()

app.use('/user',userRouter)
app.use('/slider',sliderRouter)
app.use('/product',ProductRouter)
app.use('/cart',CartItemsRouter)

PORT = process.env.PORT || 3000 ;

app.listen(PORT,()=>{
  console.log(`Your Server is Running on http://localhost:${PORT}`)
})