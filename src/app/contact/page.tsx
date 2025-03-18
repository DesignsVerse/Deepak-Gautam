import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Deepak Goutam - Kaal Sarp Puja Ujjain", // ✅ Keyword-rich title
  description:
    "Contact Pandit Deepak Goutam for expert Kaal Sarp Puja in Ujjain. Book your Kaal Sarp Dosha Nivaran today!", // ✅ Concise, keyword-focused
  keywords:
    "ujjain kaal sarp, kaal sarp ujjain, deepak goutam pandit, kaal sarp puja ujjain, kaal sarp dosha nivaran", // ✅ Targeted keywords
  robots: "index, follow", // ✅ Good as is
  authors: [{ name: "Pandit Deepak Goutam" }], // ✅ Updated to Pandit ji’s title
  alternates: {
    canonical: "https://www.ujjainkalsarp.com/contact", // ✅ Updated to actual domain
  },
  openGraph: {
    title: "Contact Pandit Deepak Goutam, Ujjian",
    description:
      "Reach out to Pandit Deepak Goutam for Kaal Sarp Puja and Dosha Nivaran services in Ujjain. Expert astrology solutions await!",
    images: [
      {
        url: "/images/contact-pandit-deepak-goutam.jpg", // ✅ Suggest renaming image
        width: 800,
        height: 600,
        alt: "Pandit Deepak Goutam - Kaal Sarp Puja Ujjain Contact", // ✅ Keyword in alt text
      },
    ],
    url: "https://www.ujjainkalsarp.com/contact",
    type: "website",
  },
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Pandit Deepak Goutam"
        description="Get in touch with Pandit Deepak Goutam for expert Kaal Sarp Puja and Dosha Nivaran in Ujjain."
      />

      <section className="mt-10 pb-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-6 text-center text-3xl font-bold">
            Contact Pandit Deepak Goutam for Kaal Sarp Puja in Ujjain
          </h2>
          <p className="mb-8 text-center">
            Reach out to Pandit Deepak Goutam, a renowned expert in Kaal Sarp
            Dosha Nivaran, based in Ujjain. Book your puja today!
          </p>
          <Contact />
        </div>
      </section>
    </>
  );
};

export default ContactPage;
