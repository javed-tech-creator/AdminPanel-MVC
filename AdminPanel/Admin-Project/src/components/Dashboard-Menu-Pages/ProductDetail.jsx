import React, { useEffect, useState }  from 'react'
import { Edit, Plus, Star, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

const ProductDetail = () => {

  
  const [productForm,setProductForm] = useState(false)
  const [formData,setFormData] = useState({
    product_name:"",
    product_price:"",
    product_rating:"",
    product_image:null
  })

  const [currentId,setCurrentId] = useState(null)
  const [fetchedData,setFetchedData] = useState([])

  const formInputChange = (e)=>{
    const {name,value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const formFileChange = (e)=>{
    setFormData({
      ...formData,
      product_image:e.target.files[0]
    })
  }

  const fetchedProductData = async()=>{
    try {
      const response= await axios.get('http://localhost:3000/product/all')
      setFetchedData(response.data);

    } catch (error) {
      console.error("error during fetching data",error)
    }
  }

  useEffect(()=>{
    fetchedProductData();
  },[]);

  const handleSubmit = async(e)=>{
   e.preventDefault();
   try {
    let response;
    if(currentId){
      response = await axios.put(`http://localhost:3000/product/update/${currentId}`,formData,{
        headers:{"Content-Type":"multipart/form-data"}
      })
    }else{
      response = await axios.post('http://localhost:3000/product/add',formData,{
        headers:{"Content-Type":"multipart/form-data"}
      })
    }

    if(response.status >=200 && response.status <300){
      Swal.fire({
              title:`${currentId ? "Updated Successfully":" Submitted Successfully"}`,
              text: "Successfull.",
              icon: "success",
          })
          
          setFormData({
            product_name:"",
            product_price:"",
            product_rating:"",
            product_image:null
          })

          setCurrentId(null)
          setProductForm(false)
          fetchedProductData();
    }

    
   } catch (error) {
    console.error("Error during submitting the form ",error)
    Swal.fire({
          title:`${currentId ? "Error Updating":"Error Submitting"}`,
          text: error.message,
          icon: "error",
   })

  }}

  const handleupdate = (userid)=>{
    const product = fetchedData.find(item => item._id === userid)
    setFormData({
      product_name:product.product_name,
      product_price:product.product_price,
      product_rating:product.product_rating,
      product_image:product.product_image
    })
    setProductForm(true)
    setCurrentId(userid);
  }

  const itemAdd = ()=>{
    setFormData({
      product_name:"",
      product_price:"",
      product_rating:"",
      product_image:null
    })
    setProductForm(true)
  }

  const handledelete = async(userid)=>{
    try {

 // Show confirmation dialog
           const result = await Swal.fire({
            title: 'Are You Sure?',
            text: 'This action will Delete Product.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Delete it!',
          });  
        
          if (result.isConfirmed) {

      const response = await axios.delete(`http://localhost:3000/product/delete/${userid}`)

      if(response.status >=200 && response.status <300){
        Swal.fire({
                title: "Deleted Successfully",
                text: "Successfull.",
                icon: "success",
            })

            fetchedProductData();
      }  
    }
    } catch (error) {
      console.error("Error during delete ",error)
    }
  }
  return (
    <div>
        <h2 className="lg:text-4xl sm:text-3xl font-bold text-center mt-4 ">Product Details</h2>


{/* button form opening  */}
<button
className="float-right mr-8 mt-5   rounded-lg bg-green-600 text-white px-2 py-3  flex items-center hover:bg-green-700 transition"
onClick={itemAdd}>
<Plus size={20} />
<span>Add Product</span>
</button>

<div className="p-6 mt-15">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
{fetchedData.length > 0 ? (
  fetchedData.map((product, index) => (
    <div key={index} className=" shadow-lg rounded-2xl border p-4 ">
      <img 
        src={`http://localhost:3000/products/${product.product_image}`} 
        alt={product.product_name} 
        className="w-full h-96 object-cover rounded-lg" 
      />
      <div className="mt-4">
        <h2 className="text-lg font-semibold">{product.product_name}</h2>
        <p className="text-gray-600">Rs {product.product_price}</p>
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, idx) => (
            <Star key={idx} size={16} className={idx < product.product_rating ? "text-yellow-500" : "text-black"} />
          ))}
        </div>
      </div>
      <div className=" flex gap-4 justify-end">
                <button onClick={() => handleupdate(product._id)} className="text-blue-500 hover:text-blue-700 cursor-pointer">
                  <Edit size={20} />
                </button>
                <button onClick={() => handledelete(product._id)} className="text-red-500 hover:text-red-700 cursor-pointer">
                  <Trash2 size={20} />
                </button>
              </div>
    </div>
  ))
) : (
  <p>No product details found.</p>
)}
</div>
</div>



{/* model form  */}
{productForm && (
<div className="fixed lg:ml-64 inset-0 bg-transparent flex justify-center items-center">
<div className="bg-white  p-8 rounded-lg shadow-lg w-100 ">
<h2 className="text-xl font-bold text-center mb-4 text-black ">{currentId ? "Update details":"Add details"}</h2>

<form onSubmit={handleSubmit}>


<div className=" mb-4">
<label className="block text-black ">Product_Name:</label>
<input
  type="text"
  name="product_name"
  value={formData.product_name}
  onChange={formInputChange}
  className="w-full p-2 border rounded text-black "
  required
/>
</div>
<div className=" mb-4">
<label className="block text-black ">Product_Price:</label>
<input
  type="number"
  name="product_price"
  value={formData.product_price}
  onChange={formInputChange}
  className="w-full p-2 border rounded text-black "
  required
/>
</div>

<div className=" mb-4">
<label className="block text-black ">Product_Rating:</label>
<input
  type="number"
  name="product_rating"
  value={formData.product_rating}
  onChange={formInputChange}
  className="w-full p-2 border rounded text-black "
  required
/>
</div>


<div className="mb-4">
<label className="block text-black">Product Image:</label>
<input
type="file"
name="product_image"
onChange={formFileChange}
className="w-full p-2 border rounded text-black "
// required
/>
</div>


{/* Modal Buttons */}
<div className="flex justify-end gap-4">
<button
type="button"
onClick={() =>{ 
  setProductForm(false)
  setCurrentId(null)
 }}
className="px-4 py-2 text-red-600 hover:text-red-800 transition cursor-pointer"
>
Cancel
</button>

<button
type="submit"
className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
>
{currentId ? "Update":"Save"}
</button>
</div>
</form>
</div>
</div>
)}
</div>
  )
}

export default ProductDetail