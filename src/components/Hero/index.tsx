"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

// Predefined image array
const images = [
  "/images/bhaiya/1.webp",
  "/images/bhaiya/2.webp",
  "/images/bhaiya/3.webp",
];

// SEO Metadata
export const metadata = {
  title: "Best Astrology Consultation | Horoscope & Vastu Insights",
  description:
    "Expert astrology consultation by Pandit Ji for accurate horoscope and Vastu solutions to ensure success, peace, and happiness.",
  keywords: "Astrology, Horoscope, Vastu, Pandit Ji, Vedic Astrology",
  author: "Your Website Name",
  openGraph: {
    title: "Best Astrology Consultation | Horoscope & Vastu Insights",
    description: "Expert astrology consultation by Pandit Ji for accurate horoscope and Vastu solutions.",
    image: "/images/bhaiya/33.webp",
    type: "website",
  },
};

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Debounced image transition
  const changeImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(changeImage, 4000);
    return () => clearInterval(interval);
  }, [changeImage]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full h-screen md:h-[547px] flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 py-8 bg-gradient-to-b from-[#FDF7F4] to-transparent overflow-hidden">
      {/* Background Image Slider */}
      <AnimatePresence>
        {images.map((img, index) => (
          <motion.div
            key={img}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentImage === index ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        ))}
      </AnimatePresence>

      {/* White Container */}
      <motion.div
        className="relative mt-20 z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 bg-white/85 backdrop-blur-lg max-w-6xl w-full rounded-2xl shadow-2xl overflow-hidden h-[460px] md:h-[400px] px-8 py-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Image Section */}
        <div className="relative flex justify-center items-center w-full md:w-1/2">
          <motion.div
            className="absolute w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-cover bg-center opacity-40"
            style={{ backgroundImage: "url('/bg.webp')" }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          />
          <Image
            src="/images/bhaiya/33.webp"
            alt="Pandit Ji - Expert in Astrology and Vastu"
            width={320}
            height={320}
            priority
            className="relative z-10 rounded-full shadow-lg w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 288px"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-black leading-tight">
            Solve Kaal Sarp & Mangal Dosh with Pandit Ji
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-xs sm:max-w-sm md:max-w-md">
            Get expert horoscope & Vastu guidance to overcome challenges and achieve peace and prosperity.
          </p>
          <motion.button
            className="mt-3 md:mt-4 px-4 sm:px-6 py-2 bg-gradient-to-r from-[#b91c1c] to-[#7f1d1d] text-white font-semibold rounded-lg shadow-md text-sm"
            whileHover={{ scale: 1.05, boxShadow: "0 6px 15px rgba(127, 29, 29, 0.3)" }}
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
