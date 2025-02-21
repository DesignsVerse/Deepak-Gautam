"use client";

import { Services } from "@/types/services";
import { FaBookOpen, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const ServiceCard = ({ service }: { service: Services }) => {
  const { id, title, paragraph, image } = service;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.03, y: -10, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 p-6 text-center border-2 border-yellow-500"
    >
      <Link href={`/services/${id}`}>
        <div className="relative flex justify-center items-center mx-auto w-24 h-24">
          <motion.div
            className="absolute w-24 h-24 rounded-full bg-gradient-to-r opacity-75"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <Image
            src={image}
            alt={`${title} Service`}
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded-full z-10 bg-[#FFECDD] p-1 shadow-md"
          />
        </div>

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

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-gray-700 text-sm mt-3 leading-relaxed"
        >
          {paragraph}
        </motion.p>
      </Link>
    </motion.div>
  );
};

const DualServiceCards = ({ services } ) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {services.slice(0, 2).map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default DualServiceCards;
