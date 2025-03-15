"use client";

import Image from "next/image";
import Link from "next/link"; // Link import kiya for WhatsApp and Call functionality
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

export const metadata = { /* unchanged */ };

const Hero = () => {
  const buttonVariants = {
    initial: {
      scale: 1,
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    },
    hover: {
      scale: 1.08,
      boxShadow: "0px 8px 20px rgba(255, 92, 22, 0.5), 0px 0px 15px rgba(128, 0, 0, 0.3)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.2 },
    },
    pulse: {
      scale: [1, 1.02, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <section className="relative w-full pb-[25px] mt-[72px] pt-8 md:mt-[75px] md:h-[560px] flex items-center justify-center md:px-12 bg-[#fff2eb] md:bg-[#fff2eb] overflow-hidden">
      {/* White Container */}
      <motion.div
        className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10  bg-[#fff2eb] md:bg-white backdrop-blur-lg max-w-6xl w-full md:rounded-2xl md:shadow-2xl overflow-hidden md:h-[400px] sm:px-8 md:px-12 py-8 sm:py-10 md:py-12"
      >
        {/* Image Section */}
        <div className="relative flex justify-center items-center w-full md:w-1/2">
          <motion.div
            className="absolute w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-cover bg-center opacity-70 md:block"
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
            className="relative z-20 rounded-full shadow-lg w-56 h-56 sm:w-60 sm:h-60 md:w-72 md:h-72 object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 640px) 224px, (max-width: 768px) 240px, 288px"
            quality={75}
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4 md:space-y-6">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-extrabold text-black leading-tight">
            Kaal Sarp & Mangal Dosh Nivaran with Ujjain Best Pandit Ji
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-xs sm:max-w-sm md:max-w-md">
            Expert Horoscope & Vastu Guidance to Remove Doshas and Attain Peace & Prosperity
          </p>
          <div className="flex gap-10">
            {/* Book Now Button with WhatsApp Link */}
            <Link href="https://wa.me/919153164444?text=Namaste!!%20Mujhe%20Consult%20krna%20hai" target="_blank" rel="noopener noreferrer">
              <motion.button
                className="mt-2 md:mt-4 px-5 sm:px-6 py-3 bg-gradient-to-r from-[#800000] to-[#FF5C16] text-white font-semibold rounded-lg shadow-md text-sm md:text-base relative overflow-hidden"
                variants={buttonVariants}
                initial="initial"
                animate="pulse"
                whileHover="hover"
                whileTap="tap"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%", transition: { duration: 0.5, ease: "easeInOut" } }}
                />
                <span className="relative z-10">Book Now</span>
              </motion.button>
            </Link>

            {/* Call Now Button with Phone Link */}
            <Link href="tel:+919153164444" rel="noopener noreferrer">
              <motion.button
                className="mt-2 md:mt-4 px-5 sm:px-6 py-3 bg-gradient-to-r from-[#FF5C16] to-[#800000] text-white font-semibold rounded-lg shadow-md text-sm md:text-base relative overflow-hidden"
                variants={buttonVariants}
                initial="initial"
                animate="pulse"
                whileHover="hover"
                whileTap="tap"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%", transition: { duration: 0.5, ease: "easeInOut" } }}
                />
                <span className="relative z-10">Call Now</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;










// "use client";

// import Image from "next/image";
// import Link from "next/link"; // Link import kiya for WhatsApp and Call functionality
// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect, useCallback } from "react";

// const images = [
//   "/images/bhaiya/1.webp",
//   "/images/bhaiya/2.webp",
//   "/images/bhaiya/3.webp",
// ];

// export const metadata = { /* unchanged */ };

// const Hero = () => {
//   const [currentImage, setCurrentImage] = useState(0);

//   const changeImage = useCallback(() => {
//     setCurrentImage((prev) => (prev + 1) % images.length);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(changeImage, 4000);
//     return () => clearInterval(interval);
//   }, [changeImage]);

//   const containerVariants = {
//     hidden: { opacity: 0, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   };

//   const buttonVariants = {
//     initial: {
//       scale: 1,
//       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//     },
//     hover: {
//       scale: 1.08,
//       boxShadow: "0px 8px 20px rgba(255, 92, 22, 0.5), 0px 0px 15px rgba(128, 0, 0, 0.3)",
//       transition: { duration: 0.3, ease: "easeInOut" },
//     },
//     tap: {
//       scale: 0.95,
//       transition: { duration: 0.2 },
//     },
//     pulse: {
//       scale: [1, 1.02, 1],
//       transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
//     },
//   };

//   return (
//     <section className="relative w-full mt-[55px] md:h-[547px] flex items-center justify-center md:px-12  bg  bg-[#FDF7F4]  overflow-hidden">
//       {/* Preload Critical Images */}
//       {/* <link rel="preload" href="/images/bhaiya/1.webp" as="image" />
//       <link rel="preload" href="/bg.webp" as="image" /> */}

//       {/* Background Image Slider */}
//       {/* <AnimatePresence>
//         {images.map((img, index) => (
//           <motion.div
//             key={img}
//             className="absolute inset-0 w-full h-full bg-cover bg-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: currentImage === index ? 1 : 0 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1.2, ease: "easeInOut" }}
//           >
//             <Image
//               src={img}
//               alt={`Background ${index + 1}`}
//               fill
//               className="object-cover"
//               priority={index === 0}
//               loading={index === 0 ? "eager" : "lazy"}
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
//               quality={75}
//             />
//           </motion.div>
//         ))}
//       </AnimatePresence> */}

//       {/* White Container */}
//       <div className="absolute inset-0 bg-[#800000] opacity-20" />
//       <motion.div
//         className="relative  flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 bg-white backdrop-blur-lg max-w-6xl w-full rounded-2xl shadow-2xl overflow-hidden md:h-[400px]  sm:px-8 md:px-12 py-8 sm:py-10 md:py-12"
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//       >
//         {/* Image Section */}
//         <div className="relative flex justify-center items-center w-full md:w-1/2">
//           <motion.div
//             className="absolute w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-cover bg-center opacity-70 md:block"
//             style={{ backgroundImage: "url('/bg.webp')" }}
//             initial={{ rotate: 0 }}
//             animate={{ rotate: 360 }}
//             transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
//           />
//           <Image
//             src="/images/bhaiya/33.webp"
//             alt="Pandit Ji - Expert in Astrology and Vastu"
//             width={320}
//             height={320}
//             priority
//             className="relative z-20 rounded-full shadow-lg w-56 h-56 sm:w-60 sm:h-60 md:w-72 md:h-72 object-cover transition-transform duration-300 hover:scale-105"
//             sizes="(max-width: 640px) 224px, (max-width: 768px) 240px, 288px"
//             quality={75}
//           />
//         </div>

//         {/* Text Section */}
//         <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4 md:space-y-6">
//           <h1 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-extrabold text-black leading-tight">
//             Kaal Sarp & Mangal Dosh Nivaran with Ujjain Best Pandit Ji
//           </h1>
//           <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-xs sm:max-w-sm md:max-w-md">
//             Expert Horoscope & Vastu Guidance to Remove Doshas and Attain Peace & Prosperity
//           </p>
//           <div className="flex gap-10">
//             {/* Book Now Button with WhatsApp Link */}
//             <Link href="https://wa.me/919153164444?text=Namaste!!%20Mujhe%20Consult%20krna%20hai" target="_blank" rel="noopener noreferrer">
//               <motion.button
//                 className="mt-2 md:mt-4 px-5 sm:px-6 py-3 bg-gradient-to-r from-[#800000] to-[#FF5C16] text-white font-semibold rounded-lg shadow-md text-sm md:text-base relative overflow-hidden"
//                 variants={buttonVariants}
//                 initial="initial"
//                 animate="pulse"
//                 whileHover="hover"
//                 whileTap="tap"
//               >
//                 <motion.span
//                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
//                   initial={{ x: "-100%" }}
//                   whileHover={{ x: "100%", transition: { duration: 0.5, ease: "easeInOut" } }}
//                 />
//                 <span className="relative z-10">Book Now</span>
//               </motion.button>
//             </Link>

//             {/* Call Now Button with Phone Link */}
//             <Link href="tel:+919153164444" rel="noopener noreferrer">
//               <motion.button
//                 className="mt-2 md:mt-4 px-5 sm:px-6 py-3 bg-gradient-to-r from-[#FF5C16] to-[#800000] text-white font-semibold rounded-lg shadow-md text-sm md:text-base relative overflow-hidden"
//                 variants={buttonVariants}
//                 initial="initial"
//                 animate="pulse"
//                 whileHover="hover"
//                 whileTap="tap"
//               >
//                 <motion.span
//                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
//                   initial={{ x: "-100%" }}
//                   whileHover={{ x: "100%", transition: { duration: 0.5, ease: "easeInOut" } }}
//                 />
//                 <span className="relative z-10">Call Now</span>
//               </motion.button>
//             </Link>
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default Hero;