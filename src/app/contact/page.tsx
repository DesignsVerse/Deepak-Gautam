import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Deepak Gautam ",
  description:
    "Contact Deepak Gautam—expert solutions .",
  keywords:
    "",
  robots: "index, follow", // ✅ Ensure indexing
  authors: [{ name: "Deepak Gautam" }], // ✅ Author attribution
  alternates: {
    canonical: "https://www.deepakgautam.com/contact", // ✅ Canonical URL
  },
  openGraph: {
    title: "Contact | Deepak Gautam - Digital Marketing Expert",
    description:
      "Have questions about website development, SEO, or digital marketing? Contact Deepak Gautam today.",
    images: [
      {
        url: "/images/contact-banner.jpg",
        width: 800,
        height: 600,
        alt: "Deepak Gautam - Contact Page Banner",
      },
    ],
    url: "https://www.deepakgautam.com/contact",
    type: "website",
  },
  
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact - Deepak Gautam"
        description="Contact Deepak Gautam for Astrology Solution."
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