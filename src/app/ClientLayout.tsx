// app/ClientLayout.tsx
"use client";

import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Popup from "@/components/Popup/Popup";
import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalytics";
import { usePathname } from "next/navigation";
import CartSidebar from "@/components/cartsidebar/CartSidebar";
import { Toaster } from "react-hot-toast";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCallNowPage = pathname === "/puja" || pathname === "/mangaldosha";

  return (
    <>
    <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      {!isCallNowPage && <GoogleAnalytics trackingId="AW-10955081643" />}
      {!isCallNowPage && <Header />}
      {children}
      {!isCallNowPage && <Popup />}
      {!isCallNowPage && <Analytics />}
      {!isCallNowPage && <Footer />}
      {!isCallNowPage && <CartSidebar />}
    </>
  );
}