import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

// Global Metadata for the entire site
export const metadata: Metadata = {
  title: {
    default: "Deepak Gautam - Website Development & Digital Marketing Expert",
    template: "%s | Deepak Gautam", // Dynamic title template for sub-pages
  },
  description:
    "Deepak Gautam offers expert solutions in website development, SEO, digital marketing, and personal branding. Boost your online presence with proven strategies.",
  keywords:
    "Deepak Gautam, website development, digital marketing, SEO expert, personal branding, business growth, online marketing",
  robots: "index, follow", // Ensure site-wide indexing
  authors: [{ name: "Deepak Gautam" }], // Author attribution
  alternates: {
    canonical: "https://www.deepakgautam.com", // Base canonical URL
  },
  openGraph: {
    title: "Deepak Gautam - Web & Digital Marketing Expert",
    description:
      "Explore expert services in website development, SEO, and digital marketing by Deepak Gautam.",
    images: [
      {
        url: "/images/site-banner.jpg", // Default OG image
        width: 1200,
        height: 630,
        alt: "Deepak Gautam - Digital Marketing Expert",
      },
    ],
    url: "https://www.deepakgautam.com",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Deepak Gautam - Digital Marketing Expert",
  //   description:
  //     "Website development, SEO, and digital marketing solutions by Deepak Gautam.",
  //    // Fixed missing image field
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Site-wide Structured Data (Schema.org)
  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Deepak Gautam",
    url: "https://www.deepakgautam.com",
    description:
      "Official website of Deepak Gautam - Expert in website development, SEO, and digital marketing.",
    publisher: {
      "@type": "Person",
      name: "Deepak Gautam",
    },
  };

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body className={`bg-white text-black ${inter.className}`}>
        <Header />
        {children}
        <Analytics />
        <Footer />
        {/* <ScrollToTop /> */}
      </body>
    </html>
  );
}