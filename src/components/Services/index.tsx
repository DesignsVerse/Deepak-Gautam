"use client";

import serviceData from "@/data/services.json";
import SingleService from "@/components/Services/SingleServices";
import SectionTitle from "@/components/Common/SectionTitle";
import Link from "next/link";

const Service = () => {
  return (
    <section className="pb-[120px] p-[20px] w-full bg-[#FDF7F4]">
      <div className="max-w-screen-lx mx-auto">
        {/* SEO-Optimized Section Title */}
        <SectionTitle
          title="🔱 हमारी सेवाएँ | ज्योतिष समाधान | दीपक गौतम जी"
          paragraph="🌟 ग्रह दोष निवारण, विवाह मिलान, तंत्र साधना, व्यापार वृद्धि और सफलता प्राप्त करने के लिए हमारी विशेष सेवाएँ उपलब्ध हैं।"
          center
        />

        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10">
          हमारी ज्योतिषीय सेवाओं में <strong>कुंडली मिलान, वास्तु परामर्श, 
          ग्रह दोष निवारण, तंत्र-मंत्र अनुष्ठान, शत्रु नाश और सफलता प्राप्ति</strong> जैसी प्रमुख सेवाएँ शामिल हैं।
          अपनी समस्या का समाधान जानने के लिए नीचे दी गई सेवाओं में से चयन करें।
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-0">
          {serviceData.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="rounded-2xl text-center transform transition-transform hover:scale-105 bg-gradient-to-r from-[#FFF7F0] to-[#FFEAD8] hover:from-[#FFDEC0] hover:to-[#FFCFA5] p-6 shadow-md hover:shadow-lg"
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
            <button className="relative hover:bg-[#FF5C16] overflow-hidden bg-[#800000] text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300">
              <span className="relative z-10 inset-0 transition-transform transform scale-x-0 origin-left hover:scale-x-100 duration-300">
                🔍 और सेवाएँ देखें
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Service;
