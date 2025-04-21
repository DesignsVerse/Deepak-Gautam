import Image from "next/image";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import "@/styles/index.css"; // Ensure custom CSS is available

const PanditDescription1 = ({ isHindi }) => {
  const controls = useAnimation();

  // Trigger animation on mount
  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Language-specific content
  const content = {
    english: {
      title: "Pandit Deepak Goutam – Expert in Kaal Sarp Dosh Puja in Ujjain",
      description:
        "With over <strong>15 years of experience</strong> in Kaal Sarp Dosh Puja, <strong>Pandit Deepak Goutam</strong> is a certified astrologer and a renowned specialist in <strong>Kaal Sarp Dosh Puja in Ujjain</strong>. Having performed <strong>5000+ Kaal Sarp Dosh Pujas</strong>, he provides authentic rituals and effective remedies to help individuals overcome obstacles and attain peace. His expertise covers <strong>Anant Kaal Sarp Dosh</strong>, <strong>Karkotak Kaal Sarp Dosh</strong>, and other planetary imbalances. With his trusted guidance, people experience relief, prosperity, and spiritual growth, making him the most sought-after <strong>Kaal Sarp Dosh Puja specialist in Ujjain</strong>.",
      buttonText: "Free Call - Now",
    },
    hindi: {
      title: "पंडित दीपक गौतम – उज्जैन में काल सर्प दोष पूजा के विशेषज्ञ",
      description:
        "<strong>15+ वर्षों के अनुभव</strong> के साथ, <strong>पंडित दीपक गौतम</strong> एक प्रमाणित ज्योतिषी और <strong>उज्जैन में काल सर्प दोष पूजा</strong> के प्रसिद्ध विशेषज्ञ हैं। उन्होंने <strong>5000+ काल सर्प दोष पूजाएँ</strong> संपन्न की हैं और व्यक्तियों को बाधाओं को दूर करने और शांति प्राप्त करने के लिए प्रामाणिक अनुष्ठान और प्रभावी उपाय प्रदान करते हैं। उनकी विशेषज्ञता <strong>अनंत काल सर्प दोष</strong>, <strong>कर्कोटक काल सर्प दोष</strong>, और अन्य ग्रह असंतुलनों को कवर करती है। उनके भरोसेमंद मार्गदर्शन से लोग राहत, समृद्धि और आध्यात्मिक विकास का अनुभव करते हैं, जिससे वे <strong>उज्जैन में सबसे अधिक मांग वाले काल सर्प दोष पूजा विशेषज्ञ</strong> बन गए हैं।",
      buttonText: "मुफ्त कॉल - अभी",
    },
  };

  const currentContent = isHindi ? content.hindi : content.english;

  return (
    <article className="px- flex justify-center pb-8 pt-12 sm:px-6 md:px-8 ">
      <motion.div
        className="relative mx-auto flex w-full max-w-6xl flex-col items-center overflow-hidden rounded-3xl bg-orange-600/90 p-6 shadow-2xl sm:p-8 md:flex-row md:p-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Decorative Background Element */}
        <div className="animate-pulse-slow absolute inset-0 bg-[radial-gradient(circle_at_center,#f97316_0%,transparent_70%)] opacity-20" />

        {/* Image Section */}
        <motion.div
          className="mb-6 flex w-full items-center justify-center md:mb-0 md:w-1/3 md:pr-6"
          variants={childVariants}
        >
          <div className="relative flex h-52 w-52 items-center justify-center sm:h-64 sm:w-64 md:h-72 md:w-72">
            <motion.div
              className="absolute h-full w-full rounded-full bg-cover bg-center opacity-30"
              style={{ backgroundImage: "url('/bg.webp')" }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
            />
            <Image
              src="/images/bhaiya/33.webp"
              alt={
                isHindi
                  ? "पंडित जी - ज्योतिष और वास्तु विशेषज्ञ"
                  : "Pandit Ji - Expert in Astrology and Vastu"
              }
              width={320}
              height={320}
              priority
              className="relative z-10 h-full w-full rounded-full object-cover shadow-lg"
              sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, 288px"
            />
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          className="flex w-full flex-col justify-center px-0 text-center sm:px-4 md:w-2/3 md:pl-6 md:text-left"
          variants={childVariants}
        >
          <h2 className="mb-4 text-2xl font-extrabold leading-tight text-white drop-shadow-xl sm:mb-6 sm:text-3xl md:text-4xl">
            {currentContent.title}
          </h2>
          <p
            className="mb-6 text-justify text-sm font-medium leading-relaxed text-gray-100 sm:mb-8 sm:text-base md:text-lg"
            dangerouslySetInnerHTML={{ __html: currentContent.description }}
          />

          <div className="flex justify-center">
            <motion.button
              className="group relative mx-auto overflow-hidden rounded-full bg-gradient-to-r from-orange-600 to-red-500 px-4 py-2 text-xs font-bold text-white shadow-lg sm:px-5 sm:py-2.5 sm:text-sm md:mx-0 md:px-6 md:py-3 md:text-base"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(255, 92, 22, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              aria-label={
                isHindi
                  ? "ज्योतिष परामर्श कॉल बुक करें"
                  : "Book astronomy consultation call"
              }
            >
              <span className="absolute inset-0 origin-left scale-x-0 transform bg-orange-700 transition-transform duration-300 group-hover:scale-x-100" />
              <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                <a
                  href="tel:+91-9153164444"
                  className="relative z-10 flex items-center gap-1 sm:gap-2"
                >
                  <span>{currentContent.buttonText}</span>
                  <span className="text-lg group-hover:animate-bounce sm:text-xl">
                    ✨
                  </span>
                </a>
              </span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </article>
  );
};

export default PanditDescription1;
