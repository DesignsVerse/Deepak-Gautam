"use client"
import { Services } from "@/types/services";
import { FaPhone, FaChartLine, FaBookOpen } from "react-icons/fa"; // Icons Import
import Link from "next/link";
import Image from "next/image";

const SingleServices = ({ services }: { services: Services }) => {
  const { id, title, paragraph } = services;

  // Default Image (Same Image for All Services)
  const defaultImage = "/images/m/9.png"; // Replace with actual image path

  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 p-6 text-center border-2 border-yellow-500">
      {/* Service Image */}
      <div className="flex bg-[#f0703a] optional:40 justify-center items-center bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full w-20 h-20 mx-auto shadow-md p-4">
        <Image 
          src={defaultImage} 
          alt={title} 
          width={80} 
          height={80} 
          className="w-full h-full object-cover rounded-full" 
        />
      </div>
      
      {/* Title */}
      <h3 className="mt-4 text-xl font-bold text-[#800000] transition duration-300">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-700 text-sm mt-2">{paragraph}</p>
      
      {/* CTA Button with Hover Effect */}
      <div className="mt-6">
        <Link href={`/services/${id}`}>
          <button className="relative overflow-hidden bg-[#800000] text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300">
            {/* Hover Background Effect - Left to Right */}
            <span className="absolute top-0 left-0 w-full h-full bg-[#F0703A] transform -translate-x-full transition-transform duration-500 ease-out"></span>
            
            {/* Button Text (Always Visible) */}
            <span className="relative z-10 block">📖 Order Now</span>
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
