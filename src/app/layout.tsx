"use client";
import { Analytics } from "@vercel/analytics/react"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={` bg-white text-black ${inter.className}`}>
        <>
          <Header />
          {children}
          <Analytics />
          <Footer />
          {/* <ScrollToTop /> */}
          <SpeedInsights/>
        </>
      </body>
    </html>
  );
}

