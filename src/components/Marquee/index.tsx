"use client"; // Next.js Client Component

import Head from "next/head";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const astrologySymbols = [
  { name: "Kalash - Divine Symbol", image: "/images/Marquee/1.png" },
  { name: "Namaste Hands - Sign of Respect", image: "/images/Marquee/2.png" },
  { name: "Puja Thali - Sacred Offering", image: "/images/Marquee/3.png" },
  { name: "Deepak - Eternal Light", image: "/images/Marquee/5.png" },
  { name: "Ganesha Ji - Remover of Obstacles", image: "/images/Marquee/6.png" },
  { name: "Om Symbol - Sacred Mantra", image: "/images/Marquee/7.png" },
  { name: "Kalash - Divine Symbol", image: "/images/Marquee/4.png" },
  { name: "Lal Kitab - Book of Secret", image: "/images/Marquee/8.png" },
  { name: "Lotus - Purity & Enlightenment", image: "/images/Marquee/9.png" },
  { name: "Mala - Rosary for Meditation", image: "/images/Marquee/10.png" },
];

const AutoScroll = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const cardVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.1, y: -10, transition: { duration: 0.3 } },
  };

  return (
    <>
      {/* ✅ Enhanced SEO Meta Tags */}
      <Head>
        <title>Powerful Hindu Astrology Symbols & Their Meanings</title>
        <meta
          name="description"
          content="Explore sacred Hindu astrology symbols like Om, Swastik, Kalash, Rudraksha, and Yantra. Understand their spiritual significance and connect with divine energy."
        />
        <meta
          name="keywords"
          content="Hindu Astrology Symbols, Spiritual Symbols, Om, Swastik, Kalash, Rudraksha, Yantra, Trishul, Vedic Astrology, Spirituality"
        />
        <meta name="author" content="Astro Arun Pandit" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Powerful Hindu Astrology Symbols & Their Meanings" />
        <meta
          property="og:description"
          content="Discover the sacred meanings behind Hindu astrology symbols like Om, Swastik, Rudraksha, and more."
        />
        <meta property="og:image" content="/images/m/1.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/symbols" /> {/* Replace with actual URL */}
      </Head>

      <section className="w-full   overflow-hidden">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          
          <Marquee
            gradient={false}
            speed={60}
            pauseOnHover={true}
            direction="left"
            className="py-4"
          >
            {astrologySymbols.map((symbol, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="initial"
                animate={hoveredIndex === index ? "hover" : "initial"}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="mx-8 flex flex-col items-center gap-3 cursor-pointer"
              >
                <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] flex items-center justify-center overflow-hidden rounded-full bg-gray-100 shadow-md">
                  <Image
                    src={symbol.image}
                    alt={symbol.name}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <span className="text-sm md:text-base font-medium text-gray-800 text-center">
                  {symbol.name}
                </span>
              </motion.div>
            ))}
          </Marquee>
        </div>
      </section>
    </>
  );
};

export default AutoScroll;