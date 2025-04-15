import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const cartData = createContext();

const CartItemsStore = ({children}) => {
  const VITE_BACKEND_URL= "https://adminpanel-mvc-backend.onrender.com";

  const [cartItem, setItemCart] = useState([]); // Holds cart data
  const[cartLoader,setCartLoader] = useState(false);
  const fetchedBagItem = async() => {
    try {
      const response = await axios.get(`${VITE_BACKEND_URL}/cart/get`);
      setItemCart(response.data.fetchedData);
      setCartLoader(true)
    } catch (error) {
      console.error("Error during fetching Cart item");
    }
  };

   const removeFromBag = async(id)=>{
      try {
        const response = await axios.delete(`${VITE_BACKEND_URL}/cart/delete/${id}`)
        
        if(response.status >=200 && response.status < 300){
          fetchedBagItem();
        }
  
      } catch (error) {
        console.log("Error During deleting the cart item",error)
      }
      }
  
  // Fetch data on mount
  useEffect(() => {
    fetchedBagItem();
  }, []);


  return (
    <>
    <cartData.Provider value={{cartItem,fetchedBagItem,removeFromBag,cartLoader}}>
    {children}
    </cartData.Provider>
    </>
  )
}

export default CartItemsStore