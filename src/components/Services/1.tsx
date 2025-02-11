"use client";

import serviceData from "@/components/Services/ServicesData";
import SingleService from "@/components/Services/SingleServices";
import Link from "next/link";

const Service = () => {
  return (
    <section className="pb-[120px] p-[20px] w-full">
      <div className="max-w-screen-lx mx-auto">
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
