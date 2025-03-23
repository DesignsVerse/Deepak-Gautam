
import KaalSarpDoshPuja from "@/components/puja/main";
import { GoogleTagManager } from "@next/third-parties/google";

const ServicePage = () => {
  // Structured Data for Services Page (Schema.org)
 

  return (
    <>
      {/* Add Schema Markup */}
      
      <GoogleTagManager gtmId="GTM-PFT82RPX" />
      <KaalSarpDoshPuja/>
    
    </>
  );
};

export default ServicePage;
