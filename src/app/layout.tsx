import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { Metadata } from "next";
import Popup from "@/components/Popup/Popup";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

const GA_TRACKING_ID = "AW-10955081643"; // Replace with your actual Google Ads tracking ID

// Global Metadata for the entire site
export const metadata: Metadata = {
  title: {
    default: "Pandit Deepak Goutam - Kaal Sarp Puja Specialist in Ujjain",
    template: "%s | Pandit Deepak Goutam - Ujjain Kaal Sarp",
  },
  description:
    "Pandit Deepak Goutam offers authentic Kaal Sarp Puja in Ujjain at Mahakaleshwar Temple. Expert Vedic rituals for Kaal Sarp Dosha Nivaran and spiritual peace.",
  keywords:
    "ujjain kaal sarp, kaal sarp puja ujjain, pandit deepak goutam, kaal sarp dosh nivaran, mahakaleshwar temple, vedic rituals, spiritual services",
  robots: "index, follow",
  authors: [{ name: "Pandit Deepak Goutam" }],
  alternates: {
    canonical: "https://www.ujjainkalsarp.com",
  },
  openGraph: {
    title: "Pandit Deepak Goutam - Kaal Sarp Puja Expert in Ujjain",
    description:
      "Authentic Kaal Sarp Puja services in Ujjain by Pandit Deepak Goutam. Vedic solutions for Kaal Sarp Dosha Nivaran at Mahakaleshwar Temple.",
    images: [
      {
        url: "/images/kaal-sarp-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Pandit Deepak Goutam - Kaal Sarp Puja in Ujjain",
      },
    ],
    url: "https://www.ujjainkalsarp.com",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  // Site-wide Structured Data (Schema.org)
  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pandit Deepak Goutam - Ujjain Kaal Sarp",
    url: "https://www.ujjainkalsarp.com",
    description:
      "Official website of Pandit Deepak Goutam, specialist in Kaal Sarp Puja and Vedic rituals in Ujjain at Mahakaleshwar Temple.",
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
    <html suppressHydrationWarning lang="en">
      <head>
        {/* Google Ads Tag */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}
        </Script>
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body className={`bg-white text-black ${inter.className}`}>
        <Header />
        {children}
        <Popup />
        <Analytics />
        <Footer />
        {/* <ScrollToTop /> */}
      </body>
    </html>
  );
}
