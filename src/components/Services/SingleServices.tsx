"use client";

import { Services } from "@/types/services";
import { FaPhone, FaChartLine, FaBookOpen } from "react-icons/fa"; // Icons Import
import Link from "next/link";
import Image from "next/image";

const SingleServices = ({ services }: { services: Services }) => {
  const { id, title, paragraph, image } = services;

  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 p-6 text-center border-2 border-yellow-500">
      {/* Service Image */}
      <Link href={`/services/${id}`}>
      <div className="flex bg-[#FFECDD] optional:40 justify-center items-center bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full w-20 h-20 mx-auto shadow-md p-4">
        <Image 
          src={image} 
          alt={`${title} - पंडित दीपक गौतम जी की सेवा`} 
          width={80} 
          height={80} 
          className="w-full h-full object-cover rounded-full" 
        />
      </div>
      
      {/* Title */}
      <h2 className="mt-4 text-xl font-bold text-[#800000] transition duration-300">
        {title} 
      </h2>
      
      
      {/* Description */}
      <p className="text-gray-700 text-sm mt-2">
        {paragraph}  
        <strong> कुंडली मिलान, ग्रह दोष निवारण, शत्रु नाश, सफलता प्राप्ति</strong> जैसी विशेष सेवाएं उपलब्ध हैं।
      </p>
      </Link>
      
      {/* CTA Button with Hover Effect */}
      <div className="mt-6">
        <Link href={`/services/${id}`}>
          <button className="relative overflow-hidden bg-[#800000] text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300">
            {/* Hover Background Effect - Left to Right */}
            <span className="absolute top-0 left-0 w-full h-full bg-[#FF5C16] transform -translate-x-full transition-transform duration-700 ease-out"></span>
            
            {/* Button Text (Always Visible) */}
            <span className="relative z-10 block">📖 सेवा प्राप्त करें</span>
          </button>
        </Link>
      </div>

      <style jsx>{`
        button:hover span {
          transform: translateX(0);
        }
      `}</style>
    </div>
  );
};

export default SingleServices;