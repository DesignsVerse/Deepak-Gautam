import Image from "next/image";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

// Optimized Metadata for SEO
export const metadata: Metadata = {
  title: "Puja Gallery - Kaal Sarp Puja Ujjain | Pandit Deepak Goutam",
  description:
    "Explore the photo gallery of Kaal Sarp Puja in Ujjain by Pandit Deepak Goutam. Witness divine rituals for Kaal Sarp Dosha Nivaran and spiritual peace.",
  keywords:
    "ujjain kaal sarp, kaal sarp ujjain, deepak goutam pandit, kaal sarp puja ujjain, kaal sarp dosha nivaran, spiritual rituals",
  robots: "index, follow",
  authors: [{ name: "Pandit Deepak Goutam" }],
  alternates: {
    canonical: "https://www.ujjainkalsarp.com/gallery",
  },
  openGraph: {
    title: "Puja Gallery - Kaal Sarp Puja Ujjain | Pandit Deepak Goutam",
    description:
      "View glimpses of Kaal Sarp Puja in Ujjain by Pandit Deepak Goutam. Expert rituals for Kaal Sarp Dosha Nivaran and spiritual upliftment.",
    images: [
      {
        url: "/images/puja-gallery-banner.jpg",
        width: 800,
        height: 600,
        alt: "Pandit Deepak Goutam - Kaal Sarp Puja Ujjain Gallery",
      },
    ],
    url: "https://www.ujjainkalsarp.com/gallery",
    type: "website",
  },
};

export default function Gallery() {
  return (
    <>
      {/* Breadcrumb - Updated */}
      <Breadcrumb
        pageName="Puja Gallery"
        description="Explore the Kaal Sarp Dosha Puja Gallery by Pandit Deepak Goutam in Ujjain. View sacred rituals and spiritual ceremonies in vivid detail."
      />

      <section id="about" className="pt-12 md:pt-16 lg:pt-20 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
            Kaal Sarp Dosha Puja Gallery - Pandit Deepak Goutam
          </h1>

          <p className="text-center mb-8">
            Discover divine moments from Kaal Sarp Puja in Ujjain, performed by Pandit Deepak Goutam. These sacred rituals offer solutions for Kaal Sarp Dosha Nivaran and spiritual peace.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="relative rounded-lg shadow-lg overflow-hidden group"
              >
                <Image
                  src={`/images/about/${index + 1}.jpg`}
                  alt={`Pandit Deepak Goutam - Kaal Sarp Puja Ujjain Image ${index + 1}`}
                  width={500}
                  height={300}
                  unoptimized
                  className="w-full h-52 sm:h-56 md:h-64 lg:h-72 object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Pandit Deepak Goutam Seva
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
