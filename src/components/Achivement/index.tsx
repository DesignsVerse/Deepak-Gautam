"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Star } from "lucide-react";

const Achivement = () => {
  const stats = [
    { value: 2000, label: "Kundli Crafted", cosmicSign: "Aries" },
    { value: 15, label: "Years of Celestial Legacy", cosmicSign: "Taurus" },
    { value: 500, label: "Kaal Sarp Remedies", cosmicSign: "Scorpio" },
    { value: 1000, label: "Expert Cosmic Consultations", cosmicSign: "Virgo" },
    { value: 5000, label: "Souls Enlightened", cosmicSign: "Pisces" },
    { value: 5000, label: "Souls Enlightened", cosmicSign: "Pisces" },
  ];

  const ref = useRef(null);
  const controls = useAnimation();
  const [startCounting, setStartCounting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startCounting) {
          setStartCounting(true);
          controls.start({ opacity: 1, y: 0 });
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls, startCounting]);

  return (
    <section
      id="experience"
      className="relative flex justify-center items-center py-16 px-4 bg-gray-100 overflow-hidden"
    >
      <div
        ref={ref}
        className="relative z-10 flex justify-center items-center w-full max-w-[1160px] h-auto min-h-[300px] rounded-2xl px-6 py-8 bg-cover bg-center shadow-lg"
        style={{
          backgroundImage: "url('/images/services/bg-1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-label="Astrology Achievements Section"
      >
        <div className="absolute inset-0 bg-[#800000] opacity-70 rounded-2xl"></div>

        <motion.div
  initial={{ opacity: 0, y: 80 }}
  animate={controls}
  transition={{ duration: 1.2, ease: "easeOut" }}
  className="relative z-20 w-full flex flex-wrap justify-center gap-6 text-center"
>

          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              controls={controls}
              index={index}
              startCounting={startCounting}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const StatCard = ({ stat, controls, index, startCounting }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={controls}
      transition={{ duration: 0.9, delay: index * 0.2, ease: "easeOut" }}
      whileHover={{ scale: 1.05, rotate: 2 }}
      className="relative bg-white text-[#800000] w-32 h-32 sm:w-30 sm:h-30 lg:w-40 lg:h-40 flex flex-col justify-center items-center rounded-full shadow-md  border border-[#800000]/20 overflow-hidden"
    >
      <motion.div className="absolute top-2 right-2">
        <Star size={14} className="text-[#800000]" />
      </motion.div>
      {startCounting && <Counter targetValue={stat.value} />}
      <p className="text-xs sm:text-sm lg:text-base font-semibold mt-2 leading-tight text-[#800000]">
        {stat.label}
      </p>
      <p className="text-xs text-gray-600 mt-1">{stat.cosmicSign}</p>
    </motion.div>
  );
};

const Counter = ({ targetValue }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = targetValue;
    const duration = 1500;
    const increment = end / (duration / 12);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.ceil(start));
      }
    }, 12);

    return () => clearInterval(counter);
  }, [targetValue]);

  return (
    <span className="text-xl sm:text-2xl lg:text-4xl font-bold text-[#800000]">
      {count.toLocaleString()}+
    </span>
  );
};

export default Achivement;
