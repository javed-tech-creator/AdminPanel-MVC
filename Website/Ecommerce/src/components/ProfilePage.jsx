import React from "react";
import {  Mail, Edit } from "lucide-react";
import FooterClient from "./FooterClient";

const ProfilePage = () => {
  return (
    <div className="min-h-screen  flex flex-col items-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center mb-10">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <img
            src="/photo.webp"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
        </div>

        {/* User Info */}
        <h2 className="text-2xl font-bold mt-4 text-gray-800">John Doe</h2>
        <p className="text-gray-500 flex items-center justify-center gap-1">
          <Mail size={18} /> johndoe@example.com
        </p>

        {/* Bio Section */}
        <p className="mt-4 text-gray-600 text-sm px-4">
          A passionate web developer with expertise in React, Tailwind CSS, and modern web technologies.
        </p>

        {/* Edit Profile Button */}
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
          <Edit size={18} /> Edit Profile
        </button>
      </div>

      <div className="position absolute bottom-0 w-full">
      <FooterClient/>
      </div>

    </div>
  );
};

export default ProfilePage;
