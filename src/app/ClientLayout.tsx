"use client";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Popup from "@/components/Popup/Popup";
import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalytics";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCallNowPage = pathname === "/puja" || pathname === "/mangaldosh";
  

  return (
    <>
      {!isCallNowPage && <GoogleAnalytics trackingId="AW-10955081643" />}
      {!isCallNowPage && <Header />}
      {children}
      {!isCallNowPage && <Popup />}
      {!isCallNowPage && <Analytics />}
      {!isCallNowPage && <Footer />}
    </>
  );
}