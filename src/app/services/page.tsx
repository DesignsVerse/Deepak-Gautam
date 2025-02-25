import ServiceSection from "@/components/Services/Services";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "हमारी सेवाएं | पंडित दीपक गौतम - ज्योतिष और धार्मिक विशेषज्ञ",
  description:
    "पंडित दीपक गौतम से ज्योतिष, मंत्र-साधना, पूजा-पाठ, और धार्मिक अनुष्ठानों की विशेषज्ञ सेवाएं प्राप्त करें। शत्रु नाश, सफलता, और आध्यात्मिक शांति के लिए संपर्क करें।",
  keywords:
    "पंडित दीपक गौतम, ज्योतिष सेवाएं, मंत्र-साधना, पूजा-पाठ, शत्रु नाश, धार्मिक अनुष्ठान, आध्यात्मिक समाधान, सफलता प्राप्ति",
  robots: "index, follow", // ✅ Ensure indexing
  authors: [{ name: "Pandit Deepak Gautam" }], // ✅ Author attribution
  alternates: {
    canonical: "https://www.deepakgautam.com/services", // ✅ Canonical URL
  },
  openGraph: {
    title: "हमारी सेवाएं | पंडित दीपक गौतम",
    description:
      "पंडित दीपक गौतम से ज्योतिष, पूजा-पाठ, और मंत्र-साधना की सेवाएं। शत्रु नाश और सफलता के लिए संपर्क करें।",
    images: [
      {
        url: "/images/services-banner.jpg", // ✅ Services-specific banner
        width: 1200,
        height: 630,
        alt: "पंडित दीपक गौतम - हमारी सेवाएं",
      },
    ],
    url: "https://www.deepakgautam.com/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "हमारी सेवाएं | पंडित दीपक गौतम",
    description:
      "ज्योतिष, मंत्र-साधना, और पूजा-पाठ की सेवाएं पंडित दीपक गौतम से। संपर्क करें।",
    
  },
};

const ServicePage = () => {
  // Structured Data for Services Page (Schema.org)
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Pandit Deepak Gautam - हमारी सेवाएं",
    description:
      "पंडित दीपक गौतम द्वारा प्रदान की जाने वाली ज्योतिष, मंत्र-साधना, और पूजा-पाठ सेवाएं।",
    url: "https://www.deepakgautam.com/services",
    // Optional: Add specific services from ServiceSection if dynamic data available
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
        pageName="Our Services - Pandit Deepak Gautam"
        description="Contact Pandit Deepak Gautam for astrology, mantra practice, and religious rituals—solutions for enemy destruction and success."
      />
      <ServiceSection />
    </>
  );
};

export default ServicePage;