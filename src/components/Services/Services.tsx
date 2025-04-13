"use client";

import { useMemo } from "react";
import serviceData from "@/data/services.json";
import SingleService from "@/components/Services/SingleServices";
import Link from "next/link";

const sectionStyles = {
  padding: "20px",
  paddingBottom: "120px",
  width: "100%",
};

const headingStyles = {
  fontSize: "1.875rem",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "2rem",
  color: "#8B5E3C",
};

const ServiceSection = () => {
  // Split services into featured (first 2) and regular services
  const [featuredServices, regularServices] = useMemo(() => {
    return [serviceData.slice(0, 2), serviceData.slice(2)];
  }, []);

  // Memoize featured service cards (larger boxes)
  const featuredCards = useMemo(
    () =>
      featuredServices.map((service) => (
        <div
          key={service.id}
          className="rounded-2xl text-center transform transition-all duration-300 hover:scale-105 bg-gradient-to-r from-[#FFF7F0] to-[#FFEAD8] hover:from-[#FFDEC0] hover:to-[#FFCFA5] p-8 shadow-md hover:shadow-lg"
        >
          <Link href={`/services/${service.id}`} prefetch={false}>
            <SingleService services={service} />
          </Link>
        </div>
      )),
    [featuredServices]
  );

  // Memoize regular service cards
  const regularCards = useMemo(
    () =>
      regularServices.map((service) => (
        <div
          key={service.id}
          className="rounded-2xl text-center transform transition-all duration-300 hover:scale-105 bg-gradient-to-r from-[#FFF7F0] to-[#FFEAD8] hover:from-[#FFDEC0] hover:to-[#FFCFA5] p-6 shadow-md hover:shadow-lg"
        >
          <Link href={`/services/${service.id}`} prefetch={false}>
            <SingleService services={service} />
          </Link>
        </div>
      )),
    [regularServices]
  );

  return (
    <section style={sectionStyles} className="w-full">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10 text-base leading-relaxed">
          &quot;In our astrological services{' '}
          <strong className="font-semibold">
            Kundli milan, Vastu consultation, grah dosh nivaran, tantra-mantra anushthan, shatru naash, aur safalta prapti.
          </strong>{' '}
          These are the main services included. Select from the options below to find a solution to your problem.&quot;
        </p>

        {/* Featured Services - 2 larger boxes */}
        <div
          role="grid"
          aria-label="Featured Service Listings"
          className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10"
        >
          {featuredCards}
        </div>

        {/* Regular Services - 3 cards per row */}
        <div
          role="grid"
          aria-label="Regular Service Listings"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-0"
        >
          {regularCards}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;