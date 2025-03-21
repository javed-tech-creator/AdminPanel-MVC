import React from 'react'



const ProductsCard = ({products,handleCart}) => {
  return (
    <>
    { products.length > 0 ? (
      products.map((product,idx)=>(
    <div key={idx} className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-all duration-300 w-full max-w-sm ">
     {/* Product Image */}
     <div className="w-full h-86 overflow-hidden rounded-xl   ">
       <img
         src={`http://localhost:3000/products/${product.product_image}`}
         alt={product.product_name}
         className="w-full object-fit"
       />
     </div>

     {/* Product Details */}
     <div className="mt-4">
       <h3 className="text-lg font-semibold text-gray-800">{product.product_name}</h3>
       
       {/* Rating */}
       <div className="flex items-center my-2">
         <span className="text-yellow-400 text-xl">⭐</span>
         <span className="text-gray-600 ml-2">{product.product_rating} / 5</span>
       </div>

       {/* Price */}
       <p className="text-xl font-bold text-green-600">Rs {product.product_price}</p>

       {/* Add to Cart Button */}
       <button onClick={()=> handleCart(product)} className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg font-medium text-lg hover:bg-blue-700 transition">
         Add to Cart 🛒
       </button>
     </div>
   </div>
      ))
   ):(
     <p>No Reacords Found</p>
   )}
   </>
  )
}

export default ProductsCard