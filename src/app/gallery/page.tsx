"use client";
import Image from "next/image";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useState } from "react";
import { motion } from "framer-motion"; // For animations
import { LazyLoadImage } from "react-lazy-load-image-component"; // Lazy loading images
import "react-lazy-load-image-component/src/effects/blur.css"; // Lazy load effect
import { FaPlay } from "react-icons/fa"; // Importing play icon from react-icons

export default function Gallery() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [filter, setFilter] = useState("all"); // Filter state

  // Sample data for gallery (replace with real data if available)
  const images = Array.from({ length: 10 }, (_, i) => ({
    src: `/images/about/${i + 1}.jpg`,
    alt: `Pandit Deepak Goutam - Kaal Sarp Puja Ujjain Image ${i + 1}`,
    category: i % 2 === 0 ? "rituals" : "ceremony",
  }));

  const videos = Array.from({ length: 5 }, (_, i) => ({
    src: `/images/about/video/${i + 1}.mp4`,
    alt: `Pandit Deepak Goutam Puja Video ${i + 1}`,
  }));

  // Filter gallery items
  const filteredImages =
    filter === "all" ? images : images.filter((img) => img.category === filter);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Prevent scrolling when video popup is open
  const toggleBodyScroll = (disable) => {
    document.body.style.overflow = disable ? "hidden" : "auto";
  };

  // Handle video popup open/close
  const handleVideoOpen = (src) => {
    setSelectedVideo(src);
    toggleBodyScroll(true);
  };

  const handleVideoClose = () => {
    setSelectedVideo(null);
    toggleBodyScroll(false);
  };

  return (
    <>
      <Breadcrumb
        pageName="Puja Gallery"
        description="Explore the Kaal Sarp Dosha Puja Gallery by Pandit Deepak Goutam in Ujjain. Witness sacred rituals and spiritual ceremonies in vivid detail."
      />

      <section
        id="gallery"
        className="pt-16 md:pt-20 lg:pt-24 pb-20 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-6"
          >
            Kaal Sarp Dosha Puja Gallery
          </motion.h1>
          <p className="text-center text-lg text-gray-600 Vividmb-12 max-w-2xl mx-auto">
            Immerse yourself in divine moments from Kaal Sarp Puja ceremonies in
            Ujjain, led by Pandit Deepak Goutam, offering spiritual peace and
            Dosha Nivaran.
          </p>

          {/* Image Gallery */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative rounded-xl shadow-xl overflow-hidden group transform hover:-translate-y-2 transition-all duration-500"
              >
                <LazyLoadImage
                  src={image.src}
                  alt={image.alt}
                  width={500}
                  height={300}
                  effect="blur"
                  className="w-full h-60 md:h-72 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold">
                    Pandit Deepak Goutam Seva
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Video Section */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-6"
          >
            Puja Videos
          </motion.h1>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {videos.map((video, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative rounded-xl shadow-xl overflow-hidden group cursor-pointer transform hover:-translate-y-2 transition-all duration-500"
                onClick={() => handleVideoOpen(video.src)}
              >
                <video
                  src={video.src}
                  className="w-full h-60 md:h-72 object-cover rounded-xl"
                  muted
                  loop
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-50 rounded-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FaPlay className="text-white text-3xl" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <p className="text-white text-lg font-semibold">
                    Pandit Deepak Goutam Puja Video
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Video Popup */}
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 overflow-y-auto"
              onClick={handleVideoClose} // Close on backdrop click
            >
              <div
                className="relative bg-white p-6 rounded-xl max-w-4xl w-full shadow-2xl my-8"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
              >
                <button
                  className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors z-10"
                  onClick={handleVideoClose}
                >
                  Close
                </button>
                <video
                  src={selectedVideo}
                  controls
                  autoPlay
                  className="w-full rounded-lg"
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}