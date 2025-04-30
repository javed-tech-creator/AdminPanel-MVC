import { Star } from "lucide-react";
import React from "react";

const ProductsCard = ({ products, handleCart, loader }) => {
  return (
   

    <>
      <div id="product" className=" mx-auto px-2">
        {!loader && (
           <div className="flex justify-center items-center p-5 h-[300px]">
           <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-4 border-dashed rounded-full animate-spin border-black"></div>
           </div>
        )}

        {products && (
          <div className="flex flex-wrap justify-center gap-4 mb-5">
            {products.map((product, idx) => (
              <div
                key={idx}
                className="
          bg-white  rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300
          w-[30%]  xs:w-[48%] sm:w-[30%] md:w-[29%] md:mt-1  lg:w-[22%] xl:w-[15%] "
              >
                {/* Product Image */}
                <div className="w-full h-22 md:h-66 lg:h-62 overflow-hidden rounded-xl md:p-2">
                  <img
                    src={product.product_image}
                    alt={product.product_name}
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="mt-1">
                  <h3 className="text-base ps-1  sm:text-lg md:text-xl lg:text-2xl font-normal  md:font-semibold lg:font-bold text-gray-800 md:p-2  break-words overflow-hidden text-ellipsis whitespace-nowrap">
                    {product.product_name}
                  </h3>

                  <p className="text-[#535767] px-1 text-base mb-0 mt-0 block overflow-hidden text-ellipsis whitespace-nowrap md:px-2">
                    {product.product_description}
                  </p>

                  {/* Price */}
                  {/* <p className="text-base font-normal ps-1 text-green-600  md:text-xl md:font-bold md:p-2">
                    Rs {product.product_price}
                  </p> */}

                  <div className="mt-1 text-sm leading-[15px] text-[#282c3f] flex flex-wrap items-center">
                    <span className="ps-1 text-green-600  md:text-xl md:font-bold md:p-2 ">
                      ₹ {product.product_price}
                    </span>
                    <span className="line-through text-[#7e818c] font-normal text-xs ml-2">
                      ₹ {product.total_price}
                    </span>
                    <span className="text-[#26b72d] font-normal text-xs ml-1">
                      (
                      {Math.round(
                        ((product.total_price - product.product_price) /
                          product.total_price) *
                          100
                      )}
                      % OFF)
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center ps-1 mt-2 md:ps-2 gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`${
                          idx < product.product_rating
                            ? "text-yellow-500"
                            : "text-black"
                        } w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4`}
                      />
                    ))}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleCart(product)}
                    className="w-full mt-2 p-1 text-[12px] bg-blue-600 text-white rounded-lg  hover:bg-blue-700 transition md:py-2 md:text-xl md:font-bold hover:cursor-pointer md:mt-5"
                  >
                    Add to Cart 
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {loader && products.length === 0 && (
          <p className="text-center text-gray-500 text-2xl py-10">
            No Records Found
          </p>
        )}
      </div>
    </>
  );
};

export default ProductsCard;
