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
const PaymentRouter = require('./Routes/PaymentRouter')
const OrderRouter =require('./Routes/OrderRouter')
// const User = require('./Model/User')
dotenv.config();

const app = express();

// middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
// app.use('/uploads',express.static(path.join(__dirname,"uploads")))
// app.use('/products',express.static(path.join(__dirname,"product_uploads")))


//Mongodb connection
connectionDB()

app.use('/user',userRouter)
app.use('/slider',sliderRouter)
app.use('/product',ProductRouter)
app.use('/cart',CartItemsRouter)
app.use('/payment',PaymentRouter)
app.use('/order',OrderRouter)


PORT = process.env.PORT || 3000 ;

app.listen(PORT,()=>{
  console.log(`Your Server is Running on http://localhost:${PORT}`)
})