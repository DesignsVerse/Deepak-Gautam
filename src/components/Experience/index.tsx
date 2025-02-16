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
    { value: 20, label: "Awards in the field of Occult" },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [startCounting, setStartCounting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startCounting) {
          setStartCounting(true); // 🔥 अब counting तभी start होगी जब section दिखेगा!
          controls.start({ opacity: 1, y: 0 });
        }
      },
      { threshold: 0.5 } // 📌 Section का 50% part दिखने के बाद animation trigger होगा
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls, startCounting]);

  return (
    <div ref={ref} className="bg-[#800000] rounded-xl p-10 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={controls}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-[1400px] w-full flex flex-wrap justify-center gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={controls}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            className="bg-white text-[#800000] w-48 h-48 flex flex-col justify-center items-center rounded-full shadow-lg text-center p-4"
          >
            {startCounting && <Counter targetValue={stat.value} />} {/* 🔥 अब counting तभी दिखेगी जब section दिखे */}
            <p className="text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const Counter = ({ targetValue }: { targetValue: number }) => {
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

  return <span className="text-3xl font-bold">{count}+</span>;
};

export default Experience;
