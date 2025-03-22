"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FaPhone, FaGem, FaGlobe, FaPray } from "react-icons/fa";
import PanditDescription1 from "./PanditDesc";

export default function KaalSarpDoshPuja() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll({ target: containerRef });
  const yParallax = useTransform(scrollY, [0, 400], [0, -60]);
  const [isHindi, setIsHindi] = useState(false);

  const content = {
    english: {
      title: "Kaal Sarp Dosh Puja in Ujjain",
      freeConsult: "Get Your Free Call Consultation Now!",
      marqueeText: "Free Call Now!",
      subtitle:
        "With the guidance of Kaal Sarp Dosh expert Pandit Deepak Goutam, get free spiritual solutions for a happy and peaceful life.",
      pujaSteps: [
        {
          step: "Sankalp",
          desc: "Begin with a sacred vow to the divine.",
          icon: "🌟",
          color: "from-yellow-400 to-orange-500",
        },
        {
          step: "Hawan",
          desc: "Cleanse energies with a holy fire ritual.",
          icon: "🔥",
          color: "from-orange-500 to-red-500",
        },
        {
          step: "Mantra Jaap",
          desc: "Chant Vedic mantras for blessings.",
          icon: "📿",
          color: "from-red-500 to-purple-500",
        },
        {
          step: "Puja Samapti",
          desc: "Complete with offerings and peace.",
          icon: "🙏",
          color: "from-purple-500 to-orange-400",
        },
      ],
      bookPuja: "Book Your Puja",
      contact: "Call Now - Free",
      visitWebsite: "Visit Website",
      whyChoose: "Why Choose Pandit Deepak Goutam?",
      features: [
        {
          title: "Vedic Mastery",
          desc: "Deep knowledge of ancient rituals and scriptures.",
          icon: "🕉️",
        },
        {
          title: "Sacred Ujjain",
          desc: "Performed at the divine Mahakaleshwar ghats.",
          icon: "🙏",
        },
        {
          title: "Personalized Puja",
          desc: "Tailored rituals for your specific needs.",
          icon: "✨",
        },
      ],
      footerQuote:
        "Step into a sacred journey of trust and devotion. Your spiritual peace is our sacred duty.",
      footerAuthor: "- Pandit Deepak Goutam",
    },
    hindi: {
      title: "उज्जैन में काल सर्प दोष पूजा",
      freeConsult: "अभी अपनी मुफ्त कॉल परामर्श प्राप्त करें!",
      marqueeText: "मुफ्त कॉल!",
      subtitle:
        "काल सर्प दोष विशेषज्ञ पंडित दीपक गौतम की guidance में, खुशहाल और शांतिपूर्ण जीवन के लिए मुफ्त आध्यात्मिक समाधान पाएं।",
      pujaSteps: [
        {
          step: "संकल्प",
          desc: "दिव्य के प्रति पवित्र संकल्प के साथ शुरुआत।",
          icon: "🌟",
          color: "from-yellow-400 to-orange-500",
        },
        {
          step: "हवन",
          desc: "पवित्र अग्नि अनुष्ठान से ऊर्जा शुद्धिकरण।",
          icon: "🔥",
          color: "from-orange-500 to-red-500",
        },
        {
          step: "मंत्र जाप",
          desc: "आशीर्वाद के लिए वैदिक मंत्रों का जाप।",
          icon: "📿",
          color: "from-red-500 to-purple-500",
        },
        {
          step: "पूजा समाप्ति",
          desc: "प्रसाद और शांति के साथ समापन।",
          icon: "🙏",
          color: "from-purple-500 to-orange-400",
        },
      ],
      bookPuja: "अपनी पूजा बुक करें",
      contact: "अभी कॉल करें - मुफ्त",
      visitWebsite: "वेबसाइट देखें",
      whyChoose: "पंडित दीपक गौतम को क्यों चुनें?",
      features: [
        {
          title: "वैदिक विशेषज्ञता",
          desc: "प्राचीन अनुष्ठानों और शास्त्रों का गहन ज्ञान।",
          icon: "🕉️",
        },
        {
          title: "पवित्र उज्जैन",
          desc: "महाकालेश्वर घाटों पर संपन्न।",
          icon: "🙏",
        },
        {
          title: "वैयक्तिकृत पूजा",
          desc: "आपकी विशिष्ट आवश्यकताओं के लिए अनुकूलित अनुष्ठान।",
          icon: "✨",
        },
      ],
      footerQuote:
        "विश्वास और भक्ति की पवित्र यात्रा में कदम रखें। आपकी आध्यात्मिक शांति हमारा पवित्र कर्तव्य है।",
      footerAuthor: "- पंडित दीपक गौतम",
    },
  };

  const currentContent = isHindi ? content.hindi : content.english;

  useEffect(() => {
    const createParticle = () => {
      const container = document.querySelector(".particle-container");
      if (container?.childElementCount > 30) return;
      const particle = document.createElement("div");
      particle.className =
        "absolute rounded-full bg-gradient-to-r from-orange-300 to-yellow-300 opacity-40";
      const size = Math.random() * 8 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      container?.appendChild(particle);

      setTimeout(() => particle.remove(), 6000);
    };

    const interval = setInterval(createParticle, window.innerWidth < 768 ? 800 : 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="via-yellow-50 relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 to-white font-sans"
    >
      {/* Language Toggle Button */}
      <motion.div
        className="fixed right-4 top-4 z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <button
          onClick={() => setIsHindi(!isHindi)}
          className="flex items-center gap-2 rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-orange-700 sm:text-base"
          aria-label={isHindi ? "Switch to English" : "Switch to Hindi"}
        >
          <FaGlobe /> {isHindi ? "English" : "हिन्दी"}
        </button>
      </motion.div>

      {/* Background with Particles */}
      <div className="particle-container absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-[url('/background.webp')] bg-repeat opacity-15"
          animate={{ opacity: [0.15, 0.2, 0.15] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-16 sm:px-6 lg:px-12">
        <div className="relative z-10 mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-orange-200/50 bg-white p-6 text-center shadow-2xl sm:p-8 lg:p-12">
          <motion.div
            className="via-yellow-50/50 absolute inset-0 rounded-3xl bg-gradient-to-tr from-orange-100/70 to-transparent opacity-30"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <motion.h3
            className="mb-2 flex items-center justify-center gap-1 whitespace-nowrap text-sm font-semibold tracking-wide text-orange-700 sm:mb-3 sm:gap-2 sm:text-lg md:mb-4 md:text-xl lg:text-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <FaPhone /> {currentContent.freeConsult}
          </motion.h3>

          <motion.h1
            className="relative z-10 mb-6 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 drop-shadow-xl sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {isHindi ? (
              <>
                <span> काल सर्प दोष</span> पूजा{" "}
                <span className="text-orange-700">उज्जैन</span> में
              </>
            ) : (
              <>
                Kaal Sarp Dosh Puja in{" "}
                <span className="text-orange-700">Ujjain</span>
              </>
            )}
          </motion.h1>

          <motion.p
            className="relative z-10 mx-auto mb-8 max-w-3xl text-base font-medium leading-relaxed text-gray-700 sm:text-lg md:text-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          >
            {currentContent.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <div className="relative z-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <motion.a
            href="tel:+91-9153164444"
            className="flex w-full max-w-xs items-center justify-center gap-1 rounded-full bg-gradient-to-r from-orange-600 to-red-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-xl sm:w-auto sm:gap-2A sm:px-6 sm:py-3 sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={currentContent.contact}
            onClick={async () => {
            try {
            const clickData = {
            timestamp: new Date().toISOString(),
            button: "Call Now",
            };

            // ✅ Push to Google Tag Manager
            if (window.dataLayer) {
            window.dataLayer.push({
            event: "call_now_clicked",
            button_text: "Call Now",
            });
            }

            // ✅ Also track it in your backend (optional)
            const response = await fetch("/api/click", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(clickData),
            });

            if (!response.ok) {
            throw new Error("Failed to track click");
            }
            } catch (error) {
            console.error("Tracking failed:", error);
            }
            }}
            >
            <FaPhone /> {currentContent.contact}
            </motion.a>

          </div>

          {/* Marquee */}
          <div className="mt-6 overflow-hidden">
            <motion.div
              className="flex whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 10, ease: "linear", repeat: Infinity }}
            >
              {Array(2)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <span
                          key={index}
                          className="mx-4 flex items-center gap-2 text-sm font-semibold text-orange-600 sm:text-base"
                        >
                          <FaPhone /> {currentContent.marqueeText}
                        </span>
                      ))}
                  </div>
                ))}
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="mt-8">
            <PanditDescription1 isHindi={isHindi} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-12">
        <motion.h2
          className="mb-6 flex items-center justify-center gap-1 whitespace-nowrap text-center text-xl font-bold tracking-wide text-gray-800 drop-shadow-md sm:mb-8 sm:gap-2 sm:text-2xl md:mb-12 md:text-3xl lg:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <FaGem /> {currentContent.whyChoose}
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-2 lg:grid-cols-3">
          {currentContent.features.map((item, index) => (
            <motion.div
              key={index}
              className="duration-600 relative overflow-hidden rounded-2xl border border-orange-200/50 bg-white p-6 shadow-xl transition-all hover:shadow-2xl"
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: index * 0.4,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              <motion.div
                className="mb-4 text-4xl text-orange-600"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.4 }}
              >
                {item.icon}
              </motion.div>
              <h3 className="mb-2 text-lg font-semibold tracking-wide text-orange-800">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-t from-orange-50 to-transparent py-16 text-center">
        <motion.p
          className="mx-auto max-w-2xl text-base font-medium italic leading-relaxed text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          &quot;{currentContent.footerQuote}&quot;
        </motion.p>
        <motion.div
          className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold tracking-wide text-orange-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <FaPray /> {currentContent.footerAuthor}
        </motion.div>
        <motion.a
          href="/"
          className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-orange-600 to-red-500 px-6 py-2 text-sm font-semibold text-white shadow-xl transition-all duration-500 hover:shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          aria-label={currentContent.visitWebsite}
        >
          <FaGlobe /> {currentContent.visitWebsite}
        </motion.a>
      </footer>
    </div>
  );
}
