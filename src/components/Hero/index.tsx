
"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section 
      className="relative w-full h-screen md:h-[547px] flex flex-col md:flex-row items-center justify-between px-6 md:px-32 lg:px-48 py-10 bg-gradient-to-b from-[#fff5ea] to-[#ffaf6d] overflow-hidden"
    >
      {/* Right Side - Image Section (Moves on top in mobile) */}
      <div className="relative flex flex-col items-center w-full md:w-auto md:order-2 mt-10 md:mt-0 md:mr-10 lg:mr-16">
        {/* 🔥 Rotating Background Shape */}
        <motion.div
          className="absolute w-60 h-60 md:w-80 md:h-80 rounded-full bg-cover bg-center shadow-lg top-10 md:top-0"
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
          className="rounded-full relative z-10  mt-16 mb-10 shadow-lg "
        />
      </div>

      {/* Left Side - Text Content */}
      <motion.div 
        className="max-w-lg relative z-10 text-center md:text-left flex-1 mt-6 md:mt-0 md:ml-10 lg:ml-16"
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#7b1e1e] leading-tight">
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
        <p className="mt-3 text-gray-700 text-sm md:hidden">
          Get expert guidance on astrology and Vastu for a better future.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;








































