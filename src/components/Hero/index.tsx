"use client";
import Image from "next/image";
import Head from "next/head";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const images = [
  "/images/bhaiya/1.webp",
  "/images/bhaiya/2.webp",
  "/images/bhaiya/3.webp",
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
        <meta property="og:image" content="/images/bhaiya/33.webp" />
        <meta property="og:type" content="website" />
        {/* 🔥 Preload background image */}
        <link rel="preload" href="/bg.webp" as="image" />
      </Head>

      <section className="relative w-full h-screen md:h-[500px] flex flex-col md:flex-row items-center justify-between px-6 md:px-20 lg:px-32 py-8 overflow-hidden">
        {/* 🔄 Optimized Background Image Slider */}
        <div className="absolute inset-0 w-full h-full">
          {images.map((img, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
              style={{
                backgroundImage: `url(${img})`,
                opacity: currentImage === index ? 1 : 0,
              }}
            />
          ))}
        </div>

        {/* 🏆 White Box for Content */}
        <div className="relative flex flex-col md:flex-row gap-4 bg-white bg-opacity-90 w-full h-auto md:h-[300px] rounded-lg shadow-lg p-6 md:p-8 z-10">
          {/* 📸 Right Side - Astrologer Image */}
          <div className="relative flex flex-col items-center w-full md:w-auto md:order-2">
            {/* 🔥 Rotating Background Shape (LCP Optimized) */}
            <motion.div
              className="absolute top-2 w-40 h-40 md:w-56 md:h-56 rounded-full bg-cover bg-center"
              style={{ backgroundImage: "url('/bg.webp')" }}
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
            />

            {/* 📸 Foreground Image (Optimized for LCP) */}
            <Image
              src="/images/bhaiya/33.webp"
              alt="Pandit Ji providing astrology consultation for horoscope and Vastu guidance"
              width={250}
              height={250}
              priority // ✅ Ensures fast LCP
              className="rounded-full relative z-10 shadow-lg w-[180px] h-[180px] md:w-[250px] md:h-[250px]"
            />
          </div>

          {/* 📖 Left Side - Text Content */}
          <motion.div
            className="flex-1 text-center md:text-left flex flex-col justify-center items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} // ✅ Faster fade-in animation
          >
            <h1 className="text-md md:text-3xl font-bold text-black leading-snug">
              Consult the Best Astrologer for Your Horoscope & Vastu Needs
            </h1>
            <p className="mt-2 text-gray-700 text-base md:text-lg hidden md:block">
              Let our expert <b>Pandit Ji</b> guide you with <b>accurate horoscope & Vastu insights</b> for a successful and peaceful life.
            </p>

            {/* 🚀 CTA Button */}
            <motion.button
              className="mt-4 px-4 py-2 bg-gradient-to-r from-[#b91c1c] to-[#7f1d1d] text-white text-sm md:text-base font-semibold rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              Book Your Astrology Session Now
            </motion.button>

            {/* 📌 Small Paragraph for Mobile */}
            <p className="text-gray-700 text-xs mt-2 md:hidden">
              Get expert guidance on astrology and Vastu for a better future.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
