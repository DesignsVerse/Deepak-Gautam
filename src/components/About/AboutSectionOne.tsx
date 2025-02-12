import { motion } from "framer-motion";
import Image from "next/image";
const AboutSectionOne = () => {
  return (
    <section id="about" className="pt-12 md:pt-16 lg:pt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(10)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              className={`relative mx-auto rounded-lg shadow-lg overflow-hidden ${
                index % 3 === 0 ? "col-span-2" : ""
              }`}
            >
              <Image
                src={`/images/img${index + 1}.jpg`}
                alt={`Image ${index + 1}`}
                width={500} // ✅ Required for Next.js optimization
                height={300} // ✅ Required for Next.js optimization
                className="w-full h-auto object-cover"
                unoptimized // ✅ Optional: Remove if using external images
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
