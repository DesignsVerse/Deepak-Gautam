import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section id="home" className="relative z-10 overflow-hidden pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-hero.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      {/* Overlay for Blurred Effect */}
      <div className="absolute inset-0 bg-black/10 z-5"></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* White Background Box Covering Both Text and Image */}
        <div className="w-full bg-white/80 p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center md:items-start gap-10">
          
          {/* Left Side - Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 mt-20 text-black leading-tight">
              माँ बगलामुखी मंदिर में पूजा बुक करें
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-700 leading-relaxed">
              माता बगलामुखी के दिव्य आशीर्वाद और आध्यात्मिक शांति का अनुभव करें।
              सुरक्षा और सफलता के लिए अपनी पूजा आज ही बुक करें।
            </p>
            <Link
              href="tel:+919413466075"
              className="px-8 py-3 border-2 border-black text-black rounded-full text-lg font-semibold hover:bg-black hover:text-white transition duration-300"
            >
              📞 अभी संपर्क करें
            </Link>
          </div>

          {/* Right Side - Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <Image
              alt="माँ बगलामुखी की दिव्य प्रतिमा"
              height={450}
              width={450}
              className="rounded-2xl shadow-xl object-cover transform hover:scale-105 transition duration-500"
              src="/images/hero/Maabaglamukhi1.jpeg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
