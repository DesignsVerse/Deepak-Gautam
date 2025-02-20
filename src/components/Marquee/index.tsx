"use client"; // Next.js Client Component

import Head from "next/head";
import Marquee from "react-fast-marquee";
import Image from "next/image";

const astrologySymbols = [
  { name: "Kalash  - Divine Symbol", image: "/images/Marquee/1.png" },
  { name: "Namaste Hands - Sign of Respect", image: "/images/Marquee/2.png" },
  { name: "Puja Thali - Sacred Offering", image: "/images/Marquee/3.png" },
  { name: "Deepak - Eternal Light", image: "/images/Marquee/5.png" },
  { name: "Ganesha Ji - Remover of Obstacles", image: "/images/Marquee/6.png" },
  { name: "Om Symbol - Sacred Mantra", image: "/images/Marquee/7.png" },
  { name: "Kalash  - Divine Symbol", image: "/images/Marquee/4.png" },
  { name: "Lal Kitab - Book of Secret", image: "/images/Marquee/8.png" },
  { name: "Lotus - Purity & Enlightenment", image: "/images/Marquee/9.png" },
  { name: "Mala - Rosary for Meditation", image: "/images/Marquee/10.png" },
];

const AutoScroll = () => {
  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Head>
        <title>Powerful Hindu Astrology Symbols & Their Meanings</title>
        <meta
          name="description"
          content="Explore sacred Hindu astrology symbols like Om, Swastik, Kalash, Rudraksha, and Yantra. Learn their spiritual significance and connect with divine energy."
        />
        <meta
          name="keywords"
          content="Astrology Symbols, Hindu Spiritual Symbols, Om Symbol, Rudraksha, Swastik, Yantra, Trishul, Pandit Ji, Hinduism"
        />
        <meta name="author" content="Your Website Name" />
        <meta property="og:title" content="Powerful Hindu Astrology Symbols & Their Meanings" />
        <meta
          property="og:description"
          content="Discover the sacred meanings behind Hindu astrology symbols like Om, Swastik, Rudraksha, and more."
        />
        <meta property="og:image" content="/images/m/1.png" />
        <meta property="og:type" content="website" />
      </Head>

      <section className="w-full mt-5 h-48 overflow-hidden">
        <div className="bg-white overflow-hidden border-gray-300 p-4">
          <Marquee
            gradient={false}
            speed={50}
            pauseOnHover={true}
            direction="left"
            className="text-xl md:text-2xl font-semibold text-black py-4 tracking-wider"
          >
            {astrologySymbols.map((symbol, index) => (
              <div key={index} className="mx-16 flex flex-col items-center gap-3">
                <div className="w-[100px] h-[100px] flex items-center justify-center overflow-hidden bg-white">
                  <Image
                    src={symbol.image}
                    alt={symbol.name}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">{symbol.name}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </section>
    </>
  );
};

export default AutoScroll;
