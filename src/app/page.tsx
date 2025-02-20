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
  title: "Deepak_Gautam",
  description: "",  
};

export default function Home() {
  return (
    <>
      
      <Hero />
      <AutoScroll/>
      {/* <AboutPandit/> */}
      <Services/>
      <PanditDescription/>
      <Achivement/>
      {/* <ZodiacSigns/> */}
      <Blog />
      <Testimonials />
      <Faq/>
      {/* <ScrollUp /> */}
    </>
  );
}
