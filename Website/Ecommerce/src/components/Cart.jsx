import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { useContext } from 'react';
import { cartData } from '../store/Cart-data-store';
import FooterClient from './FooterClient';
import { FaPlus } from 'react-icons/fa6';
import { TiMinus } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {

const {cartItem,removeFromBag,cartLoader,totalPrice,discountPrice,increaseQuantity,decreaseQuantity} = useContext(cartData);
const navigate = useNavigate();
 
    
    const handlePlaceOrder = () => {
     
      if(cartItem.length > 0){
      navigate('/address')
    }else{
      toast.warning('No Items in Cart', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    };

   

  return (
    <>
      

         {/* navbar  */}
         <Navbar cartItem ={cartItem} />

         {/* item showed area  */}
        
         <div className="flex flex-col md:flex-row flex-wrap gap-5 mb-5 ">
      {/* Cart Items Section */}
     
      
      <div className="w-full md:w-1/2">
      {!cartLoader &&(
        <div className="flex justify-center items-center p-5 h-[300px]">
  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-4 border-dashed rounded-full animate-spin border-gray-300"></div>
  </div>
      )}

        { cartItem.map((item, idx) => (
          
            <div key={idx} className="flex items-center justify-between p-4 border-b border-gray-300 mt-3">
              {/* Left Part: Image */}
              
              <div className="w-24 h-34 flex-shrink-0">
                <img className="w-full h-full object-cover" src={item.product_image} alt={item.product_name} />
              </div>
              {/* Right Part: Item Details */}
              <div className="flex-1 px-4">
                <div className="text-lg font-bold">{item.product_name}</div>
                <p className="text-[#535767]  text-base block overflow-hidden text-ellipsis ">
                    {item.product_description}
                  </p>
                <div className="flex items-center space-x-2 text-sm mt-1">
                  <span className="text-green-600 font-bold">₹{item.product_price}</span>
                  <span className="line-through text-[#7e818c] font-normal text-xs ml-2">
                      ₹ {item.total_price}
                    </span>
                  <span className="text-red-500">({Math.round(((item.total_price - item.product_price) / item.total_price) * 100)}% OFF)</span>
                </div>
                <div className="text-gray-600 text-sm mt-1">
                  <span className="font-medium">7 days</span> return available
                </div>
                <div className="text-gray-600 text-sm mt-1">
                  Delivery in <span className="font-medium">10 days</span>
                </div>  
                
              </div>

               {/* Quantity Selector */}
               <div className="flex flex-col lg:flex-row gap-2 lg:gap-1 items-center">
               <button className="p-1 bg-red-600 hover:bg-red-800 text-white rounded hover:cursor-pointer" onClick={() => decreaseQuantity(item._id)}><TiMinus /></button>
          <input 
            type="text" 
            className="w-10 text-center border border-gray-400 rounded" 
            value={item.product_quantity} 
            readOnly 
          />
          <button className="p-1 bg-green-600 hover:bg-green-800 text-white rounded hover:cursor-pointer " onClick={() => increaseQuantity(item._id)}><FaPlus /></button>
        </div>

  
              
              {/* Remove from Cart Button */}
              <button className="text-red-600 hover:text-red-800  font-bold px-2 hover:cursor-pointer" onClick={() => removeFromBag(item._id)}>
                X
              </button>
            </div>
          ))
        }
       {cartLoader && cartItem.length === 0 && (
         <p className='text-center p-5 text-4xl text-red-400'>Items Not Added</p>
        )}
      </div>

      {/* Price Details Section */}
      <div className="w-full md:w-1/3 border-l-1 border-gray-300 p-4">
        <div className="p-4 border border-gray-300 rounded-lg shadow-md">
          <div className="text-lg font-bold text-gray-700">PRICE DETAILS Products Items</div>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Total MRP</span>
              <span>₹ {totalPrice}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount on MRP</span>
              <span>-₹ {discountPrice-totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Convenience Fee</span>
              <span>{cartItem.length > 0 ? "₹ 99" : "₹0"}</span>
            </div>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-bold text-lg text-gray-800">
            <span>Total Amount</span>
            <span>₹ {cartItem.length > 0 ? totalPrice + 99 : 0 }</span>
          </div>
          <button  onClick={handlePlaceOrder} className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
<FooterClient/>

{/* toast container  */}

      </>
  )
}

export default Cart