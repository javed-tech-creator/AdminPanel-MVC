import { ShoppingCart, User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({cartItem}) => {



  return (
    <nav className="bg-gray-700  shadow-md p-6 md:px-4 md:p-8">
           <div className="max-w-6xl mx-auto flex justify-between items-center">

             {/* Logo */}
             <h1 className="text-2xl font-bold text-white">ShopEase</h1>
     
             {/* Navigation buttons */}
             <ul className="hidden md:flex items-center gap-10 text-gray-700">
               <li>
                 <button >
                 <Link to='/'  className="text-white hover:text-blue-500 ">Home </Link>
                 </button>
               </li>
               <li>
                
                 <a href="#product" className="text-white no-underline hover:text-blue-500 ">
                 Products
                 </a>
               
                 </li>
               <li>
                 <button  className="text-white hover:text-blue-500">Deals</button>
               </li>
               <li>
                 <button  className="text-white hover:text-blue-500">Contact</button>
               </li>
             </ul>
     
             {/* Icons */}
             <div className="flex items-center gap-4">
               <Link to="/cart" className="relative">
                 <ShoppingCart size={30} className="text-white hover:text-blue-500" />
                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{cartItem.length}</span>
               </Link>
               <Link to="/profile">
                 <User size={30 } className="text-white hover:text-blue-500" />
               </Link>
             </div>
           </div>
         </nav>
  )
}

export default Navbar