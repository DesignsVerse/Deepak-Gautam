"use client"; // Next.js Client Component

import Marquee from "react-fast-marquee";
import { FaPhoneAlt } from "react-icons/fa"; // Call Icon Import

const CallNow = () => {
  return (
    <section className="w-full">
      <div className="bg-gradient-to-r from-[#FFECB3] to-[#FFD54F]  shadow-md overflow-hidden border-b-2 border-[#FFA000]">
        <Marquee
          gradient={false}
          speed={80} // Normal Speed
          pauseOnHover={true} // Hover pe smooth stop
          direction="right" // Right Move karega
          className="text-lg md:text-xl font-bold text-black uppercase py-2 tracking-wider"
        >
          {[...Array(10)].map((_, index) => (
            <span key={index} className="flex items-center gap-3 mx-8">
              <FaPhoneAlt className="text-black text-sm md:text-lg" /> {/* Call Icon */}
              <span>BOOK NOW</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default CallNow;
