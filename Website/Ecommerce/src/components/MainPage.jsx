import SliderImage from './SliderImage'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Navbar from './Navbar';
import ProductsCard from './ProductsCard';
import { cartData } from '../store/Cart-data-store';
import FooterClient from './FooterClient';

const MainPage = () => {

  const [products, setProducts] = useState([]);
  const {cartItem,fetchedBagItem} = useContext(cartData);

  const fetchedData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product/all");
      setProducts(response.data);
    } catch (error) {
      console.error("Error Occurred During Fetching Product Details", error);
    }
  };

  
  // Fetch data on mount
  useEffect(() => {
    fetchedData();
  }, []);
  

console.log(cartItem)

  // Add item to the cart
  const handleCart = async(item) => {
   try {
   
      const existItem = cartItem.some((items)=> items._id === item._id)
      if(existItem){
   return  alert('Item Is Already Added')
       }

    const response = await axios.post('http://localhost:3000/cart/add',item)

    if(response.status >= 200 && response.status < 300 ){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Item Added in the Cart",
        showConfirmButton: false,
        timer: 1500
      }); 

      fetchedBagItem();
    }

   } catch (error) {
    console.log("Error during added item in Cart",error)
   }
  };
  
  

  return (
    <div>

          {/* Navbar  */}
    <Navbar cartItem ={cartItem} />

{/* slider image  */}
      <SliderImage/>

      <h2 className='p-4 text-gray-900'>Products </h2>

    {/* product card  */}

      <div className="flex flex-wrap justify-center gap-5 mb-5">
   
    <ProductsCard products={products} handleCart={handleCart} />
    
    </div>
    <FooterClient/>
    </div>
  )
}

export default MainPage