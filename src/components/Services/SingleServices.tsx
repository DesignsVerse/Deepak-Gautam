"use client";

import { Services } from "@/types/services";
import { FaPhone, FaBookOpen, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Define the SingleServices component
const SingleServices = ({ services }: { services: Services }) => {
  const { id, title, paragraph, image } = services;

  // Simplified animation variants for card (using Framer Motion only for essential animations)
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.03, y: -10, transition: { duration: 0.3 } },
  };

  // Handle call button click
  const handleCallClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = "tel:+919153164444";
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="relative overflow-hidden rounded-xl bg-white shadow-lg p-6 text-center border-2 border-yellow-500"
    >
      {/* Service Image, Title, and Description wrapped in Link */}
      <Link href={`/services/${id}`} className="block">
        <div className="relative flex justify-center items-center mx-auto w-24 h-24">
          {/* Removed rotating gradient (use CSS background if needed) */}
          <Image
            src={image}
            alt={`${title} - पंडित दीपक गौतम जी की सेवा`}
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded-full bg-[#FFECDD] p-1 shadow-md"
          />
        </div>

        <h2 className="mt-6 text-xl font-bold text-[#800000] relative">
          {title}
          {/* Removed animated star (use static star for simplicity) */}
        </h2>

        {/* Removed motion.p, use static paragraph */}
        <p className="text-gray-700 text-sm mt-3 leading-relaxed">
          {paragraph}
          <strong className="block mt-1 text-[#800000]">
            Kundli milan, grah dosh nivaran, shatru naash, aur safalta prapti.
          </strong>
          Such special services are available.
        </p>
      </Link>

      {/* CTA Buttons Container */}
      <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-3">
        {/* Service Button (using CSS for hover effects) */}
        <Link href={`/services/${id}`} className="block w-full sm:w-auto">
          <button className="relative overflow-hidden bg-[#800000] text-white font-semibold px-6 py-3 sm:px-4 sm:py-2 rounded-xl shadow-md hover:bg-[#FF5C16] hover:scale-105 transition-all duration-300 w-full sm:w-auto">
            <span className="flex items-center justify-center gap-2">
              <FaBookOpen />
              Know more
            </span>
          </button>
        </Link>

        {/* Call Now Button (using CSS for hover effects) */}
        <button
          onClick={handleCallClick}
          className="relative overflow-hidden bg-[#800000] text-white font-semibold px-6 py-3 sm:px-4 sm:py-2 rounded-xl shadow-md hover:bg-[#FF5C16] hover:scale-105 transition-all duration-300 w-full sm:w-auto"
        >
          <span className="flex items-center justify-center gap-2">
            <FaPhone />
            Call Now
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default SingleServices;