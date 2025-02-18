"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import testimonialsData from "src/data/testimonials.json";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleTestimonials = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    }, 4000); // Auto-scroll every 4 sec
    return () => clearInterval(interval);
  }, []);

  const handleDoubleClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const infiniteScrollStyle = {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    animation: "scroll 20s linear infinite", // Infinite loop animation
  };

  return (
    <section className="bg-[#fdf7f4] py-12 text-gray-800 text-center">
      <h2 className="text-4xl font-bold text-[#7b1e1e] mb-12">Happy Client Testimonials</h2>

      <div className="overflow-hidden relative max-w-6xl mx-auto" >
        <motion.div
          className="flex space-x-6"
          style={infiniteScrollStyle}
        >
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${index}`}  
              className="min-w-[290px] max-w-[290px] bg-[#7b1e1e] text-white p-2 h-50 rounded-lg  cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-white p-1 text-[#7b1e1e] h-46 rounded-lg relative overflow-hidden">
                <div className="absolute h-60   inset-0 bg-gradient-to-r from-[#FF5C16] to-[#800000] opacity-20"></div>
                <h3 className="text-xl font-bold mb-4 z-10">{testimonial.title}</h3>
                <p className="mb-4 text-justify z-10">{testimonial.content}</p>
                <p className="font-bold z-10">– {testimonial.name}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
