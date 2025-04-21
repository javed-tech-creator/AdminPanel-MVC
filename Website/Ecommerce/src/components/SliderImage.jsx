import React, { useEffect, useState } from "react";
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
  }, []);

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay:1000, disableOnInteraction: false }}
        loop={true}
        className=" shadow-lg "
      >
        {slides.length > 0 ? (
          slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <img
                src={slide.image_url}
                alt={`Slide ${index + 1}`}
                className="w-full h-[130px] md:h-[250px] lg:h-[350px] object-fit "
              />
            </SwiperSlide>
          ))
        ) : (
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          className="flex justify-center items-center h-[300px] text-gray-500 text-xl"
        >
          Loading slides...
        </motion.div>        )}
      </Swiper>
    </div>
  );
};

export default SliderImage;
