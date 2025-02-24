"use client";

import serviceData from "@/data/services.json";
import SingleService from "@/components/Services/SingleServices";
import SectionTitle from "@/components/Common/SectionTitle";
import Link from "next/link";

const Service = () => {
  return (
    <section className="pb-16 pt-16 p-4 w-full bg-[#FDF7F4]">
      <div className="max-w-screen-lx mx-auto">
        {/* SEO-Optimized Section Title */}
        <SectionTitle
          title="🔱 Our Services | Astrology Solutions | Deepak Gautam Ji"
          paragraph="🌟Expert in Kundli Milan, Tantra Sadhana, Grah Dosh Nivaran, and Business Growth Remedies. Experience Kaal Sarp Dosh Puja in Ujjain for success. "
          center
        />

        {/* <p className="text-center text-gray-700 max-w-2xl mx-auto mb-8 text-sm md:text-base">
        Our astrology services include <strong>Kundli Milan, Vastu Consultation, Grah Dosh Nivaran, Tantra-Mantra Anushthan, Shatru Nash, Kaal Sarp Dosh Puja in Ujjain, Mangal Dosh Nivaran, and Success Remedies</strong>. Choose from the services below to find a solution to your problems.
        </p> */}

        {/* Services Grid */}
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {serviceData.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="text-center md:bg-white  md:rounded-2xl md:transform md:transition-transform md:hover:scale-105 md:bg-gradient-to-r md:from-[#FFF7F0] md:to-[#FFEAD8] md:hover:from-[#FFDEC0] md:hover:to-[#FFCFA5] md:p-6 md:shadow-md md:hover:shadow-lg"
            >
              <Link href={`/services/${service.id}`}>
                <SingleService services={service} />
              </Link>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-6">
          <Link href="/services">
            <button className="relative hover:bg-[#FF5C16] overflow-hidden bg-[#800000] text-white font-semibold px-4 py-2 md:px-6 md:py-3 rounded-full shadow-md transition-all duration-300">
              <span className="relative z-10 inset-0">
                🔍 Explore more services.
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Service;