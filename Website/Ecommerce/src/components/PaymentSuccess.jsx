import { CheckCircle } from 'lucide-react'
import React, {  useContext, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cartData } from '../store/Cart-data-store';


const PaymentSuccess = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const{cartItem,shippingAddress,totalPrice} = useContext(cartData)

  console.log("shiping address",shippingAddress)
  const { reference, order } = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      reference: searchParams.get("reference"),
      order: searchParams.get("order")
      
    };
    
  }, [location.search]);


  useEffect(()=>{

    const timer =setTimeout(()=>{
       setLoading(false);
    },800)

    return ()=>clearTimeout(timer) // Good Cleanup
},[])

  const orderData ={
    orderId:order ,
    reference: reference,
    payment_status: "paid",
    total_amount: totalPrice+99,
    payment_method: "razorpay",
    cartItem: cartItem.map(item => ({
      _id: item._id,
      product_category: item.product_category,
      product_price: item.product_price,
      product_quantity: item.product_quantity,
      product_rating: item.product_rating,
      product_image: item.product_image,
      product_name: item.product_name,
      product_description: item.product_description,
      total_price: item.total_price 
    })),
    shippingAddress: {
      name: shippingAddress.name,
      email: shippingAddress.email,
      phone: shippingAddress.phone,
      street: shippingAddress.street,
      city: shippingAddress.city,
      state: shippingAddress.state,
      pin: shippingAddress.pin,
      country: shippingAddress.country
    }
  }
  console.log(orderData)

  const OrderToSend = async() => {
   const response = await axios.post("http://localhost:3000/order/success",orderData)

   if(response.status >= 200 && response.status <= 300  )
    setLoading(false);
  }
  
  

  const handlehome =()=>{
    navigate('/')
  }

  if (loading) {
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center  bg-[rgba(0,0,0,0.3)] text-white'>
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-black border-t-transparent"></div>
    </div> 
    )
  }

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
    <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
      <CheckCircle className="text-green-500 w-20 h-20 mx-auto mb-4" />
      <h1 className="text-2xl font-semibold text-green-600">Payment Successful!</h1>
      <p className="text-gray-600 mt-2">
        Thank you for your purchase. Your transaction was completed successfully.
      </p>
      {reference  &&(
        <p className="mt-2 text-sm text-gray-700">
        <strong>Reference ID:</strong> <span className="text-green-700">{reference}</span>
      </p>

      )}

      <div className="mt-6">
        <button
          onClick={handlehome}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-xl shadow-md transition duration-300 cursor-pointer"
        >
          Go to Home
        </button>
      </div>
    </div>
  </div>
  
  )
}

export default PaymentSuccess