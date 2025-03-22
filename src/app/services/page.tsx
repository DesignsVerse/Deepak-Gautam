// app/services/page.tsx
import ServiceSection from "@/components/Services/Services";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import Script from "next/script"; // Import Script for structured data

// Optimized Metadata for SEO in English
export const metadata: Metadata = {
  title: "Our Services - Pandit Deepak Goutam | Kaal Sarp Puja Ujjain",
  description:
    "Get expert services from Pandit Deepak Goutam in Ujjain for Kaal Sarp Puja, astrology, mantra sadhana, and religious rituals. Contact for enemy destruction, success, and spiritual peace.",
  keywords:
    "ujjain kaal sarp, kaal sarp puja ujjain, pandit deepak goutam, astrology services, mantra sadhana, religious rituals, kaal sarp dosha nivaran, enemy destruction",
  robots: "index, follow",
  authors: [{ name: "Pandit Deepak Goutam" }],
  alternates: {
    canonical: "https://www.ujjainkalsarp.com/services",
  },
  openGraph: {
    title: "Our Services - Pandit Deepak Goutam | Kaal Sarp Puja Ujjain",
    description:
      "Expert Kaal Sarp Puja, astrology, and mantra sadhana services in Ujjain by Pandit Deepak Goutam. Contact for enemy destruction, success, and peace.",
    images: [
      {
        url: "/images/services-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Pandit Deepak Goutam - Kaal Sarp Puja and Astrology Services",
      },
    ],
    url: "https://www.ujjainkalsarp.com/services",
    type: "website",
  },
};

const ServicePage = () => {
  // Structured Data for LocalBusiness (fixes SEMrush audit issue)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Pandit Deepak Goutam - Ujjain Kaal Sarp",
    description:
      "Expert Kaal Sarp Puja, astrology, mantra sadhana, and religious rituals by Pandit Deepak Goutam in Ujjain. Solutions for Kaal Sarp Dosha Nivaran and enemy destruction.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Near Mahakal Temple, Example Street", // Replace with real address
      addressLocality: "Ujjain",
      addressRegion: "Madhya Pradesh",
      postalCode: "456001", // Replace with real postal code
      addressCountry: "IN",
    },
    telephone: "+91-987-654-3210", // Replace with real phone number
    url: "https://www.ujjainkalsarp.com/services",
    image: "https://www.ujjainkalsarp.com/images/services-banner.jpg",
    openingHours: "Mo-Su 08:00-18:00", // Optional
  };

  return (
    <>
      {/* Add Structured Data using next/script */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <Breadcrumb
        pageName="Our Services - Pandit Deepak Goutam"
        description="Expert Kaal Sarp Puja, astrology, and religious rituals in Ujjain by Pandit Deepak Goutam. Contact for solutions to enemy destruction and success."
      />
      <ServiceSection />
    </>
  );
};

export default ServicePage;