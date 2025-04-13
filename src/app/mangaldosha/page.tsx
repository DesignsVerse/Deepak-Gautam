
import MangalDoshPuja from "@/components/MangalDosh/main";
import { GoogleTagManager } from "@next/third-parties/google";

const ServicePage = () => {
  // Structured Data for Services Page (Schema.org)
 

  return (
    <>
      {/* Add Schema Markup */}
      
      <GoogleTagManager gtmId="GTM-PFT82RPX" />
      <MangalDoshPuja/>
    
    </>
  );
};

export default ServicePage;
