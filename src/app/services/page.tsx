import ServiceSection from "@/components/Services/Services";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

// Optimized Metadata for SEO in English
export const metadata: Metadata = {
  title: "Our Services - Pandit Deepak Goutam | Kaal Sarp Puja Ujjain",
  description:
    "Get expert services from Pandit Deepak Goutam in Ujjain for Kaal Sarp Puja, astrology, mantra sadhana, and religious rituals. Contact for enemy destruction, success, and spiritual peace.",
  keywords:
    "ujjain kaal sarp, kaal sarp puja ujjain, pandit deepak goutam, astrology services, mantra sadhana, religious rituals, kaal sarp dosha nivaran, enemy destruction",
  robots: "index, follow", // ✅ Kept as is
  authors: [{ name: "Pandit Deepak Goutam" }], // ✅ Kept as is
  alternates: {
    canonical: "https://www.ujjainkalsarp.com/services", // ✅ Unchanged
  },
  openGraph: {
    title: "Our Services - Pandit Deepak Goutam | Kaal Sarp Puja Ujjain",
    description:
      "Expert Kaal Sarp Puja, astrology, and mantra sadhana services in Ujjain by Pandit Deepak Goutam. Contact for enemy destruction, success, and peace.",
    images: [
      {
        url: "/images/services-banner.jpg", // ✅ Kept as is
        width: 1200,
        height: 630,
        alt: "Pandit Deepak Goutam - Kaal Sarp Puja and Astrology Services",
      },
    ],
    url: "https://www.ujjainkalsarp.com/services", // ✅ Unchanged
    type: "website",
  },
};

const ServicePage = () => {
  // Structured Data for Services Page (Schema.org)
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Astrology and Religious Rituals",
    "provider": {
      "@type": "Person",
      "name": "Pandit Deepak Goutam",
      "url": "https://www.ujjainkalsarp.com/services",
    },
    "name": "Our Services - Pandit Deepak Goutam",
    "description":
      "Expert Kaal Sarp Puja, astrology, mantra sadhana, and religious rituals by Pandit Deepak Goutam in Ujjain. Solutions for Kaal Sarp Dosha Nivaran and enemy destruction.",
    "areaServed": {
      "@type": "City",
      "name": "Ujjain",
    },
  };

  return (
    <>
      {/* Add Schema Markup */}
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        />
      </head>
      <Breadcrumb
        pageName="Our Services - Pandit Deepak Goutam"
        description="Expert Kaal Sarp Puja, astrology, and religious rituals in Ujjain by Pandit Deepak Goutam. Contact for solutions to enemy destruction and success."
      />
      <ServiceSection />
    </>
  );
};

export default ServicePage;