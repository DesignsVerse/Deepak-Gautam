import { motion } from "framer-motion";
import Image from "next/image";

const AboutSectionOne = () => {
  return (
    <section id="about" className="pt-12 md:pt-16 lg:pt-20">
      <div className="container mx-auto px-4">
        {/* SEO-Friendly Heading */}
        <h2 className="text-3xl font-bold text-center mb-6">
          About Our Journey
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Discover our story through these beautiful moments.
        </p>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(10)].map((_, index) => (
            <motion.figure
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              className={`relative mx-auto rounded-lg shadow-lg overflow-hidden ${
                index % 3 === 0 ? "col-span-2" : ""
              }`}
            >
              {/* SEO Optimized Image */}
              <Image
                src={`/images/img${index + 1}.jpg`}
                alt={`Gallery image ${index + 1} - A glimpse into our journey`}
                width={500} // ✅ Required for Next.js optimization
                height={300} // ✅ Required for Next.js optimization
                className="w-full h-auto object-cover"
                priority={false} // ✅ Ensures lazy loading
                loading="lazy" // ✅ SEO Best Practice
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
