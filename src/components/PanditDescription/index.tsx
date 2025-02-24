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
          className="flex justify-center items-center w-full md:w-1/3 mb-6 md:mb-0"
          variants={childVariants}
        >
          {/* Rotating Background with Gradient */}
          <div className="relative flex justify-center items-center w-full">
            <motion.div
              className="absolute w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full bg-cover bg-center opacity-30"
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
              className="relative z-10 rounded-full shadow-lg w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 object-contain"
              sizes="(max-width: 660px) 192px, (max-width: 768px) 224px, 288px"
            />
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div className="w-full md:w-2/3 px-4 z-10" variants={childVariants}>
          <h1 className="text-2x1 sm:text-3xl md:text-3xl font-extrabold text-white mb-4 sm:mb-6 drop-shadow-xl">
          Pandit Deepak Gautam – Expert in Kaal Sarp Dosh Puja in Ujjain & Vedic Astrology Rituals</h1>
          <p className="text-sm sm:text-base text-justify md:text-lg text-[#F5F5F5] mb-6 sm:mb-8 leading-relaxed font-medium">
          With profound expertise in Vedic astrology, Pandit Deepak Gautam specializes in <strong>Kaal Sarp Dosh Puja in Ujjain</strong> and <strong>Kaal Dosh Nivaran Puja</strong>. His authentic rituals and remedies help individuals overcome obstacles, ensuring relief from <strong>Anant Kaal Sarp Dosh</strong>, <strong>Karkotak Kaal Sarp Dosh</strong>, and other planetary imbalances. With his guidance, people experience peace, prosperity, and spiritual growth, making him a trusted <strong>Kaal Sarp Dosh Puja specialist in Ujjain</strong>
          </p>
        
          <motion.button
            className="relative bg-[#FF5C16] text-white text-sm sm:text-base md:text-lg font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-xl overflow-hidden group"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255, 92, 22, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            aria-label="Book astrology consultation call"
          >
            <span className="absolute inset-0 bg-[#800000] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            <span className="relative z-10 flex items-center gap-2">
            <a href="https://wa.me/919153164444?text=Namaste!!%20Mujhe%20Consult%20krna%20hai" target="_blank" rel="noopener noreferrer" className="relative z-10 flex items-center gap-2">
              <span> Book Consultation</span>
              <span className="group-hover:animate-bounce">✨</span>
            </a>
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </article>
  );
};

export default PanditDescription;
