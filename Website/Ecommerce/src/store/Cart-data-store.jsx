import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const cartData = createContext();

const CartItemsStore = ({children}) => {

  const [cartItem, setItemCart] = useState([]); // Holds cart data

  const fetchedBagItem = async() => {
    try {
      const response = await axios.get('http://localhost:3000/cart/get');
      setItemCart(response.data.fetchedData);
    } catch (error) {
      console.error("Error during fetching Cart item");
    }
  };

   const removeFromBag = async(id)=>{
      try {
        const response = await axios.delete(`http://localhost:3000/cart/delete/${id}`)
        
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
    <cartData.Provider value={{cartItem,fetchedBagItem,removeFromBag}}>
    {children}
    </cartData.Provider>
    </>
  )
}

export default CartItemsStore