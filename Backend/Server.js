
import express  from  'express';
import cors  from 'cors';
import connectionDB  from './Config/db.js';
import dotenv  from 'dotenv';
import userRouter  from './Routes/AdminRouter.js';
import sliderRouter  from  './Routes/SliderRouter.js';
import ProductRouter  from './Routes/ProductRouter.js';
import CartItemsRouter  from './Routes/CartItemsRoutes.js';
import PaymentRouter  from './Routes/PaymentRouter.js';
import OrderRouter from './Routes/OrderRouter.js';
import UserRouter  from './Routes/UserRouter.js';
import cookieParser from 'cookie-parser';
// const User = require('./Model/User')
dotenv.config();

const app = express();

// middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}))
// Use cookie-parser middleware
app.use(cookieParser());

const allowedOrigins = [
  'https://shopese.netlify.app',
  'https://shopeaseadmin.netlify.app',
  'http://localhost:5173' // example: Vite dev server
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

//Mongodb connection
connectionDB()

app.use('/user',userRouter)
app.use('/slider',sliderRouter)
app.use('/product',ProductRouter)
app.use('/cart',CartItemsRouter)
app.use('/payment',PaymentRouter)
app.use('/order',OrderRouter)
app.use('/ecommerce',UserRouter)

const PORT =process.env.PORT || 3000 ;

app.listen(PORT,()=>{
  console.log(`Your Server is Running on http://localhost:${PORT}`)
})