"use client";

import Image from "next/image";
import "@/styles/index.css"; // Ensure you have this file for custom animations

const BaglamukhiSection = () => {
  return (
    <article className="flex justify-center pt-12 pb-0 p-4 sm:p-6 md:p-8">
      {/* Wrapper Div with Background Color */}
      <div className="p-6 sm:p-8 md:p-12 pt-20 rounded-lg max-w-6xl mx-auto flex flex-col md:flex-row items-center text-center md:text-left backdrop-blur-lg bg-[#800000]">
        
        {/* Image Section */}
        <div className="relative flex justify-center items-center w-full md:w-1/3 mb-6 md:mb-0">
          {/* Rotating Background Image */}
          <div
            className="w-48 sm:w-60 md:w-72 h-48 sm:h-60 md:h-72 rounded-full absolute bg-cover bg-center rotate-animation shadow-xl animate-spin-slow"
            style={{ backgroundImage: "url('/bg.png')" }}
          ></div>
          {/* Static Foreground Image */}
          <Image
            src="/p.png"
            alt="Astrology Consultation with India's Best Astrologer for Kundali & Palmistry"
            width={200}
            height={250}
            className="rounded-full relative z-10 w-32 sm:w-40 md:w-48 h-auto hover:scale-110 transition-all duration-300"
            priority
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/3 px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
            Consult India's Best Astrologer for Kundali & Palmistry
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#F5F5F5] mb-6 sm:mb-8 leading-relaxed">
            Our astrology services, including *kundali reading, palmistry, numerology,* and *face reading*, help you 
            uncover life’s answers. With over 50 years of experience, we provide *accurate astrology consultation* 
            based on date of birth, name, and planetary positions.
          </p>
          <button
            className="bg-[#FF5C16] text-white text-sm sm:text-base md:text-lg font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-xl hover:bg-[#800000] hover:shadow-2xl transition-all duration-300"
            aria-label="Book astrology consultation call"
          >
            Book Consultation Now
          </button>
        </div>
      </div>
    </article>
  );
};

export default BaglamukhiSection;
