"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import testimonialsData from "src/data/testimonials.json";

const Testimonials = () => {
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      setScrollWidth(scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
    }
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      let newPos = scrollPosition + (direction === "left" ? -310 : 310);
      if (newPos < 0) {
        newPos = scrollWidth;
      } else if (newPos > scrollWidth) {
        newPos = 0;
      }
      setScrollPosition(newPos);
      scrollRef.current.scrollTo({ left: newPos, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleScroll("right");
    }, 3000);

    return () => clearInterval(interval);
  }, [scrollPosition]);

  return (
    <section className="bg-[#7b1e1e] py-12 text-gray-800 text-center relative">
      <h2 className="text-4xl font-bold text-white pb-4">खुशहाल ग्राहकों के प्रशंसापत्र </h2>

      <div className="overflow-hidden relative max-w-6xl mx-auto flex items-center">
        
        {/* Left Button */}
        <button 
          className="absolute left-0 z-10 bg-white p-3 rounded-full shadow-md hover:scale-110 transition flex items-center justify-center"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          onClick={() => handleScroll("left")}
        >
          <ChevronLeft className="text-[#7b1e1e] w-6 h-6" />
        </button>

        <div 
          ref={scrollRef} 
          className="flex overflow-x-scroll no-scrollbar space-x-6 px-10 w-[1200px]" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {[...testimonialsData, ...testimonialsData].map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${index}`}
              className="w-[300px] bg-[#7b1e1e] text-white p-2 h-[250px] rounded-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white text-[#7b1e1e] h-full p-2 w-[300px] rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#FF5C16] to-[#800000] opacity-20"></div>
                <h3 className="text-xl font-bold mb-4 z-10">{testimonial.title}</h3>
                <div className="w-full h-0.5 bg-black mx-auto mb-3"></div>
                <p className="mb-4 pl-2 pr-2 z-10">{testimonial.content}</p>
                <p className="font-bold z-10">– {testimonial.name}</p>
              </div>
            </motion.div>
          ))}  
        </div>
        
        {/* Right Button */}
        <button 
          className="absolute right-0 z-10 bg-white p-3 rounded-full shadow-md hover:scale-110 transition flex items-center justify-center"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          onClick={() => handleScroll("right")}
        >
          <ChevronRight className="text-[#7b1e1e] w-6 h-6" />
        </button>
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
