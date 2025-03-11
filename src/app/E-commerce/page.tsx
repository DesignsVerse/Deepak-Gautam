import Breadcrumb from "@/components/Common/Breadcrumb";
import StorePage from "@/components/E-Commerce/Store";
import { Metadata } from "next";

// Metadata for SEO


// Structured Data for Store (Schema.org)
const storeSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "Pandit Deepak Goutam Spiritual Store",
  "description":
    "Sacred Rudraksha, gemstones, and spiritual items for peace, prosperity, and Kaal Sarp Dosha Nivaran by Pandit Deepak Goutam in Ujjain.",
  "url": "https://www.ujjainkalsarp.com/store",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ujjain",
    "addressRegion": "Madhya Pradesh",
    "addressCountry": "India",
  },
  "telephone": "+91-9153164444", // Add actual number if different
};

const Store = () => {
  return (
    <>
      {/* Inject Structured Data */}
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
        />
      </head>

      <Breadcrumb
        pageName="Spiritual Store"
        description="Rudraksha Store "
      />

      <StorePage />
    </>
  );
};

export default Store;