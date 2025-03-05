import { useState } from "react";
import { Home, Settings, Menu, X, LogOut, Image, ShoppingBag } from "lucide-react";
import SliderImage from "./Dashboard-Menu-Pages/SliderImage";
import ProductDetail from "./Dashboard-Menu-Pages/ProductDetail";
import HomeDash from "./Dashboard-Menu-Pages/HomeDash";
import HeaderNavbar from "./HeaderBar/HeaderNavbar"

export default function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeState,setActiveState] = useState("Home") 


 
  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-300 to-gray-200">
    {/* Sidebar */}
<div className={`fixed inset-y-0 left-0 w-64 bg-white/80 backdrop-blur-lg p-5 shadow-2xl  transition-transform transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:block`}>
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 tracking-wide">Admin-Panel</h2>
    <button className="lg:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition" onClick={() => setSidebarOpen(false)}>
      <X className="w-6 h-6 text-gray-700" />
    </button>
  </div>
  <nav className="space-y-4">
    <button
      onClick={() => setActiveState("Home")}
      className={`flex items-center px-4 py-3 rounded-lg text-gray-700 font-medium transition ${activeState === "Home" ? "bg-blue-100 text-blue-600 shadow-md" : "hover:bg-gray-100"}`}
    >
      <Home className="w-6 h-6 mr-3 text-red-500" />
      <span>Home</span>
    </button>
    <button
      onClick={() => setActiveState("Slider-Image")}
      className={`flex items-center px-4 py-3 rounded-lg text-gray-700 font-medium transition ${activeState === "Slider-Image" ? "bg-blue-100 text-blue-600 shadow-md" : "hover:bg-gray-100"}`}
    >
      <Image size={25} className="text-red-500 mr-3" />
      <span>Slider-Images</span>
    </button>
    <button
      onClick={() => setActiveState("Products-Details")}
      className={`flex items-center px-4 py-3 rounded-lg text-gray-700 font-medium transition ${activeState === "Products-Details" ? "bg-blue-100 text-blue-600 shadow-md" : "hover:bg-gray-100"}`}
    >
       <ShoppingBag size={25} className="text-red-500 mr-3"/>
      <span>Products-Details</span>
    </button>
    <button
      onClick={() => setActiveState("Settings")}
      className={`flex items-center px-4 py-3 rounded-lg text-gray-700 font-medium transition ${activeState === "Settings" ? "bg-blue-100 text-blue-600 shadow-md" : "hover:bg-gray-100"}`}
    >
      <Settings className="w-6 h-6 mr-3 text-red-500" />
      <span>Settings</span>
    </button>
  </nav>
</div>


      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">

       {/* Top Navigation */}
      <HeaderNavbar />

        {/* Dashboard Content */}
        <main>
        { activeState === "Home" && (
        <HomeDash />
        )}
        
        {activeState === "Slider-Image" && (
          <SliderImage/>
          
        )}
        
        {activeState === "Products-Details" && (
         <ProductDetail/> 
       )}
       </main>

      </div>
    </div>
  );
}