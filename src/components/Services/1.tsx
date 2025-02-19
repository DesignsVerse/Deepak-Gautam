"use client";

import serviceData from "@/components/Services/ServicesData";
import SingleService from "@/components/Services/SingleServices";
import Link from "next/link";

const Service = () => {
  return (
    <section className="pb-[120px] p-[20px] w-full">
      <div className="max-w-screen-lx mx-auto">
        {/* सेवाओं की सूची - पंडित दीपक गौतम जी */}
        <h1 className="text-3xl font-bold text-center mb-8 text-[#8B5E3C]">
          पंडित दीपक गौतम जी की विशेष सेवाएं
        </h1>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10">
          हमारी ज्योतिषीय सेवाओं में <strong>कुंडली मिलान, वास्तु परामर्श, 
          ग्रह दोष निवारण, तंत्र-मंत्र अनुष्ठान, शत्रु नाश और सफलता प्राप्ति</strong> जैसी प्रमुख सेवाएँ शामिल हैं। 
          अपनी समस्या का समाधान जानने के लिए नीचे दी गई सेवाओं में से चयन करें।
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-0">
          {serviceData.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl text-center transform transition-transform hover:scale-105 bg-gradient-to-r from-[#FFF7F0] to-[#FFEAD8] hover:from-[#FFDEC0] hover:to-[#FFCFA5] p-6 shadow-md hover:shadow-lg"
            >
              <Link href={`/service/${service.id}`}>
                <SingleService services={service} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
