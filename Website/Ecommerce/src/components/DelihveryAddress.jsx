import React, { useContext, useState } from "react";
import FooterClient from "./FooterClient";
import Navbar from "./Navbar";
import { cartData } from "../store/Cart-data-store";
import ProgressBar from "./ProgressBar";

export default function DelihveryAddress() {

  const {cartItem} = useContext(cartData);
const [submit,setSubmit] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pin: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    formData.payment="success";
    console.log("Submitted Address Data:", formData);
    // You can send this data to your backend API here
  };

  return (
    <>
     {/* navbar  */}
     <Navbar cartItem = {cartItem} />

   <ProgressBar submit = {submit}/>

{/* form  start */}

    <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-2xl shadow-md mb-5">
      <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Street Address</label>
          <input
            type="text"
            name="street"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              type="text"
              name="state"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pin Code</label>
            <input
              type="text"
              name="zip"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <input
            type="text"
            name="country"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Submit & Payment
        </button>
      </form>
    </div>
    <FooterClient/>


    </>
  );
}
