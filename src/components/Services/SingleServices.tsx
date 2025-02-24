"use client";

import { Services } from "@/types/services";
import { FaPhone, FaChartLine, FaBookOpen, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const SingleServices = ({ services }: { services: Services }) => {
  const { id, title, paragraph, image } = services;

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.03, y: -10, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.3, yoyo: Infinity } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 p-6 text-center border-2 border-yellow-500"
    >
      {/* Service Image with Animated Ring */}
      <Link href={`/services/${id}`}>
        <div className="relative flex justify-center items-center mx-auto w-24 h-24">
          <motion.div
            className="absolute w-24 h-24 rounded-full bg-gradient-to-ropacity-75"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <Image
            src={image}
            alt={`${title} - पंडित दीपक गौतम जी की सेवा`}
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded-full z-10 bg-[#FFECDD] p-1 shadow-md"
          />
        </div>

        {/* Title with Subtle Glow */}
        <h2 className="mt-6 text-xl font-bold text-[#800000] relative">
          {title}
          <motion.span
            className="absolute -top-2 -right-2 text-yellow-500"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaStar size={12} />
          </motion.span>
        </h2>

        {/* Description with Fade Effect */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-gray-700 text-sm mt-3 leading-relaxed"
        >
          {paragraph}
          <strong className="block mt-1 text-[#800000]">
            Kundli milan, grah dosh nivaran, shatru naash, aur safalta prapti.
          </strong>
          Such special services are available.
        </motion.p>
      </Link>

      {/* CTA Buttons Container */}
      <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-3">
        {/* Service Button */}
        <Link href={`/services/${id}`}>
          <motion.button
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            className="relative overflow-hidden bg-[#800000] text-white font-semibold px-6 py-3 sm:px-4 sm:py-2 rounded-xl shadow-md group w-full sm:w-auto"
          >
            <motion.span
              className="absolute inset-0 bg-[#FF5C16] transform -translate-x-full group-hover:translate-x-0"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <FaBookOpen />
              Know more
            </span>
          </motion.button>
        </Link>

        {/* Call Now Button */}
        <a href="tel:+919153164444"> {/* Replace with your actual phone number */}
          <motion.button
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            className="relative overflow-hidden bg-[#800000] text-white font-semibold px-6 py-3 sm:px-4 sm:py-2 rounded-xl shadow-md group w-full sm:w-auto"
          >
            <motion.span
              className="absolute inset-0 bg-[#FF5C16] transform -translate-x-full group-hover:translate-x-0"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <FaPhone />
              Call Now
            </span>
          </motion.button>
        </a>
      </div>

      {/* Cosmic Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-yellow-500 rounded-full opacity-20"
            style={{
              width: Math.random() * 3 + 2,
              height: Math.random() * 3 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50],
              opacity: [0.2, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SingleServices;