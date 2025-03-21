"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function KaalSarpDoshPuja() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll({ target: containerRef });
  const yParallax = useTransform(scrollY, [0, 400], [0, -60]);
  const [isHindi, setIsHindi] = useState(false);

  const content = {
    english: {
      title: "Kaal Sarp Dosh Puja in Ujjain",
      subtitle: "Guided by Pandit Deepak Goutam, embrace liberation and serenity through sacred Vedic rituals.",
      pujaSteps: [
        { step: "Sankalp", desc: "Begin with a sacred vow to the divine.", icon: "🌟", color: "from-yellow-400 to-orange-500" },
        { step: "Hawan", desc: "Cleanse energies with a holy fire ritual.", icon: "🔥", color: "from-orange-500 to-red-500" },
        { step: "Mantra Jaap", desc: "Chant Vedic mantras for blessings.", icon: "📿", color: "from-red-500 to-purple-500" },
        { step: "Puja Samapti", desc: "Complete with offerings and peace.", icon: "🙏", color: "from-purple-500 to-orange-400" },
      ],
      bookPuja: "Book Your Puja",
      contact: "Contact Pandit Ji",
      visitWebsite: "Visit Website",
      whyChoose: "Why Choose Pandit Deepak Goutam?",
      features: [
        { title: "Vedic Mastery", desc: "Deep knowledge of ancient rituals and scriptures.", icon: "🕉️" },
        { title: "Sacred Ujjain", desc: "Performed at the divine Mahakaleshwar ghats.", icon: "🙏" },
        { title: "Personalized Puja", desc: "Tailored rituals for your specific needs.", icon: "✨" },
      ],
      footerQuote: "Step into a sacred journey of trust and devotion. Your spiritual peace is our sacred duty.",
      footerAuthor: "- Pandit Deepak Goutam"
    },
    hindi: {
      title: "उज्जैन में काल सर्प दोष पूजा",
      subtitle: "पंडित दीपक गौतम के मार्गदर्शन में, पवित्र वैदिक अनुष्ठानों के माध्यम से मुक्ति और शांति प्राप्त करें।",
      pujaSteps: [
        { step: "संकल्प", desc: "दिव्य के प्रति पवित्र संकल्प के साथ शुरुआत।", icon: "🌟", color: "from-yellow-400 to-orange-500" },
        { step: "हवन", desc: "पवित्र अग्नि अनुष्ठान से ऊर्जा शुद्धिकरण।", icon: "🔥", color: "from-orange-500 to-red-500" },
        { step: "मंत्र जाप", desc: "आशीर्वाद के लिए वैदिक मंत्रों का जाप।", icon: "📿", color: "from-red-500 to-purple-500" },
        { step: "पूजा समाप्ति", desc: "प्रसाद और शांति के साथ समापन।", icon: "🙏", color: "from-purple-500 to-orange-400" },
      ],
      bookPuja: "अपनी पूजा बुक करें",
      contact: "पंडित जी से संपर्क करें",
      visitWebsite: "वेबसाइट देखें",
      whyChoose: "पंडित दीपक गौतम को क्यों चुनें?",
      features: [
        { title: "वैदिक विशेषज्ञता", desc: "प्राचीन अनुष्ठानों और शास्त्रों का गहन ज्ञान।", icon: "🕉️" },
        { title: "पवित्र उज्जैन", desc: "महाकालेश्वर घाटों पर संपन्न।", icon: "🙏" },
        { title: "वैयक्तिकृत पूजा", desc: "आपकी विशिष्ट आवश्यकताओं के लिए अनुकूलित अनुष्ठान।", icon: "✨" },
      ],
      footerQuote: "विश्वास और भक्ति की पवित्र यात्रा में कदम रखें। आपकी आध्यात्मिक शांति हमारा पवित्र कर्तव्य है।",
      footerAuthor: "- पंडित दीपक गौतम"
    }
  };

  const currentContent = isHindi ? content.hindi : content.english;

  useEffect(() => {
    const createParticle = () => {
      const container = document.querySelector(".particle-container");
      if (container.childElementCount > 20) return;
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full bg-orange-300 opacity-20";
      const size = Math.random() * 5 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      container?.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 5000);
    };

    const interval = setInterval(createParticle, window.innerWidth < 768 ? 1000 : 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-orange-50 via-yellow-50 to-white overflow-hidden relative font-sans"
    >
      {/* Language Toggle Button */}
      <motion.div 
        className="absolute top-4 right-4 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => setIsHindi(!isHindi)}
          className="bg-orange-600 text-white px-4  py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors duration-300 shadow-lg"
          aria-label={isHindi ? "Switch to English" : "Switch to Hindi"}
        >
          {isHindi ? "English" : "हिन्दी"}
        </button>
      </motion.div>

      {/* Enhanced Background with Particles */}
      <div className="absolute inset-0 z-0 particle-container">
        <div className="w-full h-full bg-[radial-gradient(circle_at_top_center,_rgba()_0%,_transparent_70%)]"></div>
        <motion.div
          className="absolute inset-0 opacity-10 bg-[url('/background.webp')] bg-repeat"
          animate={{ opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
        ></motion.div>
      </div>

      {/* Hero Section */}
      <div className="relative mt-5 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-8 sm:p-12 lg:p-20 text-center relative z-10 overflow-hidden border border-orange-200/50">
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-orange-100/70 via-yellow-50/50 to-transparent opacity-30 rounded-3xl"
            animate={{ opacity: [0.3, 0.4, 0.3] }}
            transition={{ duration: 7, repeat: Infinity }}
          ></motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight relative z-10 drop-shadow-xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {isHindi ? (
              <>
                काल सर्प दोष पूजा{" "}
                {currentContent.title.split("उज्जैन").map((part, index) => (
                  index === 0 ? part : <span key={index} className="text-orange-700">उज्जैन</span>
                ))}
              </>
            ) : (
              <>
                Kaal Sarp Dosh Puja in <span className="text-orange-700">Ujjain</span>
              </>
            )}
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto relative z-10 font-medium leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          >
            {currentContent.subtitle}
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 lg:gap-8 relative z-10">
            <motion.a
              href="https://wa.me/919153164444?text=Namaste!!%20Mujhe%20Consult%20krna%20hai"
              target="_blank"
      
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-orange-600 to-red-500 text-white py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 tracking-wide"
              whileHover={{ scale: 1.15, boxShadow: "0 25px 50px rgba(255, 165, 0, 0.6)" }}
              whileTap={{ scale: 0.9 }}
              aria-label={currentContent.bookPuja}
            >
              {currentContent.bookPuja}
            </motion.a>
            <motion.a
              href="tel:+91-9153164444"
              className="bg-white border-2 border-orange-600 text-orange-700 py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg font-semibold shadow-xl hover:bg-orange-50 transition-all duration-500 tracking-wide"
              whileHover={{ scale: 1.15, boxShadow: "0 25px 50px rgba(255, 165, 0, 0.4)" }}
              whileTap={{ scale: 0.9 }}
              aria-label={currentContent.contact}
            >
              {currentContent.contact}
            </motion.a>
            <motion.a
              href="/"
              className="bg-gradient-to-r from-orange-600 to-red-500 text-white py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 tracking-wide"
              whileHover={{ scale: 1.15, boxShadow: "0 25px 50px rgba(255, 165, 0, 0.6)" }}
              whileTap={{ scale: 0.9 }}
              aria-label={currentContent.visitWebsite}
            >
              {currentContent.visitWebsite}
            </motion.a>
          </div>

          {/* Enhanced Timeline Section (Original Desktop Version) */}
          <motion.div
            className="mt-16 sm:mt-20 lg:mt-24 relative"
            style={{ y: yParallax }}
          >
            <div className="relative max-w-4xl mx-auto py-10 sm:py-6">
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 h-full w-2 bg-gradient-to-b from-orange-400 via-yellow-500 to-red-500 rounded-full shadow-[0_0_20px_rgba(255,165,0,0.6)]"
                animate={{ scaleY: [1, 1.04, 1], boxShadow: ["0 0 15px rgba(255,165,0,0.4)", "0 0 25px rgba(255,165,0,0.7)", "0 0 15px rgba(255,165,0,0.4)"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              ></motion.div>

              {currentContent.pujaSteps.map((item, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-center mb-16 sm:mb-20 ${index % 2 === 0 ? "flex-row-reverse text-right" : "flex-row text-left"}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 150 : -150, y: 30 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 1.2, delay: index * 0.6, ease: "easeOut" }}
                >
                  <div className="w-1/2 px-2 sm:px-10 z-10">
                    <motion.h3
                      className="text-xl sm:text-2xl font-semibold text-orange-800 drop-shadow-lg tracking-wide"
                      whileHover={{ color: "#f97316", scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.step}
                    </motion.h3>
                    <p className="text-gray-700 text-sm sm:text-base mt-2 font-light italic leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="relative flex items-center justify-center z-10">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${item.color} text-white flex items-center justify-center text-2xl sm:text-3xl shadow-xl`}
                    >
                      {item.icon}
                    </div>
                  </div>

                  <div className="w-1/2"></div>

                  <motion.div
                    className={`absolute top-1/2 transform -translate-y-1/2 h-0.5 bg-gradient-to-r ${index % 2 === 0 ? "from-transparent to-orange-400" : "from-orange-400 to-transparent"}`}
                    style={{ width: "calc(50% - 90px)", [index % 2 === 0 ? "right" : "left"]: "50%" }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 0.7, scaleX: 1 }}
                    transition={{ duration: 1.2, delay: index * 0.6 + 0.3 }}
                  ></motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-24 relative z-10">
        <motion.h2
          className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-800 text-center mb-12 sm:mb-16 drop-shadow-xl tracking-wide"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {currentContent.whyChoose}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
          {currentContent.features.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-orange-200/50 hover:shadow-2xl transition-all duration-600 relative overflow-hidden"
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: index * 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.div
                className="text-4xl sm:text-5xl mb-5 sm:mb-6 text-orange-600"
                whileHover={{ scale: 1.15, rotate: 15 }}
                transition={{ duration: 0.4 }}
              >
                {item.icon}
              </motion.div>
              <h3 className="text-lg sm:text-xl font-semibold text-orange-800 mb-3 tracking-wide">{item.title}</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{item.desc}</p>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-100/70 to-yellow-100/70 opacity-0 hover:opacity-30 transition-opacity duration-600"
                whileHover={{ opacity: 0.3 }}
              ></motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Footer */}
      <div className="text-center py-16 sm:py-20 relative z-10 bg-gradient-to-t from-orange-50 to-transparent">
        <motion.p
          className="text-gray-700 text-base sm:text-lg font-medium italic max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          "{currentContent.footerQuote}"
        </motion.p>
        <motion.div
          className="mt-4 sm:mt-6 text-orange-700 text-sm sm:text-base font-semibold tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {currentContent.footerAuthor}
        </motion.div>
        <motion.a
          href="/"
          className="mt-6 inline-block bg-gradient-to-r from-orange-600 to-red-500 text-white py-2 px-6 rounded-full text-sm sm:text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          aria-label={currentContent.visitWebsite}
        >
          {currentContent.visitWebsite}
        </motion.a>
      </div>
    </div>
  );
}