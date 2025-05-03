import { LogIn, LogOut, ShoppingCart, User } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import NavbarFormModel from "./NavbarFormModel";
import { cartData } from "../store/Cart-data-store";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = ({ cartItem }) => {
  const VITE_BACKEND_URL ="https://adminpanel-mvc-backend.onrender.com";
  

  const { authUser, setAuthUser } = useContext(cartData);

  const [showForm, setShowForm] = useState(false);

  const login = () => {
    setShowForm(true);
  };

  const logout = async () => {
    try {
      const res = await axios.post(
        `${VITE_BACKEND_URL}/ecommerce/logout`,
        {}, // no body
        {
          withCredentials: true // correct placement
        }
      );
  
      if (res.status >= 200 && res.status <= 300) {
        setAuthUser(false);
        toast.success('Logout Successful', {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error('Logout Failed', {
        autoClose: 1000,
      });
    }
  };
  

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <nav className="bg-gray-700  shadow-md p-5 md:px-4 md:p-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-3xl font-bold text-white tracking-widest">
            ShopEase
          </h1>

          {/* Navigation buttons */}
          <ul className="hidden md:flex items-center gap-10 text-gray-700">
            <li>
              <button>
                <Link
                  to="/"
                  className="text-white hover:text-blue-500 hover:border-b-2 hover:border-orange-500  py-3 "
                >
                  Home{" "}
                </Link>
              </button>
            </li>
            <li>
              <a
                href="#product"
                className="text-white no-underline hover:text-blue-500 hover:border-b-2 hover:border-orange-500  py-3  "
              >
                Products
              </a>
            </li>
            <li>
              <a className="text-white hover:text-blue-500 hover:border-b-2 hover:border-orange-500  py-3 cursor-pointer">
                Deals
              </a>
            </li>
            <li>
              <a className="text-white hover:text-blue-500 hover:border-b-2 hover:border-orange-500  py-3 cursor-pointer ">
                Contact
              </a>
            </li>
          </ul>

          <div className="flex gap-2 md:gap-10 ">
            {/* Icons */}
            {authUser && (
              <div className="flex items-center gap-4">
                <Link to="/cart" className="relative">
                  <ShoppingCart
                    size={30}
                    className="text-white hover:text-blue-500"
                  />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {cartItem.length}
                  </span>
                </Link>
                <Link to="/profile">
                  <User size={30} className="text-white hover:text-blue-500 " />
                </Link>
              </div>
            )}
            {!authUser && (
              <button
                className="text-white flex items-center justify-center cursor-pointer  hover:text-blue-500 gap-1"
                onClick={login}
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}

            {authUser && (
              <button
                className="text-white flex items-center justify-center cursor-pointer  hover:text-blue-500 gap-1"
                onClick={logout}
              >               
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Render the modal conditionally */}
      {showForm && (
        <NavbarFormModel closeForm={closeForm} setShowForm={setShowForm} />
      )}
    </>
  );
};

export default Navbar;
