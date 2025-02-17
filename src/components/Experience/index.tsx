"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const Experience = () => {
  const stats = [
    { value: 200000, label: "Kundli Served" },
    { value: 50, label: "Year's Of Legacy" },
    { value: 50000, label: "Students Enrolled" },
    { value: 100000, label: "Consultations Given" },
    { value: 5, label: "Languages For Reports" },
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
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls, startCounting]);

  return (
    <div className="flex justify-center items-center py-10 px-4">
      <div
        ref={ref}
        className="relative flex justify-center rounded-2xl overflow-hidden items-center w-full max-w-[1160px] h-auto min-h-[280px] sm:min-h-[300px] px-4 lg:min-h-[400px]"
        style={{
          backgroundImage: "url('/images/services/bg-1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#800000] opacity-70"></div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={controls}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 max-w-[1100px] w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center text-center"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={controls}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="bg-white text-[#800000] w-28 h-28 sm:w-40 sm:h-40 lg:w-60 lg:h-60 flex flex-col justify-center items-center rounded-full shadow-lg p-2 sm:p-4"
            >
              {startCounting && <Counter targetValue={stat.value} />}
              <p className="text-xs sm:text-sm lg:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
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
        setCount(Math.floor(start));
      }
    }, 12);

    return () => clearInterval(counter);
  }, [targetValue]);

  return <span className="text-xl sm:text-2xl lg:text-4xl font-bold">{count}+</span>;
};

export default Experience;
