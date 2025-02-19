import ServiceSection from "@/components/Services/1";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "हमारी सेवाएं | पंडित दीपक गौतम जी",
  description:
    "पंडित दीपक गौतम जी से ज्योतिष, मंत्र-साधना, पूजा-पाठ और धार्मिक अनुष्ठानों की अनुभवी सेवाएं प्राप्त करें। शत्रु नाश, सफलता प्राप्ति और आध्यात्मिक समाधान के लिए संपर्क करें।"
};

const ServicePage = () => {
  return (
    <>
      <Breadcrumb
        pageName="हमारी सेवाएं | पंडित दीपक गौतम जी"
        description="शत्रु नाश, सफलता प्राप्ति और आध्यात्मिक समाधान के लिए संपर्क करें।"
      />
      <ServiceSection />
    </>
  );
};

export default ServicePage;
