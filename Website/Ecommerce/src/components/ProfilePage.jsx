import React, { useContext } from "react";
import {  Mail, Edit } from "lucide-react";
import FooterClient from "./FooterClient";
import Navbar from "./Navbar"
import { cartData } from "../store/Cart-data-store";

const ProfilePage = () => {
    const { cartItem } = useContext(cartData);
  
  return (
    <>
    <Navbar cartItem={cartItem}/>
    <div className="  flex flex-col items-center bg-gray-100 p-6 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center mb-10">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <img
            src="/My photo.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
        </div>

        {/* User Info */}
        <h2 className="text-2xl font-bold mt-4 text-gray-800">Javed Ahmad</h2>
        <p className="text-gray-500 flex items-center justify-center gap-1">
          <Mail size={18} /> javed1dev@gmail.com
        </p>

        {/* Bio Section */}
        <p className="mt-4 text-gray-600 text-sm px-4">
          A passionate web developer with expertise in "MERN Full Stack Developer" and modern web technologies.
        </p>

        {/* Edit Profile Button */}
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
          <Edit size={18} /> Edit Profile
        </button>
      </div>
    </div>
    <FooterClient/>
    </>
  );
};

export default ProfilePage;
