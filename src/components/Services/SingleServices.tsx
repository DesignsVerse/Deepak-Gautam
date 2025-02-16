import { Services } from "@/types/services";
import { FaStar, FaPhone, FaBookOpen, FaChartLine } from "react-icons/fa"; // Icons Import
import Link from "next/link";

const SingleServices = ({ services }: { services: Services }) => {
  const { id, title, paragraph } = services;

  // Icon Mapping (हर service के लिए अलग icon use करने का तरीका)
  const iconMap: { [key: string]: JSX.Element } = {
    astrology: <FaStar className="text-[#800000] text-4xl" />,
    consultation: <FaPhone className="text-[#800000] text-4xl" />,
    numerology: <FaChartLine className="text-[#800000] text-4xl" />,
    kitab: <FaBookOpen className="text-[#800000] text-4xl" />,
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 p-6 text-center border-2 border-yellow-500">
      {/* Service Icon */}
      <div className="flex justify-center items-center bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full w-20 h-20 mx-auto shadow-md p-4">
        {iconMap[id] || <FaStar className="text-[#800000] text-4xl" />} {/* Default Icon */}
      </div>
      
      {/* Title */}
      <h3 className="mt-4 text-xl font-bold text-[#800000] hover:text-[#FFD700] transition duration-300">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-700 text-sm mt-2">{paragraph}</p>
      
      {/* CTA Button */}
      <div className="mt-6">
        <Link href={`/services/${id}`}>
          <button className="bg-[#FF9933] text-white font-semibold px-5 py-2 rounded-full shadow-md hover:bg-[#FFD700] hover:text-[#800000] hover:scale-105 transition duration-300">
            Order Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SingleServices;
