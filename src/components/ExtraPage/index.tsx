"use client";

import Image from "next/image";
import "@/styles/index.css"; // Ensure you have this file for custom animations

const BaglamukhiSection = () => {
  return (
    <section className="flex items-center justify-center min-h-screen p-8 bg-[#FDF7F4]">
      <div className="p-12 rounded-lg shadow-2xl max-w-6xl mx-auto flex flex-col md:flex-row items-center backdrop-blur-lg bg-transparent">
        {/* Content Section */}
        <div className="md:w-2/3 md:pr-12">
          <h1 className="text-4xl md:text-5xl font-bold text-red-800 mb-6">
            Book Consultation Call From The Best Astrologer In India!
          </h1>
          <p className="text-lg text-gray-900 mb-8">
            We believe astrology is pure science, and we aim to create such a social impact of the organization on you
            that science and astrology through its resources of the astrology chart, kundali, etc. As we dive into our
            50th year, we strive to build a community where we are a part of your daily routine right from our astrology
            by date of birth, name, time, palm reading, and face reading, to all other online astrology, numerology,
            palmistry services.
          </p>
          <button className="bg-orange-500 text-white text-lg font-bold py-3 px-8 rounded-full hover:bg-orange-600 transition-all">
            Book Now
          </button>
        </div>

        {/* Image Section */}
        <div className="relative flex justify-center items-center">
          {/* Rotating Background Image */}
          <div
            className="w-80 h-80 rounded-full absolute bg-cover bg-center rotate-animation"
            style={{ backgroundImage: "url('/bg.png')" }}
          ></div>
          {/* Static Foreground Image */}
          <Image
            src="/p.png"
            alt="Astrologer consultation call advertisement"
            width={250}
            height={300}
            className="rounded-full relative z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default BaglamukhiSection;
