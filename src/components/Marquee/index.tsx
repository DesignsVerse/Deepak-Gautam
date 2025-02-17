"use client"; // Next.js Client Component

import Marquee from "react-fast-marquee";
import Image from "next/image";

const astrologySymbols = [
  { name: "Om Symbol", image: "/images/m/1.png" },
  { name: "Swastik", image: "/images/m/2.png" },
  { name: "Kalash", image: "/images/m/3.png" },
  { name: "Pandit Ji", image: "/images/m/4.png" },
  { name: "Rudraksha", image: "/images/m/5.png" },
  { name: "Yantra", image: "/images/m/6.png" },
  { name: "Trishul", image: "/images/m/7.png" },
  { name: "Shankh", image: "/images/m/8.png" },
  { name: "Deepak", image: "/images/m/9.png" },
  { name: "Mala", image: "/images/m/10.png" },
];

const CallNow = () => {
  return (
    <section className="w-full mt-5 h-48 overflow-hidden">
      <div className="bg-white overflow-hidden border-gray-300 p-4">
        <Marquee
          gradient={false} // Shadow effect hata diya
          speed={50}
          pauseOnHover={true}
          direction="left"
          className="text-xl md:text-2xl font-semibold text-black py-4 tracking-wider custom-marquee"
        >
          {astrologySymbols.map((symbol, index) => (
            <span key={index} className="mx-16 flex items-center gap-20">
              <div className="w-[100px] h-[100px] flex items-center justify-center overflow-hidden bg-white">
                <Image
                  src={symbol.image}
                  alt={symbol.name}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default CallNow;
