"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

// Predefined image array for slider
const images = [
  "/images/bhaiya/1.webp",
  "/images/bhaiya/2.webp",
  "/images/bhaiya/3.webp",
];

export const metadata = { /* unchanged */ };

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const changeImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(changeImage, 4000);
    return () => clearInterval(interval);
  }, [changeImage]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full h-[100vh] md:h-[547px] flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 py-8 bg-gradient-to-b from-[#FDF7F4] to-transparent overflow-hidden">
      {/* Preload Critical Images */}
      <link rel="preload" href="/images/bhaiya/1.webp" as="image" />
      <link rel="preload" href="/bg.webp" as="image" />

      {/* Background Image Slider */}
      <AnimatePresence>
        {images.map((img, index) => (
          <motion.div
            key={img}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentImage === index ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Image
              src={img}
              alt={`Background ${index + 1}`}
              fill
              className="object-cover "
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              quality={75}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* White Container */}
      <div className="absolute inset-0 bg-red-500 opacity-20" />
      <motion.div
        className="relative mt-10 z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 bg-white/85 backdrop-blur-lg max-w-6xl w-full rounded-2xl shadow-2xl overflow-hidden md:h-[400px] px-6 sm:px-8 md:px-12 py-8 sm:py-10 md:py-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Image Section */}
        <div className="relative flex justify-center items-center w-full md:w-1/2">
          <motion.div
            className="absolute w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 rounded-full bg-cover bg-center opacity-70 md:block"
            style={{ backgroundImage: "url('/bg.webp')" }}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          />
           
          <Image
            src="/images/bhaiya/33.webp"
            alt="Pandit Ji - Expert in Astrology and Vastu"
            width={320}
            height={320}
            priority
            className="relative z-20 rounded-full shadow-lg w-44 h-44 sm:w-52 sm:h-52 md:w-64 md:h-64 object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, 256px"
            quality={75}
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4 md:space-y-6">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-black leading-tight">
            Solve Kaal Sarp & Mangal Dosh with Pandit Ji
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-xs sm:max-w-sm md:max-w-md">
            Expert horoscope & Vastu guidance to overcome challenges and achieve peace.
          </p>
          <motion.button
            className="mt-2 md:mt-4 px-5 sm:px-6 py-3 bg-gradient-to-r from-[#b91c1c] to-[#7f1d1d] text-white font-semibold rounded-lg shadow-md text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Book Now
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;