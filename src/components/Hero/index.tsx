"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const images = [
  "/images/bhaiya/1.jpg",
  "/images/bhaiya/2.jpg",
  "/images/bhaiya/3.jpg",
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative w-full h-screen md:h-[547px] flex flex-col md:flex-row items-center justify-between px-6 md:px-32 lg:px-48 py-10 overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${img})`, 
              opacity: currentImage === index ? 1 : 0,
            }}
          >
            {/* Red Overlay */}
            <div className="absolute inset-0 bg-[#800000] opacity-20" />
          </motion.div>
        ))}
      </div>

      {/* White Box Around the Content */}
      <div className="relative flex flex-col mt-12 md:mt-20 md:flex-row gap-4 md:gap-20 bg-[rgba(255,255,255,0.8)] w-full h-full md:h-[370px] rounded-lg shadow-lg overflow-hidden z-10">
        
        {/* Right Side - Image Section */}
        <div className="relative flex flex-col items-center w-full md:w-auto md:order-2 mt-10 md:mt-0 md:mr-10 lg:mr-16 z-10">
          {/* 🔥 Rotating Background Shape */}
          <motion.div
            className="absolute w-72 h-72 md:w-[380px] md:h-[380px] rounded-full bg-cover bg-center top-1.5 "
            style={{ backgroundImage: "url('/bg.png')" }}
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          />

          {/* 📸 Foreground Image (Pandit Ji) */}
          <Image
            src="/images/bhaiya/33.png"
            alt="Astrologer consultation"
            width={260} 
            height={260} 
            className="rounded-full relative z-10 md:mt-4 mb- shadow-lg md:w-[355px] md:h-[355px] w-[280px] h-[280px] mx-auto"
          />
        </div>

        {/* Left Side - Text Content */}
        <motion.div 
          className="max-w-lg relative z-20 text-center md:text-left flex-1  md:mt-0 md:ml-10 lg:ml-16 flex flex-col justify-center items-center md:items-start"
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl md:text-4xl font-extrabold text-black leading-tight">
            Discover Your Destiny with Astrology
          </h1>
          <p className="mt-3 text-gray-700 text-lg leading-relaxed md:block hidden">
            Let our expert <b>Pandit Ji</b> guide you with <b>accurate horoscope & Vastu insights</b> for success, peace, and happiness.
          </p>
          
          {/* 🚀 CTA Button */}
          <motion.button 
            className="mt-5 px-6 py-3 bg-gradient-to-r from-[#b91c1c] to-[#7f1d1d] text-white text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
          >
            Consult Pandit Ji Now  
          </motion.button>

          {/* Small Paragraph (Visible in mobile only) */}
          <p className="text-gray-700 text-sm md:hidden mt-4">
            Get expert guidance on astrology and Vastu for a better future.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
