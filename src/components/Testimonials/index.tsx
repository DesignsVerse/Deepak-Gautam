"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import testimonialsData from "src/data/testimonials.json";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleTestimonials = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (testimonialsData.length - visibleTestimonials + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#fdf7f4] py-12 text-gray-800 text-center">
      <h2 className="text-4xl font-bold text-[#7b1e1e] mb-12">Happy Client Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto">
        {testimonialsData.slice(currentIndex, currentIndex + visibleTestimonials).map((testimonial) => (
          <motion.div
            key={testimonial.id}
            className="bg-[#7b1e1e] text-white p-6 rounded-lg relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white text-[#7b1e1e] p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">{testimonial.title}</h3>
              <p className="mb-4">{testimonial.content}</p>
              <p className="font-bold">– {testimonial.name}</p>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-[#7b1e1e] w-6 h-6 rotate-45"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;