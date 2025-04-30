import instance from '../Middleware/razorpay.js';
import crypto from 'crypto';
export const processPayment =async(req,res)=>{
try{
  const option={
    amount:Number(req.body.amount*100),
    currency:"INR"
  }

  const order = await instance.orders.create(option);
  res.status(200).json({success:true,order})

}catch(error){
  res.status(500).json({message:'Internal Server Error',error})
}
}

export const getKey = async(req,res)=>{
 try{ res.status(200).json({
    key:process.env.RAZORPAY_API_KEY
  })
}catch(error){
  res.status(500).json({message:'Internal Key Api Error',error})
}
}

export const paymentVarification = async(req,res)=>{
try {

const {razorpay_payment_id,razorpay_order_id,razorpay_signature} =req.body;
 const body = razorpay_order_id + "|" + razorpay_payment_id;
const expectedSignature = crypto.createHmac('sha256',process.env.RAZORPAY_API_SECRET).update(body.toString()).digest('hex');

const isAuthentic = expectedSignature === razorpay_signature;

if(isAuthentic){
  return res.redirect(`http://localhost:5173/payment/varification?reference=${razorpay_payment_id}&order=${razorpay_order_id}`)
}else{
  res.status(400).json({
    success:false
  })
}
  
} catch (error) {
  res.status(500).json({message:"Internal Server Error"})
}
 
}