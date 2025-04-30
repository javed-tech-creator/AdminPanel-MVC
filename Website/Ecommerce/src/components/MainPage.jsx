import SliderImage from "./SliderImage";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import ProductsCard from "./ProductsCard";
import { cartData } from "../store/Cart-data-store";
import FooterClient from "./FooterClient";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
const MainPage = () => {
  // http://localhost:3000
  const VITE_BACKEND_URL = "https://adminpanel-mvc-backend.onrender.com";

  const [products, setProducts] = useState([]);
  const { cartItem, fetchedBagItem } = useContext(cartData);
  const [loader, setLoader] = useState(false);
  const filterCategory = useRef();
  const filterPrice = useRef();
  const[filterCateg,setFilterCateg]=useState("");
  const[filterPric,setFilterPric]=useState("");


  const fetchedData = async () => {
    try {
      const response = await axios.get(`${VITE_BACKEND_URL}/product/all`);
      setProducts(response.data);
      setLoader(true);
    } catch (error) {
      console.error("Error Occurred During Fetching Product Details", error);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchedData();
  }, []);

  console.log(cartItem);

  // Add item to the cart
  const handleCart = async (item) => {
    try {
      const existItem = cartItem.some((items) => items._id === item._id);
      if (existItem) {
        return  toast.warning('Item is Already in the Cart!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      console.log("checking...", item);

      const response = await axios.post(`${VITE_BACKEND_URL}/cart/add`, item);

      if (response.status >= 200 && response.status < 300) {
        toast.success('Item Added in the Cart!', {
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
      console.log("Error during added item in Cart", error);
    }
  };

  const category =[
    {
      category:"Furniture",
      
  },
{
        category:"TwoWheelers",
        

    },
  {
        category:"Electronics",
        

    },
  {
        category:"Shirts"
    },
   {
        category:"Slipers"
    },
   {
        category:"Bags"
    },
   {
        category:"Watch"
    },
   {
        category:"Shoes"
    },
  
  
];
const Price =[
  {
    price:500
},
{
      price:800

  },
{
      price:1000

  },
{
  price:10000

},
]

const handleCategoryFilter =()=>{
const filterValue = filterCategory.current.value ;
setFilterCateg(filterValue);
}

const handlePriceFilter=()=>{
  const filterValues = filterPrice.current.value ;
  setFilterPric(filterValues);  
  }


const filteredProducts = products.filter((item) => {
  const categoryMatch = !filterCateg || filterCateg === item.product_category;
  const priceMatch = !filterPric || filterPric >= item.product_price;
  return categoryMatch && priceMatch;
});


  return (
    <div>
      {/* Navbar  */}
      <Navbar cartItem={cartItem} />

      {/* slider image  */}
      <SliderImage />
    
    <div className="flex gap-5 items-center">
      <h2 className="p-4 font-bold text-gray-900 md:text-2xl md:font-bold uppercase  tracking-widest">
        Products
      </h2>
     <div>
      <select onChange={handleCategoryFilter} ref={filterCategory} className=" text-sm md:font-bold md:text-md outline-none bg-gray-200 rounded-3xl py-0 px-0 md:px-3 md:py-1 md:border-1" >
        <option value="" >Category</option>
        {category.map((item,idx)=>(
        <option key={idx} value={item.category}>{item.category}</option>
      ))}
      </select>
     </div>
     <div>
      
      <select onChange={handlePriceFilter} ref={filterPrice} className=" text-sm md:font-bold md:text-md outline-none bg-gray-200 rounded-3xl py-0 px-0 md:px-3 md:py-1 md:border-1" >
        <option value="" >Price-Range</option>
        {Price.map((item,idx)=>(
        <option key={idx} value={item.price}>{item.price}</option>
      ))}
      </select>
     </div>
</div>
      {/* product card  */}

      <ProductsCard
        products={filteredProducts}
        handleCart={handleCart}
        loader={loader}
      />

      {/* </div> */}
      <FooterClient />

    
    </div>
  );
};

export default MainPage;
