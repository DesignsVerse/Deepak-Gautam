import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import Head from "next/head"; // ✅ Added for extra SEO benefits
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Deepak Gautam | Website Development & Digital Marketing Expert", // ✅ Title updated for better SEO
  description:
    "Get in touch with Deepak Gautam for expert solutions in website development, digital marketing, and personal branding. Let's build an SEO-optimized, high-performance online presence together.",
  keywords:
    "Contact Deepak Gautam, Website Development, Digital Marketing, SEO Expert, Personal Branding, Business Growth, Online Consultation", // ✅ Added keywords for SEO
  openGraph: {
    title: "Contact Deepak Gautam | Web & Digital Marketing Expert", // ✅ Optimized for social sharing
    description:
      "Have questions about website development or digital marketing? Contact Deepak Gautam today for tailored solutions and expert guidance.",
    images: ["/images/contact-banner.jpg"], // ✅ Added OpenGraph image
    type: "website",
  },
};

const ContactPage = () => {
  return (
    <>
      {/* ✅ Extra SEO enhancements */}
      <Head>
        <meta name="robots" content="index, follow" /> {/* ✅ Ensures page indexing */}
        <meta name="author" content="Deepak Gautam" /> {/* ✅ Added author name */}
      </Head>

      {/* ✅ Updated Breadcrumb for better SEO */}
      <Breadcrumb
        pageName="संपर्क करें - Deepak Gautam"
        description="वेबसाइट डेवलपमेंट, डिजिटल मार्केटिंग, और SEO सेवाओं के लिए हमसे संपर्क करें। आपकी सहायता के लिए हम हमेशा तैयार हैं।"
      />

      <section className="mt-10 pb-16">
        <div className="container mx-auto px-6">
          

          <Contact />
        </div>
      </section>
    </>
  );
};

export default ContactPage;
