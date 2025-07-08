import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginPage = ()=> {
  const VITE_BACKEND_URL= "https://adminpanel-mvc-backend.onrender.com";

const navigate = useNavigate();

const [formData,setFormData] = useState({
    email:"",
    password:""
  })

  const handleInputChange = (e)=>{
   setFormData({
    ...formData,
    [e.target.name]:e.target.value
  })
  }

  const handleSubmit = async (e) =>{
   e.preventDefault();
try {
 
  const response = await axios.post(`${VITE_BACKEND_URL}/user/login`,formData)
  
  console.log(response)
  console.log("Login Token is :- ",response.data.token)

 
  if(response.status >= 200 && response.status< 300 ){

   await Swal.fire({
          title: "Login Successfully",
          text: "You now  Logged In.",
          icon: "success",
        });

        const token = response.data.token;
        localStorage.setItem("DashboardToken",token); //save token to localStorage
        localStorage.setItem("loginTimeStamp",Date.now());

 setFormData({
   email:"",
    password:""
 })

 navigate('/dashboard')

  }

  
} catch (error) {
  console.error("Error during  Login",error)
  if (error.response){
     Swal.fire({
                  title: "Error",
                  text: error.response.data.message || "Login Faild",
                  icon: "error",
                });
  }
}

}


  return (
      <div className="h-screen w-screen flex justify-center items-center bg-[url('/img/loginpage.jpg')] bg-cover bg-center">
   <div className="max-w-2xl mx-auto p-6 bg-white  rounded-lg">
         <h2 className="text-2xl font-bold mb-4">Admin-Panel</h2>
       <form onSubmit={handleSubmit} className="space-y-4">
     
     <label>
       Email:
       <input type="email" name="email" value={formData.email} className="w-full p-2 border rounded" onChange={handleInputChange} />
     </label>
   
     <label>
       Password:
       <input type="password" name="password" value={formData.password} className="w-full p-2 border rounded mb-5" onChange={handleInputChange} />
     </label>
   
   
     <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer">Submit</button>
   </form>
   <p className="text-sm text-gray-600 text-center mt-3">
               Don't have an account? <Link to="/" className="text-blue-600 hover:underline ">Sign Up</Link>
             </p>
     </div>
     </div>
  );
}

export default LoginPage;