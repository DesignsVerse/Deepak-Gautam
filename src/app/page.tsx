import Blog from "@/components/Blog";
// import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { Metadata } from "next";
import AboutPandit from "@/components/AboutPandit";
import Services from "@/components/Services";
import BaglamukhiSection from "@/components/ExtraPage";
import CallNow from "@/components/Marquee";
export const metadata: Metadata = {
  title: "DesignsVerse",
  description: "DesignsVerse is an India's leading digital solutions agency offering custom website development, ERP software, digital marketing, UI/UX design, mobile app development, and branding services to enhance your online presence and drive business growth.",  
};

export default function Home() {
  return (
    <>
      
      <Hero />
      <AboutPandit/>
      <Services/>
      <CallNow/>
      <BaglamukhiSection/>
      <Testimonials />
      <Blog />
      {/* <ScrollUp /> */}
    </>
  );
}
