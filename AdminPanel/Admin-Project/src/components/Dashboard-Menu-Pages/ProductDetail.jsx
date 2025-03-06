import React, { useState }  from 'react'
import { Plus } from 'lucide-react';

const ProductDetail = () => {

  
  const [productForm,isProductForm] = useState(false)
  const [formData,setFormData] = useState({
    product_name:"",
    product_price:"",
    product_rating:"",
    product_image:null
  })

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
  const handleSubmit = (e)=>{
   e.preventDefault();
   console.log(formData);
  }

  return (
    <div>
        <h2 className="lg:text-4xl sm:text-3xl font-bold text-center mt-4 ">Product Details</h2>


{/* button form opening  */}
<button
className="float-right mr-8 mt-5   rounded-lg bg-green-600 text-white px-2 py-3  flex items-center hover:bg-green-700 transition"
onClick={()=>isProductForm(true)}>
<Plus size={20} />
<span>Add Product</span>
</button>



{/* model form  */}
{productForm && (
<div className="fixed lg:ml-64 inset-0 bg-transparent flex justify-center items-center">
<div className="bg-white  p-8 rounded-lg shadow-lg w-100 ">
<h2 className="text-xl font-bold text-center mb-4 text-black ">Add Image</h2>

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
  type="text"
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
  type="text"
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
required
/>
</div>


{/* Modal Buttons */}
<div className="flex justify-end gap-4">
<button
type="button"
onClick={() =>{ 
  isProductForm(false)
 }}
className="px-4 py-2 text-red-600 hover:text-red-800 transition cursor-pointer"
>
Cancel
</button>

<button
type="submit"
className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
>
Save
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