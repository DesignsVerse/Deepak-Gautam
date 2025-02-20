"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import testimonialsData from "src/data/testimonials.json";

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  // Auto-scroll one box at a time, slowly
  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollWidth = scrollRef.current.scrollWidth;
    const clientWidth = scrollRef.current.clientWidth;
    const maxScroll = scrollWidth - clientWidth;
    const cardWidth = window.innerWidth < 640 ? 280 : 320;

    const scroll = () => {
      if (isPaused) return;
      setScrollPosition((prev) => {
        let newPos = prev + cardWidth;
        if (newPos >= maxScroll) newPos = 0; // Reset for infinite loop
        scrollRef.current!.scrollTo({ left: newPos, behavior: "smooth" });
        return newPos;
      });
    };

    const intervalId = setInterval(scroll, 3000); // Move one box every 3 seconds

    return () => clearInterval(intervalId);
  }, [isPaused]);

  return (
    <section
      className="bg-gradient-to-b from-[#7b1e1e] to-[#4a1010] py-12 text-center relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)} // Pause on hover
      onMouseLeave={() => setIsPaused(false)} // Resume on leave
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white pb-6 px-4">
        खुशहाल ग्राहकों के प्रशंसापत्र
      </h2>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Testimonial Carousel */}
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden no-scrollbar space-x-4 sm:space-x-6 w-full snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {[...testimonialsData, ...testimonialsData].map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${index}`}
              className="min-w-[280px] sm:min-w-[320px] bg-[#7b1e1e] text-white p-2 rounded-xl snap-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white text-[#7b1e1e] h-[250px] sm:h-[280px] p-4 sm:p-6 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF5C16]/20 to-[#800000]/20"></div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 z-10">{testimonial.title}</h3>
                <div className="w-16 h-0.5 bg-[#800000] mx-auto mb-3 sm:mb-4"></div>
                <p className="text-sm sm:text-base mb-3 sm:mb-4 pl-2 pr-2 z-10 line-clamp-4">
                  {testimonial.content}
                </p>
                <p className="font-semibold text-sm sm:text-base z-10">– {testimonial.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;