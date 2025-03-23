import React from 'react'



const ProductsCard = ({products,handleCart}) => {


  return (
  //   <>
  //   { products.length > 0 ? (
  //     products.map((product,idx)=>(
  //   <div key={idx} className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-all duration-300 w-full max-w-sm ">
  //    {/* Product Image */}
  //    <div className="w-full h-86 overflow-hidden rounded-xl   ">
  //      <img
  //        src={product.product_image}
  //        alt={product.product_name}
  //        className="w-full h-full object-cover"
  //      />
  //    </div>

  //    {/* Product Details */}
  //    <div className="mt-4">
  //      <h3 className="text-lg font-semibold text-gray-800">{product.product_name}</h3>
       
  //      {/* Rating */}
  //      <div className="flex items-center my-2">
  //        <span className="text-yellow-400 text-xl">⭐</span>
  //        <span className="text-gray-600 ml-2">{product.product_rating} / 5</span>
  //      </div>

  //      {/* Price */}
  //      <p className="text-xl font-bold text-green-600">Rs {product.product_price}</p>

  //      {/* Add to Cart Button */}
  //      <button onClick={()=> handleCart(product)} className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg font-medium text-lg hover:bg-blue-700 transition">
  //        Add to Cart 🛒
  //      </button>
  //    </div>
  //  </div>
  //     ))
  //  ):(
  //    <p>No Reacords Found</p>
  //  )}
  //  </>
  
    <>
   <div className=" mx-auto px-2">
  {products.length > 0 ? (
    <div className="flex flex-wrap justify-center gap-4 mb-5">
            {products.map((product, idx) => (
        <div
          key={idx}
          className="
          bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-all duration-300
          w-[80%]  xs:w-[48%] sm:w-[30%] md:w-[29%] lg:w-[22%] xl:w-[15%] "
      >
          {/* Product Image */}
          <div className="w-full h-42 md:h-66 lg:h-62 overflow-hidden rounded-xl">
            <img
              src={product.product_image}
              alt={product.product_name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="mt-4">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium md:font-semibold lg:font-bold text-gray-800  break-words">
          {product.product_name}</h3>

            {/* Rating */}
            <div className="flex items-center my-2">
              <span className="text-yellow-400 text-xl">⭐</span>
              <span className="text-gray-600 ml-2">{product.product_rating} / 5</span>
            </div>

            {/* Price */}
            <p className="text-xl font-bold text-green-600">Rs {product.product_price}</p>

            {/* Add to Cart Button */}
            <button
              onClick={() => handleCart(product)}
              className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg font-medium text-lg hover:bg-blue-700 transition"
            >
              Add to Cart 🛒
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500 text-2xl py-10">No Records Found</p>
  )}
</div>

   </>
  
  )
}

export default ProductsCard