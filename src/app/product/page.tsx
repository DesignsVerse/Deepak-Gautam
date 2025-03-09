// import Breadcrumb from "@/components/Common/Breadcrumb";
// import StorePage from "@/components/E-Commerce/Store";
// import { Metadata } from "next";

// // Metadata for SEO
// export const metadata: Metadata = {
//   title: "Store - Pandit Deepak Goutam | Kaal Sarp Puja Ujjain",
//   description:
//     "Explore sacred Rudraksha, gemstones, and spiritual items at Pandit Deepak Goutam’s store in Ujjain. Find divine products for peace, prosperity, and Kaal Sarp Dosha Nivaran.",
//   keywords:
//     "ujjain kaal sarp, kaal sarp puja ujjain, deepak goutam pandit, rudraksha, gemstones, spiritual items, kaal sarp dosha nivaran",
//   robots: "index, follow",
//   alternates: {
//     canonical: "https://www.ujjainkalsarp.com/store",
//   },
//   openGraph: {
//     title: "Store - Pandit Deepak Goutam | Kaal Sarp Puja Ujjain",
//     description:
//       "Shop sacred Rudraksha, gemstones, and spiritual products by Pandit Deepak Goutam in Ujjain for peace, prosperity, and Kaal Sarp solutions.",
//     images: [
//       {
//         url: "/images/store-banner.jpg",
//         width: 800,
//         height: 600,
//         alt: "Pandit Deepak Goutam Store - Rudraksha and Gemstones",
//       },
//     ],
//     url: "https://www.ujjainkalsarp.com/store",
//     type: "website",
//   },
// };

// // Structured Data for Store (Schema.org)
// const storeSchema = {
//   "@context": "https://schema.org",
//   "@type": "Store",
//   "name": "Pandit Deepak Goutam Spiritual Store",
//   "description":
//     "Sacred Rudraksha, gemstones, and spiritual items for peace, prosperity, and Kaal Sarp Dosha Nivaran by Pandit Deepak Goutam in Ujjain.",
//   "url": "https://www.ujjainkalsarp.com/store",
//   "address": {
//     "@type": "PostalAddress",
//     "addressLocality": "Ujjain",
//     "addressRegion": "Madhya Pradesh",
//     "addressCountry": "India",
//   },
//   "telephone": "+91-9153164444", // Add actual number if different
// };

// const Store = () => {
//   return (
//     <>
//       {/* Inject Structured Data */}
//       <head>
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
//         />
//       </head>

//       <Breadcrumb
//         pageName="Spiritual Store"
//         description="Explore sacred Rudraksha, gemstones, and spiritual items at Pandit Deepak Goutam’s store in Ujjain. Find divine products for peace, prosperity, and Kaal Sarp Dosha Nivaran."
//       />

//       <StorePage />
//     </>
//   );
// };

// export default Store;