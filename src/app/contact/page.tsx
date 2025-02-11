import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page",
  description: "Have questions or need expert solutions for website development, digital marketing, or personal branding? Contact DesignsVerse today for tailored strategies and seamless digital experiences. Let's build something amazing together!",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="संपर्क करें"
        description="हमसे संपर्क करें, आपकी सहायता के लिए हम हमेशा तैयार हैं।"
      />
      <Contact />
    </>
  );
};

export default ContactPage;
