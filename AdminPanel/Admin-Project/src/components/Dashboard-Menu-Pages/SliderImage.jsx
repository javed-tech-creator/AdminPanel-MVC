import { Edit, Pencil, Plus, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import axios from "axios"
import Swal from "sweetalert2"

import process from "process";
const SliderImage = () => {

  const VITE_BACKEND_URL= "https://adminpanel-mvc-backend.onrender.com";
 
  const [sliderForm,isSliderForm] = useState(false)
  const [formData,setFormData] = useState({
    image_title:"",
    image_url:null
  })
  const [sliderImage,setSliderImage] =useState([])
  const [currentId,setCurrentId] = useState(null)

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
      image_url:e.target.files[0]
    })
  }
  const handleSubmit = async(e)=>{
   e.preventDefault();
   try {
    let response
    if(currentId){
      response = await axios.put(`${VITE_BACKEND_URL}/slider/update/${currentId}`,formData,{
        headers:{"Content-Type":"multipart/form-data"}
      })

    }else{
     response = await axios.post(`${VITE_BACKEND_URL}/slider/save`,formData,{
      headers:{"Content-Type":"multipart/form-data"}
    })
  }
    if(response.status >= 200 && response.status < 300){

      Swal.fire({
        title:`${currentId ? "Updated Successfully":" Submitted Successfully"}`,
        text: "Successfull.",
        icon: "success",
    })

    setFormData({
      image_title:"",
      image_url:null
    })

    fetchedSliderImages();
    setCurrentId(null);
    isSliderForm(false)
  }
    
   } catch (error) {
    console.error("error during submit",error)
    Swal.fire({
      title:`${currentId ? "Error Updating":"Error Submitting"}`,
      text: "Error.",
      icon: "error",
   })
  }
  }
  const fetchedSliderImages = async()=>{
try {
   const response = await axios.get(`${VITE_BACKEND_URL}/slider/get`);

   setSliderImage(response.data.data)
  

} catch (error) {
  console.error("Error during fecthing Data",error)
}
  }

  useEffect(()=>{
    fetchedSliderImages();
  },[])

  const handledelete = async(userid)=>{
    try {
       // Show confirmation dialog
           const result = await Swal.fire({
            title: 'Are You Sure?',
            text: 'This action will Delete Slider.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Delete it!',
          });  
        
          if (result.isConfirmed) {
            const response = await axios.delete(`${VITE_BACKEND_URL}/slider/delete/${userid}`)

            if(response.status >= 200 && response.status < 300){

              Swal.fire({
                title:"Deleted Successfully",
                text: "Successfull.",
                icon: "success",
            })   

            fetchedSliderImages();

          }

          }
       
 
    } catch (error) {
      console.error("Error Occured During Deleting",error)
    }

  }

  const handleupdate = (userid)=>{ 

   const user = sliderImage.find(user=>  user._id === userid )
  
   setFormData({
    image_title:user.image_title,
      image_url:user.image_url

   })

    isSliderForm(true)
    setCurrentId(userid)

  }

  const handleAddForm = ()=>{

    setFormData({
      image_title:"",
      image_url:null

    })
    isSliderForm(true)
  }

  return (
    <div>
        <h2 className="lg:text-4xl sm:text-3xl font-bold text-center mt-4 ">Slider Images</h2>


{/* button form opening  */}
<button
className="float-right mr-8 mt-5   rounded-lg bg-green-600 text-white px-2 py-3  flex items-center hover:bg-green-700 transition"
onClick={handleAddForm}>
<Plus size={20} />
<span>Add Image</span>
</button>

console.log(sliderImage);

<div className="p-6 mt-15">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sliderImage.length > 0 ? (
          sliderImage.map((slider) => (
            <div key={slider._id} className="border p-4 rounded-lg shadow-md ">
              <img
                src={slider.image_url}
                alt={slider.image_url || "Slider Image"}
                className="w-full h-80 object-cover rounded-lg"
              />
              
              <h3 className="mt-2 text-lg font-semibold flex justify-between">
                <span>{slider.image_title}</span>
                <span className='flex gap-4'> 
                  <button className='text-blue-700 cursor-pointer' onClick={()=>{handleupdate(slider._id)}}> <Edit size={20} /></button>
                  <button className='text-red-700 cursor-pointer' onClick={()=>{handledelete(slider._id)}}><Trash size={20} /></button>
                  </span>
                </h3>
            </div>
          ))
        ) : (
          <p>No slider images found.</p>
        )}
      </div>
    </div>


{/* model form  */}
{sliderForm && (
<div className="fixed lg:ml-64 inset-0 bg-transparent flex justify-center items-center">
<div className="bg-gray-300  p-8 rounded-lg shadow-lg w-100">
<h2 className="text-xl font-bold text-center mb-4 text-black ">Add Image</h2>

<form onSubmit={handleSubmit}>


<div className=" mb-4">
<label className="block text-black ">Image_Title:</label>
<input
  type="text"
  name="image_title"
  value={formData.image_title}
  onChange={formInputChange}
  className="w-full p-2 border rounded text-black "
  required
/>
</div>

<div className="mb-4">
<label className="block text-black">Image:</label>
<input
type="file"
name="image_url"
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
  isSliderForm(false);
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

export default SliderImage