import { LogOut, Menu } from 'lucide-react'
import React from 'react'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
const HeaderNavbar = () => {

  const navigate = useNavigate();

 const handleLogout = async () => {

   // Show confirmation dialog
   const result = await Swal.fire({
    title: 'Are You Sure?',
    text: 'This action will Logged Out.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, Log Out!',
  });  

  if (result.isConfirmed) {
    localStorage.removeItem("DashboardToken"); // Remove token
    navigate("/login"); // Redirect to login
  }
 
 }

  return (
    <header className="bg-gray-700 shadow-md p-8 flex items-center justify-between  lg:px-8">
    <button className="lg:hidden text-gray-700" onClick={() => setSidebarOpen(true)}>
      <Menu className="w-6 h-6" />
    </button>
    <h1 className="text-lg font-semibold text-white">Dashboard</h1>
    {/* Logout Button */}
    <button className="flex items-center space-x-2 text-red-600 hover:text-red-400 font-medium text-xl cursor-pointer" onClick={() =>handleLogout() }>
      <LogOut className="w-5 h-5" />
      <span>Logout</span>
    </button>
  </header>
  )
}

export default HeaderNavbar