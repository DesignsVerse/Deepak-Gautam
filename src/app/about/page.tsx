import Image from "next/image";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import Head from "next/head"; // ✅ Added for extra SEO benefits

export const metadata: Metadata = {
  title: "About Page | Deepak Gautam - SEO & Digital Marketing Expert", // ✅ Title updated for better SEO
  description:
    "Discover the expertise of Deepak Gautam in website development, SEO, digital marketing, and personal branding. Learn how we create high-performance websites and result-driven strategies for businesses and professionals.",
  keywords: "Deepak Gautam, Website Development, SEO Expert, Digital Marketing, Personal Branding, Business Growth, Online Strategy", // ✅ Added keywords for better ranking
  openGraph: {
    title: "About Deepak Gautam - Web & Digital Marketing Expert", // ✅ Improved for social media sharing
    description:
      "Explore Deepak Gautam's journey in website development, SEO, and digital marketing. Discover how our expert strategies help businesses grow online.",
    images: ["/images/seo-banner.jpg"], // ✅ Added OpenGraph image for better social media preview
    type: "website",
  },
};

const Galary = () => {
  return (
    <>
      {/* ✅ Extra SEO improvements */}
      <Head>
        <meta name="robots" content="index, follow" /> {/* ✅ Added to ensure search engines index */}
        <meta name="author" content="Deepak Gautam" /> {/* ✅ Added author name */}
      </Head>

      {/* ✅ Updated Breadcrumb for better SEO */}
      <Breadcrumb
        pageName="पूजा गैलरी - माँ बगलामुखी अनुष्ठान एवं पूजन छायाचित्र"
        description="यहाँ माँ बगलामुखी मंदिर, नलखेड़ा में संपन्न होने वाली विभिन्न विशेष पूजाओं और अनुष्ठानों की झलकियाँ प्रस्तुत हैं। भक्तगण माँ बगलामुखी की कृपा से संपन्न शत्रु बाधा निवारण, व्यापार वृद्धि, न्यायिक विजय, आध्यात्मिक उन्नति, एवं अन्य धार्मिक अनुष्ठानों के दिव्य क्षणों का अनुभव कर सकते हैं।"
      />

      <section id="about" className="pt-12 md:pt-16 lg:pt-20 pb-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
            माँ बगलामुखी पूजा एवं अनुष्ठान गैलरी
          </h2> {/* ✅ Added H2 for better SEO */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="relative rounded-lg shadow-lg overflow-hidden group"
              >
                <Image
                  src={`/images/galary/${index + 1}.jpg`}
                  alt={`माँ बगलामुखी पूजा छवि ${index + 1}`} // ✅ Updated alt text for better SEO
                  width={500}
                  height={300}
                  unoptimized // ✅ Added this for local images
                  className="w-full h-52 sm:h-56 md:h-64 lg:h-72 object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
                {/* ✅ Overlay Effect with Image Caption */}
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    माँ बगलामुखी विशेष पूजन {index + 1}
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
