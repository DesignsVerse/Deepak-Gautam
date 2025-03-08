import Blog from "@/components/Blog";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { Metadata } from "next";
import Services from "@/components/Services";
import Faq from "@/components/FAQ";
import PanditDescription from "@/components/PanditDescription";
import Achivement from "@/components/Achivement";
import AutoScroll from "@/components/Marquee";
import ResponsiveImage from "@/components/Banner";
import Banner from "@/components/Banner";
import PyramidCircles from "@/components/Thali";
import Popup from "@/components/Popup/Popup";

export const metadata: Metadata = {
  title: "Deepak Gautam - Kaal Sarp Dosh Puja Specialist in Ujjain",
  description:
    "Perform authentic Kaal Sarp Dosh Puja in Ujjain with Deepak Gautam. Get expert guidance and Vedic rituals to remove doshas and bring peace to life.",
  keywords:
    "Kaal Sarp Dosh Puja Ujjain, Kaal Sarp Puja, Kaal Sarp Dosh Nivaran, Pandit Deepak Gautam, Ujjain Temple, Mahakal Kaal Sarp Puja",
  robots: "index, follow", // ✅ Ensure indexing
  authors: [{ name: "Deepak Gautam" }], // ✅ Author attribution
  alternates: {
    canonical: "https://www.deepakgautam.com/kaal-sarp-pooja-ujjain", // ✅ Canonical URL for Kaal Sarp Pooja page
  },
  openGraph: {
    title: "Deepak Gautam - Kaal Sarp Dosh Puja Expert in Ujjain",
    description:
      "Book your Kaal Sarp Dosh Puja in Ujjain with Deepak Gautam, an experienced Vedic scholar. Get the blessings of Lord Shiva at Mahakaleshwar Temple.",
    images: [
      {
        url: "/images/kaal-sarp-pooja.jpg", // ✅ Specific banner for Kaal Sarp Pooja
        width: 1200,
        height: 630,
        alt: "Kaal Sarp Puja at Ujjain - Deepak Gautam",
      },
    ],
    url: "https://www.deepakgautam.com/kaal-sarp-pooja-ujjain",
    type: "article",
  },
  
};


export default function Home() {
  // Structured Data for Homepage (Schema.org)
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Deepak Gautam - Homepage",
    url: "https://www.deepakgautam.com",
    description:
      "Official homepage of Deepak Gautam - Expert in website development, SEO, and digital marketing.",
    publisher: {
      "@type": "Person",
      name: "Deepak Gautam",
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
     
      <Banner/>

      {/* <PyramidCircles/> */}
      {/* <AutoScroll /> */}
      <Services />
      <PanditDescription />
      <Achivement />
      <Blog />
      <Testimonials />
      <Faq />
      <Popup/>
      {/* <ScrollUp /> */}
    </>
  );
}
