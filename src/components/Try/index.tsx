"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const zodiacSigns = [
  { name: "ARIES", src: "https://storage.googleapis.com/a1aa/image/Bv76HNlgd9L7UeDoDuJ8OuVAMCYfh2-Om3GEeMMviv4.jpg" },
  { name: "TAURUS", src: "https://storage.googleapis.com/a1aa/image/LTrjEyip6W8uJ7x0AmFNjlru57rWqw10KEO8R5o_zlw.jpg" },
  { name: "GEMINI", src: "https://storage.googleapis.com/a1aa/image/5tnFUtxyet0FyHgUEb0mpPfM2ZzOEo2_tByTDqz3yB4.jpg" },
  { name: "CANCER", src: "https://storage.googleapis.com/a1aa/image/56kTZaLtN-JgH6FS79GhC-WYWwhxXBBrhNSPUwkVioA.jpg" },
  { name: "LEO", src: "https://storage.googleapis.com/a1aa/image/F5VheqhRGb4eFitxTttiutJyUcJ_F_9dZO4ao0ZGAUU.jpg" },
  { name: "VIRGO", src: "https://storage.googleapis.com/a1aa/image/UiCMDCpeEQNztrg8wYZEZpYiKMoIt_r7PMqQGybc-As.jpg" },
  { name: "LIBRA", src: "https://storage.googleapis.com/a1aa/image/QSEJtctZduSvAuMg9z_8ZO9YbGM1X2oZcbUUiifQviE.jpg" },
  { name: "SCORPIO", src: "https://storage.googleapis.com/a1aa/image/FWqoHumqmg7Ha6MHkCPSctqlxOvha5mXISWEfmAGJx0.jpg" },
  { name: "SAGITTARIUS", src: "https://storage.googleapis.com/a1aa/image/gHXo6lIdKWT_oKMIupaupTHpMWUSwTtOBygHiiEXyn8.jpg" },
  { name: "CAPRICORN", src: "https://storage.googleapis.com/a1aa/image/dfDr3XKUhzjdiXS_sh0CfNfv2YiW30nCrCTPzsDIeyM.jpg" },
  { name: "AQUARIUS", src: "https://storage.googleapis.com/a1aa/image/ocQO1KkdCKYa_n-BgHrDfuzlqEliJ5gV9eTIoRHlbcY.jpg" },
  { name: "PISCES", src: "https://storage.googleapis.com/a1aa/image/Wxx-cfZ2T9D_8mUAm7sD8dVxVtYIoo2jFrASBTzERrA.jpg" }
];

export default function ZodiacSigns() {
  const router = useRouter(); // Router hook to handle navigation

  return (
    <div className="bg-white flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full">
        <h1 className="text-3xl font-bold text-center text-red-800 mb-4">
          Know What Your Zodiac Sign Says About You
        </h1>
        <p className="text-center text-red-800 mb-8">
          Click on the Rashi to know about your Personality, Traits, Life Predictions, and Remedies!
        </p>
        
        {/* Grid Layout with 6 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {zodiacSigns.map((sign) => (
            <div
              key={sign.name}
              className="text-center cursor-pointer hover:scale-105 transition"
              onClick={() => router.push(`/try/[sign]${sign.name.toLowerCase()}`)} // Navigate to dynamic page
            >
              <Image 
                src={sign.src} 
                alt={`${sign.name} zodiac sign`} 
                width={100} 
                height={100} 
                className="mx-auto mb-2"
              />
              <p className="text-red-800 font-bold">{sign.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
