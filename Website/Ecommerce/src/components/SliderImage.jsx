import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Ensure autoplay styles are loaded
import axios from "axios";

const SliderImage = () => {

  const VITE_BACKEND_URL= "https://adminpanel-mvc-backend.onrender.com";

  const [slides, setSlides] = useState([]);
  const swiperRef = useRef();

  const fetchedData = async () => {
    try {
      const response = await axios.get(`${VITE_BACKEND_URL}/slider/get`);
      setSlides(response.data.data);
    } catch (error) {
      console.error("Error During Fetching the data", error);
    }
  };

  useEffect(() => {
    fetchedData();
    if (swiperRef.current) {
      swiperRef.current.swiper.update();
    }
  }, [slides]);

  return (
    <div className="w-full mt-2 md:mt-5">
      <Swiper
        key={slides.length} // forces Swiper to re-render after data is available
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay:2000, disableOnInteraction: false }}
        loop={slides.length > 3}
        className=" shadow-lg  "
        ref={swiperRef}
        
      >
        {slides.length > 0 ? (
          slides.map((slide, index) => (
            <SwiperSlide key={index} >
             <div className="w-full h-[150px] sm:h-[250px] md:h-[250px] lg:h-[270px] xl:h-[300px]">
            <img
              src={slide.image_url}
              alt={`Slide ${index + 1}`}
              className=" h-full object-cover"
            />
          </div>
            </SwiperSlide>
          ))
        ) : (
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          className="flex justify-center items-center text-2xl w-full h-[150px] sm:h-[250px] md:h-[250px] lg:h-[270px] xl:h-[300px]"
        >
          Loading slides...
        </motion.div>        )}
      </Swiper>
    </div>
  );
};

export default SliderImage;
