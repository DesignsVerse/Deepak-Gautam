import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page | DesignsVerse",
  description:
    "Learn more about DesignsVerse, a leading agency specializing in website development, digital marketing, and personal branding. We create SEO-friendly, high-performance websites and result-driven strategies to help businesses and professionals succeed in the digital world.",
};

const Galary = () => {
  return (
    <>
      <Breadcrumb
        pageName="पूजा गैलरी (पूजन एवं अनुष्ठान छायाचित्र)"
        description="यहाँ माँ बगलामुखी मंदिर, नलखेड़ा में संपन्न होने वाली विभिन्न विशेष पूजाओं और अनुष्ठानों की झलकियाँ प्रस्तुत हैं। भक्तगण माँ बगलामुखी की कृपा से संपन्न शत्रु बाधा निवारण, व्यापार वृद्धि, न्यायिक विजय, आध्यात्मिक उन्नति, एवं अन्य धार्मिक अनुष्ठानों के दिव्य क्षणों का अनुभव कर सकते हैं।"
      />

      <section id="about" className="pt-12 md:pt-16 lg:pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="relative rounded-lg shadow-lg overflow-hidden group"
              >
                <img
                  src={`/images/galary/${index + 1}.jpg`}
                  alt={`Image ${index + 1}`}
                  className="w-full h-52 sm:h-56 md:h-64 lg:h-72 object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
                {/* Overlay Effect */}
                <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    
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
