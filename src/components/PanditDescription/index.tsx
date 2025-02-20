"use client";

import Image from "next/image";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion"; // For advanced animations
import "@/styles/index.css"; // Ensure custom CSS is available

const PanditDescription = () => {
  const controls = useAnimation();

  // Trigger animation on mount
  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <article className="flex justify-center pt-12 pb-0 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#FDF7F4] to-transparent">
      <motion.div
        className="relative p-6 sm:p-8 md:p-12 pt-20 rounded-3xl max-w-6xl mx-auto flex flex-col md:flex-row items-center text-center md:text-left backdrop-blur-xl bg-[#800000]/90 shadow-2xl overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Decorative Background Element */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FF5C16_0%,transparent_70%)] opacity-20 animate-pulse-slow" />

        {/* Image Section */}
        <motion.div
          className="relative flex justify-center items-center w-full md:w-1/3 mb-6 md:mb-0"
          variants={childVariants}
        >
          {/* Rotating Background with Gradient */}
          <div
            className="w-48 sm:w-60 md:w-72 h-48 sm:h-60 md:h-72 rounded-full absolute   bg-[#800000] shadow-xl aborder-4 border-[#FF5C16]/30"
            style={{ filter: "blur(10px)" }}
          />
          {/* Foreground Image */}
          <Image
            src="/images/bhaiya/33.webp"
            alt="Pandit Deepak Gautam – Expert Vedic Astrologer"
            width={200}
            height={250}
            className="rounded-full relative z-10 w-32 sm:w-40 md:w-48 h-auto transition-transform duration-500 hover:scale-110 hover:rotate-3 shadow-lg"
            priority
          />
        </motion.div>

        {/* Content Section */}
        <motion.div className="w-full md:w-2/3 px-4 z-10" variants={childVariants}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 sm:mb-6 drop-shadow-xl ">
            Pandit Deepak Gautam – Vedic Astrology & Ritual Expert
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#F5F5F5] mb-6 sm:mb-8 leading-relaxed font-medium">
            With profound expertise in Vedic astrology, Pandit Deepak Gautam offers transformative rituals and remedies for <strong>Kaal Sarp Dosh</strong> and <strong>Kaal Dosh</strong>. His guidance empowers individuals to conquer challenges, fostering peace, prosperity, and spiritual harmony.
          </p>
          <motion.button
            className="relative bg-[#FF5C16] text-white text-sm sm:text-base md:text-lg font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-xl overflow-hidden group"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255, 92, 22, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            aria-label="Book astrology consultation call"
          >
            <span className="absolute inset-0 bg-[#800000] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            <span className="relative z-10 flex items-center gap-2">
              <span>Book Consultation</span>
              <span className="group-hover:animate-bounce">✨</span>
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </article>
  );
};

export default PanditDescription;