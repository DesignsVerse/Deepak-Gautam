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
      className="bg-[#fafaf8] py-16 md:py-20 lg:py-24"
    >
      <div className="container px-4 md:px-8">
        {/* Title */}
        <SectionTitle
          title="हमारी सेवाएँ"
          paragraph="हमारी सेवाओं का लाभ उठाएँ, जो आपकी ज़रूरतों को ध्यान में रखते हुए विशेष रूप से तैयार की गई हैं।"
          center
        />

        {/* Cards Section - Gap reduced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {visibleServices.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-2xl shadow-lg border border-gray-200 text-center transform transition-all hover:scale-105 hover:shadow-xl bg-gradient-to-r from-[#FFF7F0] to-[#FFEAD8] hover:from-[#FFDEC0] hover:to-[#FFCFA5]"
            >
              <SingleServices services={service} />
            </div>
          ))}
        </div>

        {/* View More Button - Centered & Improved */}
        <div className="flex justify-center mt-6">
          <Link href="/services">
            <button className="bg-gradient-to-r from-[#D96625] to-[#FF5733] text-white px-8 py-3 rounded-lg shadow-md font-semibold hover:scale-105 hover:shadow-lg transition duration-300">
              🚀 और देखें
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
