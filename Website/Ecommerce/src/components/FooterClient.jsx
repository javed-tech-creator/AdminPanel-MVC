import React from 'react'
import { Link } from 'react-router-dom'
import './FooterClient.css'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import { FaPinterestP } from "react-icons/fa6";
const FooterClient = () => {
  return (
    <footer className="footer bg-gray-700  shadow-md">
    <div className="footer-container">
        <div className="footer-section">
            <h2>Our Company</h2>
            <p><Link to="#">About ShopEase</Link></p>
            <p><Link to="#">Career</Link></p>
            <p><Link to="#">About The Founder</Link></p>
            <p><Link to="#">News</Link></p>
            <p><Link to="#">Our Story</Link></p>
        </div>
        <div className="footer-section">
            <h2>Privacy & Terms</h2>
            <p><Link to="#">Tracking Preferences</Link></p>
            <p><Link to="#">Privacy Center</Link></p>
            <p><Link to="#">Your Privacy Choices</Link></p>
            <p><Link to="#">Terms of Use</Link></p>
            <p><Link to="#">Program Terms & Conditions</Link></p>
            <p><Link to="#">Sustainability in the Supply Chain</Link></p>
        </div>
        <div className="footer-section follow" >
            <h2>Follow ShopEase</h2>
            <div className="social-icons">
            <Link to="#" className="instagram"><Instagram size={42} /></Link>
            <Link to="#" className="facebook"><Facebook size={42} /></Link>
            <Link to="#" className="twitter"><Twitter size={42} /></Link>
            <Link to="#" className="linkedin"><Linkedin size={42} /></Link>
            <Link to="#" className="pinterest"><FaPinterestP size={42} /></Link>
            </div>
        </div>
    </div>
    <p className="copyright">Copyright © ShopEase</p>
</footer>
  )
}

export default FooterClient