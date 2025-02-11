
import Blog from "@/components/Blog";
import Brands from "@/components/Marquee";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { Metadata } from "next";
import Service from "../../app/services/[id]/page";
import AboutPandit from "@/components/AboutPandit";

import Addmore from "@/components/ExtraPage";
import CallNow from "@/components/Marquee";
import Services from "@/components/Services";


export const metadata: Metadata = {
  title: "DesignsVerse",
  description: "DesignsVerse is an India's leading digital solutions agency offering custom website development, ERP software, digital marketing, UI/UX design, mobile app development, and branding services to enhance your online presence and drive business growth.",
  // other metadata
  
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <AboutPandit/>
      <Services/>
      <CallNow />
      <Addmore />
      <Testimonials />
      <Blog />
      {/* <Contact /> */}
      
      {/* <Pricing />
      <AboutSectionOne />
      <AboutSectionTwo /> */}
      
      
      
      
    </>
  );
}
