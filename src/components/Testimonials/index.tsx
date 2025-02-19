"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import testimonialsData from "src/data/testimonials.json";

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (scrollRef.current) {
      scrollRef.current.style.animationPlayState = "paused";
    }
  };

  const handleMouseLeave = () => {
    if (scrollRef.current) {
      scrollRef.current.style.animationPlayState = "running";
    }
  };

  return (
    <section className="bg-[#7b1e1e] py-12 text-gray-800 text-center">
      <h2 className="text-4xl font-bold  text-white pb-12">Happy Client Testimonials</h2>

      <div
        className="overflow-hidden relative max-w-6xl mx-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={scrollRef}
          className="flex space-x-6"
          style={{
            display: "flex",
            width: "max-content",
            animation: "scroll 20s linear infinite",
          }}
        >
          {/* 🔥 Duplicate testimonials for infinite looping effect */}
          {[...testimonialsData, ...testimonialsData].map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${index}`}
              className="w-[300px] bg-[#7b1e1e] text-white p-2 h-[250px] rounded-lg cursor-pointer"
            >
              <div className="bg-white  text-[#7b1e1e] h-full p-2 w-[300px] rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#FF5C16] to-[#800000] opacity-20"></div>
                <h3 className="text-xl font-bold mb-4 z-10">{testimonial.title}</h3>
                <p className="mb-4 text-justify z-10">{testimonial.content}</p>
                <p className="font-bold z-10">– {testimonial.name}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
