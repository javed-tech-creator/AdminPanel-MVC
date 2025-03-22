import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
const SignupPage = () => {

  const VITE_BACKEND_URL= "https://adminpanel-mvc-backend.onrender.com";

  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:"",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    }
  

  const handleSubmit = async(e)=>{
   e.preventDefault();
  //  console.log(formData);
   try {

    const data = await axios.post(`${VITE_BACKEND_URL}/user/signup`,formData)

    if(data.status >= 200 && data.status < 300){
      Swal.fire({
        title:"Form Submitted Successfully",
        text: "Successfull.",
        icon: "success",
      });

      setFormData({
        name:"",
        email:"",
        password:""
       })

       navigate("/login")
    } 

    
   } catch (error) {
    // console.log(error)

    Swal.fire({
      title: "Error",
      text: "Something went wrong.",
      icon: "error",
    });
   }
  }
  
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[url('/img/signup.jpg')] bg-cover bg-center">
<div className="max-w-2xl mx-auto p-6 bg-white  rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Admin-Registration</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
  <label>
    Name:
    <input type="text" name="name" value={formData.name} className="w-full p-2 border rounded" onChange={handleInputChange} />
  </label>

  <label>
    Email:
    <input type="email" name="email" value={formData.email} className="w-full p-2 border rounded" onChange={handleInputChange} />
  </label>

  <label>
    Password:
    <input type="password" name="password" value={formData.password} className="w-full p-2 border rounded mb-5" onChange={handleInputChange} />
  </label>


  <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
</form>
<p className="text-sm text-gray-600 text-center mt-3">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline ">Sign in</Link>
          </p>
  </div>
  </div>
  )
}

export default SignupPage