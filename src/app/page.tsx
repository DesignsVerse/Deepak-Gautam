import Blog from "@/components/Blog";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { Metadata } from "next";
import Services from "@/components/Services";
import Faq from "@/components/FAQ";
import PanditDescription from "@/components/PanditDescription";
import Achivement from "@/components/Achivement";
import AutoScroll from "@/components/Marquee";
import Banner from "@/components/Banner";
import PyramidCircles from "@/components/Thali";
import Popup from "@/components/Popup/Popup";
import ProductList from "@/components/Product";

// Optimized Metadata for SEO
export const metadata: Metadata = {
  title: "Kaal Sarp Dosh Puja Ujjain | Astro Deepak Goutam | Ujjain",
  description:
    "Authentic Kaal Sarp Dosh Puja in Ujjain by Pandit Deepak Goutam. Expert Vedic rituals at Mahakaleshwar Temple for Kaal Sarp Dosha Nivaran and spiritual peace.",
  keywords:
    "ujjain kaal sarp, kaal sarp puja ujjain, pandit deepak goutam, kaal sarp dosh nivaran, mahakaleshwar temple, vedic rituals, spiritual peace",
  robots: "index, follow",
  authors: [{ name: "Pandit Deepak Goutam" }],
  alternates: {
    canonical: "https://www.ujjainkalsarp.com/", // Unchanged
  },
  openGraph: {
    title: "Pandit Deepak Goutam - Kaal Sarp Dosh Puja Expert in Ujjain",
    description:
      "Book authentic Kaal Sarp Puja in Ujjain with Pandit Deepak Goutam. Vedic rituals at Mahakaleshwar Temple for Kaal Sarp Dosha Nivaran and blessings.",
    images: [
      {
        url: "/images/kaal-sarp-pooja.jpg", // Unchanged
        width: 1200,
        height: 630,
        alt: "Pandit Deepak Goutam - Kaal Sarp Puja in Ujjain",
      },
    ],
    url: "https://www.ujjainkalsarp.com/", // Unchanged
    type: "website", // Changed to "website" as it's homepage
  },
};

export default function Home() {
  // Structured Data for Homepage (Schema.org)
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pandit Deepak Goutam - Kaal Sarp Puja Specialist",
    url: "https://www.ujjainkalsarp.com",
    description:
      "Official website of Pandit Deepak Goutam, expert in Kaal Sarp Dosh Puja and Vedic rituals in Ujjain at Mahakaleshwar Temple.",
    publisher: {
      "@type": "Person",
      name: "Pandit Deepak Goutam",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.ujjainkalsarp.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      {/* Add Schema Markup */}
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
        />
      </head>
      <Hero />
      <Banner />
      {/* <PyramidCircles/> */}
      {/* <AutoScroll /> */}
      <Services />
      <ProductList/>
      <PanditDescription />
      <Achivement />
      <Blog />
      <Testimonials />
      <Faq />
      {/* <ScrollUp /> */}
    </>
  );
}