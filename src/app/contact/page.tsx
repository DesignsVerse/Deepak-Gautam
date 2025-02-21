import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "संपर्क करें | Deepak Gautam - वेब डेवलपमेंट और डिजिटल मार्केटिंग विशेषज्ञ",
  description:
    "Deepak Gautam से संपर्क करें—वेबसाइट डेवलपमेंट, SEO, डिजिटल मार्केटिंग, और पर्सनल ब्रांडिंग के लिए विशेषज्ञ समाधान। अपनी ऑनलाइन उपस्थिति को बेहतर बनाएं।",
  keywords:
    "Deepak Gautam, संपर्क करें, वेबसाइट डेवलपमेंट, डिजिटल मार्केटिंग, SEO विशेषज्ञ, पर्सनल ब्रांडिंग, ऑनलाइन परामर्श, व्यवसाय वृद्धि",
  robots: "index, follow", // ✅ Ensure indexing
  authors: [{ name: "Deepak Gautam" }], // ✅ Author attribution
  alternates: {
    canonical: "https://www.deepakgautam.com/contact", // ✅ Canonical URL
  },
  openGraph: {
    title: "संपर्क करें | Deepak Gautam - डिजिटल मार्केटिंग विशेषज्ञ",
    description:
      "वेबसाइट डेवलपमेंट, SEO, या डिजिटल मार्केटिंग के सवाल हैं? Deepak Gautam से आज ही संपर्क करें।",
    images: [
      {
        url: "/images/contact-banner.jpg",
        width: 800,
        height: 600,
        alt: "Deepak Gautam - संपर्क पेज बैनर",
      },
    ],
    url: "https://www.deepakgautam.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "संपर्क करें | Deepak Gautam",
    description:
      "Deepak Gautam से वेब डेवलपमेंट और डिजिटल मार्केटिंग के लिए संपर्क करें।",
  },
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="संपर्क करें - Deepak Gautam"
        description="वेबसाइट डेवलपमेंट, डिजिटल मार्केटिंग, और SEO सेवाओं के लिए Deepak Gautam से संपर्क करें। हम आपकी सहायता के लिए तैयार हैं।"
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