import ServiceSection from "@/components/Services/1";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | DesignsVerse",
  description:
    "Explore our premium website development, digital marketing, and personal branding services at DesignsVerse. We craft SEO-friendly websites, powerful marketing strategies, and brand identities to elevate your online presence."
};

const ServicePage = () => {
  return (
    <>
      <Breadcrumb
        pageName="हमारी सेवाएं"
        description="समाधान, सफलता और शत्रु विजय सेवा!"
      />
      <ServiceSection />
    </>
  );
};

export default ServicePage;
