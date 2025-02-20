"use client";
import Image from "next/image";
import Head from "next/head";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

const images = ["/images/bhaiya/1.webp", "/images/bhaiya/2.webp", "/images/bhaiya/3.webp"];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 Optimize Background Image
  const backgroundImage = useMemo(() => images[currentImage], [currentImage]);

  return (
    <>
      <Head>
        <title>Best Astrology Consultation | Accurate Horoscope & Vastu Insights</title>
        <meta name="description" content="Get expert astrology consultation from Pandit Ji. Discover your destiny with accurate horoscope & Vastu insights for success, peace, and happiness." />
        <meta name="keywords" content="Astrology, Horoscope, Vastu, Pandit Ji, Astrology Consultation, Vedic Astrology" />
        <meta property="og:image" content="/images/bhaiya/33.webp" />
      </Head>

      <section className="relative w-full h-screen md:h-[547px] flex flex-col md:flex-row items-center justify-between px-6 md:px-32 lg:px-48 py-10 overflow-hidden">
        {/* 🔄 Optimized Background Image */}
        <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${backgroundImage})` }} />

        {/* 🏆 White Box for Content */}
        <div className="relative flex flex-col md:flex-row bg-white/90 w-full md:h-[370px] rounded-lg shadow-lg overflow-hidden z-10 p-6 md:p-10">
          {/* 📸 Right Side - Astrologer Image */}
          <div className="relative flex flex-col items-center md:order-2 z-10">
            <motion.div
              className="absolute w-72 h-72 md:w-[380px] md:h-[380px] rounded-full bg-cover bg-center top-1.5"
              style={{ backgroundImage: "url('/bg.webp')" }}
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
            />
            <Image
              src="/images/bhaiya/33.webp"
              alt="Pandit Ji"
              width={320}
              height={320}
              priority
              className="rounded-full relative z-10 shadow-lg"
            />
          </div>

          {/* 📖 Left Side - Text Content */}
          <motion.div
            className="text-center md:text-left flex-1 flex flex-col justify-center items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-lg md:text-4xl font-extrabold text-black">
              Consult the Best Astrologer for Your Horoscope & Vastu Needs
            </h1>
            <p className="mt-3 text-gray-700 hidden md:block">
              Let our expert <b>Pandit Ji</b> guide you with <b>accurate horoscope & Vastu insights</b> for a successful and peaceful life.
            </p>
            <motion.button
              className="px-4 py-3 bg-red-700 text-white rounded-lg shadow-lg hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              Book Your Astrology Session Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
