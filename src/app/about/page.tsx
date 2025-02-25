import Image from "next/image";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

// Optimized Metadata for SEO
export const metadata: Metadata = {
  title: "पूजा गैलरी - माँ बगलामुखी अनुष्ठान | Deepak Gautam",
  description:
    "माँ बगलामुखी मंदिर, नलखेड़ा की विशेष पूजाओं और अनुष्ठानों की छायाचित्र गैलरी। शत्रु बाधा निवारण, व्यापार वृद्धि, और आध्यात्मिक उन्नति के दिव्य क्षणों को देखें। Deepak Gautam द्वारा प्रस्तुत।",
  keywords:
    "माँ बगलामुखी पूजा, अनुष्ठान गैलरी, Deepak Gautam, नलखेड़ा मंदिर, शत्रु निवारण, व्यापार वृद्धि, SEO विशेषज्ञ, धार्मिक छायाचित्र",
  robots: "index, follow", // ✅ Added robots for indexing
  authors: [{ name: "Deepak Gautam" }], // ✅ Added author
  alternates: {
    canonical: "https://www.tuwebsite.com/puja-gallery", // ✅ Canonical URL (apna domain daal)
  },
  openGraph: {
    title: "पूजा गैलरी - माँ बगलामुखी अनुष्ठान | Deepak Gautam",
    description:
      "माँ बगलामुखी की विशेष पूजाओं की झलकियाँ - शत्रु बाधा निवारण, व्यापार वृद्धि और आध्यात्मिक उन्नति के लिए। Deepak Gautam द्वारा।",
    images: [
      {
        url: "/images/seo-banner.jpg",
        width: 800,
        height: 600,
        alt: "माँ बगलामुखी पूजा बैनर",
      },
    ],
    url: "https://www.tuwebsite.com/puja-gallery",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "पूजा गैलरी - माँ बगलामुखी अनुष्ठान | Deepak Gautam",
    description:
      "माँ बगलामुखी की पूजा और अनुष्ठानों की छायाचित्र गैलरी। Deepak Gautam के साथ दिव्य अनुभव।",
    
  },
};

const Galary = () => {
  return (
    <>
      {/* Breadcrumb - Already Good, Minor Tweak */}
      <Breadcrumb
        pageName="पूजा गैलरी - माँ बगलामुखी अनुष्ठान एवं पूजन छायाचित्र"
        description="माँ बगलामुखी मंदिर, नलखेड़ा में होने वाली विशेष पूजाओं और अनुष्ठानों की झलकियाँ। शत्रु बाधा निवारण, व्यापार वृद्धि, और आध्यात्मिक उन्नति के लिए धार्मिक अनुष्ठानों के दिव्य क्षण।"
      />

      <section id="about" className="pt-12 md:pt-16 lg:pt-20 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
            माँ बगलामुखी पूजा एवं अनुष्ठान गैलरी
          </h1> {/* ✅ Changed to H1 for better SEO */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="relative rounded-lg shadow-lg overflow-hidden group"
              >
                <Image
                  src={`/images/about/${index + 1}.jpg`}
                  alt={`माँ बगलामुखी पूजा छवि ${index + 1} - Deepak Gautam`} // ✅ Enhanced alt text
                  width={500}
                  height={300}
                  unoptimized // ✅ Kept for local images
                  className="w-full h-52 sm:h-56 md:h-64 lg:h-72 object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Deepak Goutam Seva
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Galary;