import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export const cartData = createContext();

const CartItemsStore = ({ children }) => {
  const VITE_BACKEND_URL = "https://adminpanel-mvc-backend.onrender.com";

const [totalPrice,setTotalPrice] = useState(0)
const [discountPrice,setDiscountPrice]= useState(0)
const [cartItem, setItemCart] = useState([]); // Holds cart data
const [cartLoader, setCartLoader] = useState(false);
const [progress,setProgress] = useState(false)
const[paymentLoader,setPaymentLoader] = useState(false)
const [authUser,setAuthUser]= useState(null) 
 const [shippingAddress, setShippingAddress] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pin: "",
    country: "",
  });


  const fetchAuthUser = async()=>{
    try {

      const res = await axios.post(`${VITE_BACKEND_URL}/ecommerce/verify`, {}, {
        withCredentials: true
      })
      if(res.status >=200 && res.status <= 300){
        setAuthUser(res.data.user)
      }
    } catch (error) {
    // console.log(error)
    }

  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();

    setPaymentLoader(true)
try{
    const res = await axios.get(`${VITE_BACKEND_URL}/payment/getkey`);
    const{key} = res.data;

  setProgress(true);

  const amount =totalPrice+99
    const response = await axios.post(`${VITE_BACKEND_URL}/payment/process`,{amount});
    const {order} = response.data
    console.log("order",order);

    setPaymentLoader(false)
// Open Razorpay Checkout
const options = {
  key:key,// Replace with your Razorpay key_id
  amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  currency: 'INR',
  name: 'ShopEase',
  description: 'Test Transaction',
  order_id: order.id, // This is the order_id created in the backend
  callback_url: `${VITE_BACKEND_URL}/payment/varification`, // Your success URL
  prefill: {
    name: shippingAddress.name,
    email: shippingAddress.email,
    contact: shippingAddress.phone
  },
  theme: {
    color: '#F37254'
  },
};
const rzp = new Razorpay(options);
rzp.open();


} catch (error) {
  console.log("Error during api call",error)
}

  };

  useEffect(()=>{
    fetchedBagItem();
    fetchAuthUser();
  },[])

  useEffect(() => {
    const { total, totalDiscount } = cartItem.reduce(
      (acc, item) => {
        const price = Number(item.product_price);
        const quantity = Number(item.product_quantity);
        const discountPrice = Number(item.total_price);
  
        acc.total += price * quantity;
        acc.totalDiscount += discountPrice * quantity;
        return acc;
      },
      { total: 0, totalDiscount: 0 }
    );
  
    setTotalPrice(total);
    setDiscountPrice(totalDiscount);
  
    console.log(total);
    console.log(totalDiscount);
  }, [cartItem]);
  



    console.log(totalPrice)
 
  const fetchedBagItem = async () => {
    try {
      const response = await axios.get(`${VITE_BACKEND_URL}/cart/get`);
      setItemCart(response.data.fetchedData);
      setCartLoader(true);
    } catch (error) {
      console.error("Error during fetching Cart item");
    }
  };

  const removeFromBag = async (id) => {
    try {
      const response = await axios.delete(
        `${VITE_BACKEND_URL}/cart/delete/${id}`
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success('Remove Successfully !', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        fetchedBagItem();
      }
    } catch (error) {
      console.log("Error During deleting the cart item", error);
    }
  };


  const increaseQuantity = (id) => {
    setItemCart(prevItems =>
      prevItems.map(item =>
        item._id === id
          ? { ...item, product_quantity: item.product_quantity + 1 }
          : item
      )
    );

  };

  const decreaseQuantity = (id) => {
    setItemCart(prevItems =>
      prevItems.map(item =>
        item._id === id && item.product_quantity > 1
          ? { ...item, product_quantity: item.product_quantity - 1 }
          : item
      )
    );

  };


  return (
    <>
      <cartData.Provider
        value={{ cartItem, fetchedBagItem, removeFromBag, cartLoader, setItemCart, totalPrice, discountPrice,shippingAddress,handleChange,increaseQuantity, decreaseQuantity,paymentLoader,progress,handleSubmit,authUser,setAuthUser}}
      >
        {children}
      </cartData.Provider>

    </>
  );
};

export default CartItemsStore;
