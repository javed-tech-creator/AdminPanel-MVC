import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin, FaPinterestP, FaSquareTwitter } from "react-icons/fa6";
const FooterClient = () => {
  return (
    <footer className="bg-gray-700 shadow-md text-white w-full px-4 py-6">
    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row md:justify-between flex-wrap gap-8 pb-6">
      
      {/* Our Company Section */}
      <div className="min-w-[250px]">
        <h2 className="text-xl font-semibold mb-4">Our Company</h2>
        <ul className="space-y-2">
          <li><Link to="#" className="hover:border-b-2 hover:border-orange-500  py-1 ">About ShopEase</Link></li>
          <li><Link to="#" className="hover:border-b-2 hover:border-orange-500  py-1 ">Career</Link></li>
          <li><Link to="#" className="hover:border-b-2 hover:border-orange-500  py-1 ">About The Founder</Link></li>
          <li><Link to="#" className="hover:border-b-2 hover:border-orange-500  py-1 ">News</Link></li>
          <li><Link to="#" className="hover:border-b-2 hover:border-orange-500  py-1 ">Our Story</Link></li>
        </ul>
      </div>
  
      {/* Privacy & Terms Section */}
      <div className="min-w-[250px]">
        <h2 className="text-xl font-semibold mb-4">Privacy & Terms</h2>
        <ul className="space-y-2">
          <li><Link to="#" className="hover:border-b-2 hover:border-orange-500  py-1 ">Tracking Preferences</Link></li>
          <li><Link to="#" className="hover:border-b-2 hover:border-orange-500  py-1 ">Privacy Center</Link></li>
          <li><Link to="#" className="hover:border-b-2 hover:border-orange-500  py-1 ">Your Privacy Choices</Link></li>
          <li><Link to="#" className="hover:border-b-2 hover:border-orange-500  py-1 ">Terms of Use</Link></li>
          <li><Link to="#" className="hover:border-b-2 hover:border-orange-500  py-1 ">Program Terms & Conditions</Link></li>
          <li><Link to="#" className="hover:border-b-2 hover:border-orange-500  py-1 ">Sustainability in the Supply Chain</Link></li>
        </ul>
      </div>
  
      {/* Social Media Section */}
      <div className="min-w-[250px] text-center md:text-left">
        <h2 className="text-xl font-semibold mb-4">Follow ShopEase</h2>
        <div className="flex justify-center md:justify-start gap-6 mt-4 text-3xl">
          <Link to="#" className="text-[#1877F2] hover:text-[#3b8bef] transform hover:scale-110 transition md:text-4xl "><FaFacebook /></Link>
          <Link to="#" className="text-[#1DA1F2] hover:text-[#55c2ff] transform hover:scale-110 transition md:text-4xl "><FaSquareTwitter /></Link>
          <Link to="#" className="text-[#0077B5] hover:text-[#0a66c2] transform hover:scale-110 transition md:text-4xl "><FaLinkedin /></Link>
          <Link to="#" className="text-[#E4405F] hover:text-[#ff6b8b] transform hover:scale-110 transition md:text-4xl "><FaInstagram /></Link>
          <Link to="#" className="text-[#E60023] hover:text-[#ff4d4d] transform hover:scale-110 transition md:text-4xl "><FaPinterestP /></Link>
        </div>
      </div>
    </div>
  
    {/* Copyright */}
    <p className="text-sm text-center mt-4">© {new Date().getFullYear()} ShopEase</p>
  </footer>
  
  )
}

export default FooterClient