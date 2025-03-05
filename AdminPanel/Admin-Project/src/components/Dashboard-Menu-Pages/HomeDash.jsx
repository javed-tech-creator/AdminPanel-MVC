import { Image, ShoppingBag, TrendingUp } from 'lucide-react'
import React from 'react'

const HomeDash = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500 transition hover:scale-105 duration-300">
            <h3 className="text-lg font-semibold text-gray-800 flex">
            <TrendingUp size={25} className="text-blue-600 mr-2" />
            Total Sales</h3>
            <p className="text-3xl font-bold text-blue-600 ms-8">$12,345</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-500 transition hover:scale-105 duration-300">
            <h3 className="text-lg font-semibold text-gray-800 flex">
             <Image size={25} className="text-green-500 mr-3" />
            Slider Images</h3>
            <p className="text-3xl font-bold text-green-600  ms-8">1,234</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-red-500 transition hover:scale-105 duration-300">
            <h3 className="text-lg font-semibold text-gray-800 flex">
             <ShoppingBag size={25} className="text-red-500 mr-2"/>
            Products Details
            </h3>
            <p className="text-3xl font-bold text-red-600 ms-8">567</p>
          </div>

        </div>
  )
}

export default HomeDash