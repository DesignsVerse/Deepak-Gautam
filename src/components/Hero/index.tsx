"use client";
import Image from "next/image";
import Head from "next/head";
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
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Head>
        <title>Best Astrology Consultation | Accurate Horoscope & Vastu Insights</title>
        <meta
          name="description"
          content="Get expert astrology consultation from Pandit Ji. Discover your destiny with accurate horoscope & Vastu insights for success, peace, and happiness."
        />
        <meta
          name="keywords"
          content="Astrology, Horoscope, Vastu, Pandit Ji, Astrology Consultation, Vedic Astrology"
        />
        <meta name="author" content="Your Website Name" />
        <meta property="og:title" content="Best Astrology Consultation | Accurate Horoscope & Vastu Insights" />
        <meta
          property="og:description"
          content="Get expert astrology consultation from Pandit Ji. Discover your destiny with accurate horoscope & Vastu insights."
        />
        <meta property="og:image" content="/images/bhaiya/33.png" />
        <meta property="og:type" content="website" />
      </Head>

      <section className="relative w-full h-screen md:h-[547px] flex flex-col md:flex-row items-center justify-between px-6 md:px-32 lg:px-48 py-10 overflow-hidden">
        {/* 🔄 Background Image Slider */}
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
              <div className="absolute inset-0 bg-[#800000] opacity-20" />
            </motion.div>
          ))}
        </div>

        {/* 🏆 White Box for Content */}
        <div className="relative flex flex-col mt-12 md:mt-20 md:flex-row gap-1 md:gap-20 bg-[rgba(255,255,255,0.8)] w-full h-full md:h-[370px] rounded-lg shadow-lg overflow-hidden z-10">
          
          {/* 📸 Right Side - Astrologer Image */}
          <div className="relative flex flex-col items-center w-full md:w-auto md:order-2 mt-10 md:mt-0 md:mr-10 lg:mr-16 z-10">
            {/* 🔥 Rotating Background Shape */}
            <motion.div
              className="absolute w-72 h-72 md:w-[380px] md:h-[380px] rounded-full bg-cover bg-center top-1.5"
              style={{ backgroundImage: "url('/bg.png')" }}
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            />

            {/* 📸 Foreground Image */}
            <Image
              src="/images/bhaiya/33.png"
              alt="Pandit Ji providing astrology consultation for horoscope and Vastu guidance"
              width={260}
              height={260}
              className="rounded-full relative z-10 md:mt-4 shadow-lg md:w-[355px] md:h-[355px] w-[280px] h-[280px] mx-auto"
            />
          </div>

          {/* 📖 Left Side - Text Content */}
          <motion.div
            className="max-w-lg relative z-20 text-center md:text-left flex-1 md:mt-0 md:ml-10 lg:ml-16 flex flex-col justify-center items-center md:items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-lg p-1 md:text-4xl font-extrabold text-black leading-tight">
              Consult the Best Astrologer for Your Horoscope & Vastu Needs
            </h1>
            <p className="mt-3 text-gray-700 text-lg leading-relaxed md:block hidden">
              Let our expert <b>Pandit Ji</b> guide you with <b>accurate horoscope & Vastu insights</b> for a successful and peaceful life.
            </p>

            {/* 🚀 CTA Button */}
            <motion.button
              className="px-3 py-3 bg-gradient-to-r from-[#b91c1c] to-[#7f1d1d] text-white text-s font-semibold rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              Book Your Astrology Session Now
            </motion.button>

            {/* 📌 Small Paragraph for Mobile */}
            <p className="text-gray-700 text-sm md:hidden  p-2">
              Get expert guidance on astrology and Vastu for a better future.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
