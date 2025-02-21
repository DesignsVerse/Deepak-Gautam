import Blog from "@/components/Blog";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { Metadata } from "next";
import Services from "@/components/Services";
import Faq from "@/components/FAQ";
import PanditDescription from "@/components/PanditDescription";
import Achivement from "@/components/Achivement";
import AutoScroll from "@/components/Marquee";

export const metadata: Metadata = {
  title: "Deepak Gautam - Website Development, Digital Marketing & SEO Expert",
  description:
    "Welcome to Deepak Gautam's official website. Expert services in website development, SEO, digital marketing, and personal branding to boost your online presence.",
  keywords:
    "Deepak Gautam, website development, digital marketing, SEO expert, personal branding, business growth, online marketing",
  robots: "index, follow", // ✅ Ensure indexing
  authors: [{ name: "Deepak Gautam" }], // ✅ Author attribution
  alternates: {
    canonical: "https://www.deepakgautam.com", // ✅ Canonical URL for homepage
  },
  openGraph: {
    title: "Deepak Gautam - Web & Digital Marketing Expert",
    description:
      "Discover expert solutions in website development, SEO, and digital marketing with Deepak Gautam.",
    images: [
      {
        url: "/images/home-banner.jpg", // ✅ Homepage-specific banner
        width: 1200,
        height: 630,
        alt: "Deepak Gautam - Homepage Banner",
      },
    ],
    url: "https://www.deepakgautam.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deepak Gautam - Digital Marketing Expert",
    description:
      "Boost your online presence with Deepak Gautam’s website development and digital marketing services.",
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
      <AutoScroll />
      <Services />
      <PanditDescription />
      <Achivement />
      <Blog />
      <Testimonials />
      <Faq />
      {/* <ScrollUp /> */}
    </>
  );
}