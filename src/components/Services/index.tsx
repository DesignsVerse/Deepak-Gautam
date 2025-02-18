import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import SingleServices from "./SingleServices";
import servicesData from "./ServicesData";
import Link from "next/link";

const Services = () => {
  // Show only first 6 services
  const visibleServices = servicesData.slice(0, 6);

  return (
    <section
      id="services"
      className="relative   pt-10 pb-20 "
      style={{ 
        backgroundColor: "#FDF7F4", 
        backgroundSize: "cover",  // Ensure full coverage
        backgroundPosition: "center" // Adjust as needed: "top", "bottom", "left center", etc.
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-0"></div>

      <div className="container px-4 md:px-8 relative z-10">
        {/* Title with updated color */}
        <SectionTitle
          title="हमारी सेवाएँ"
          paragraph="हमारी सेवाओं का लाभ उठाएँ, जो आपकी ज़रूरतों को ध्यान में रखते हुए विशेष रूप से तैयार की गई हैं।"
          center
        />

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {visibleServices.map((service, index) => (
            <div key={index}>
              <SingleServices services={service} />
            </div>
          ))}
        </div>

        {/* View More Button with custom hover effect */}
        <div className="flex justify-center mt-6">
          <Link href="/services">
            <button className="relative overflow-hidden bg-[#800000] text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300">
              <span className="relative z-10 inset-0  transition-transform transform scale-x-0 origin-left hover:scale-x-100 duration-300">View More</span>
              {/* Hover Effect - Left to Right */}
              <span className=""></span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
