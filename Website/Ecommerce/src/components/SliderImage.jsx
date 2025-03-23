import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
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
                className="w-full h-[200px] md:h-[300px] lg:h-[400px] object-fit "
              />
            </SwiperSlide>
          ))
        ) : (
          <p className=" text-gray-500 text-4xl h-76 flex justify-center items-center ">Loading slides...</p>
        )}
      </Swiper>
    </div>
  );
};

export default SliderImage;
