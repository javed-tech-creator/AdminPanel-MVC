import React from 'react'

const ProgressBar = ({submit}) => {
  return (
    <div className="w-[80%] mx-auto mt-2">
    <div className="flex items-center justify-between mb-10 relative  ">
  {/* Progress line behind steps */}
  <div className="absolute top-4 left-0 right-0 h-1 bg-gray-300 z-0"></div>
  {/* Active progress line up to current step */}
  <div className={`absolute top-4 left-0 ${submit ? "w-1/1":"w-1/2"} h-1 bg-green-500 z-10`}></div>

  {/* Step 1 - Cart */}
  <div className="relative z-20 flex flex-col items-center w-1/3">
    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white text-sm font-bold">
      1
    </div>
    <div className="mt-2 text-sm font-medium">Cart</div>
  </div>

  {/* Step 2 - Address */}
  <div className="relative z-20 flex flex-col items-center w-1/3">
    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
      2
    </div>
    <div className="mt-2 text-sm font-medium">Address</div>
  </div>

  {/* Step 3 - Payment */}
  <div className="relative z-20 flex flex-col items-center w-1/3">
    <div className={`w-8 h-8 flex items-center justify-center rounded-full ${submit ? "bg-purple-600":"bg-gray-300"} text-white text-sm font-bold`}>
      3
    </div>
    <div className="mt-2 text-sm font-medium">Payment</div>
  </div>
</div>
</div>
  )
}

export default ProgressBar