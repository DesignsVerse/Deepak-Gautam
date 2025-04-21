"use client";

import Image from "next/image";

const PyramidCircles: React.FC = () => {
  return (
    <div className="relative pt-20  flex bg-[#A24949] flex-col items-center justify-center pb-60 shadow-lg">
      {/* Pyramid Circles - Mobile View */}
      <div className="relative z-10 flex flex-col items-center gap- md:hidden">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-[#800000] rounded-full flex items-center justify-center shadow-lg text-white">
            1️⃣
          </div>
        </div>

        <div className="flex gap-">
          <div className="w-16 h-16 bg-[#800000] rounded-full flex items-center justify-center shadow-lg text-white">
            2️⃣
          </div>
          <div className="w-16 h-16 bg-[#800000] rounded-full flex items-center justify-center shadow-lg text-white">
            2️⃣
          </div>
        </div>

        <div className="flex gap-">
          <div className="w-16 h-16 bg-[#800000] rounded-full flex items-center justify-center shadow-lg text-white">
            3️⃣
          </div>
          <div className="w-16 h-16 bg-[#800000] rounded-full flex items-center justify-center shadow-lg text-white">
            3️⃣
          </div>
          <div className="w-16 h-16 bg-[#800000] rounded-full flex items-center justify-center shadow-lg text-white">
            3️⃣
          </div>
        </div>
        <div className="flex gap-">
          <div className="w-16 h-16 bg-[#800000] rounded-full flex items-center justify-center shadow-lg text-white">
            3️⃣
          </div>
          <div className="w-16 h-16 bg-[#800000] rounded-full flex items-center justify-center shadow-lg text-white">
            3️⃣
          </div>
          <div className="w-16 h-16 bg-[#800000] rounded-full flex items-center justify-center shadow-lg text-white">
            3️⃣
          </div>
          <div className="w-16 h-16 bg-[#800000] rounded-full flex items-center justify-center shadow-lg text-white">
            3️⃣
          </div>
        </div>
      </div>

      {/* Desktop View - Single Line Circles */}
      <div className="relative z-10 hidden md:flex gap- justify-center">
        <div className="w-16 h-16 bg-[#800000] rounded-full flex items-center justify-center shadow-lg text-white">
          1️⃣
        </div>
        <div className="w-16 h-16 bg-[#800000] rounded-full flex items-center justify-center shadow-lg text-white">
          2️⃣
        </div>
        <div className="w-16 h-16 bg-[#800000] rounded-full flex items-center justify-center shadow-lg text-white">
          2️⃣
        </div>
        <div className="w-16 h-16 bg-[#800000] rounded-full flex items-center justify-center shadow-lg text-white">
          3️⃣
        </div>
        <div className="w-16 h-16 bg-[#800000] rounded-full flex items-center justify-center shadow-lg text-white">
          3️⃣
        </div>
        <div className="w-16 h-16 bg-[#800000] rounded-full flex items-center justify-center shadow-lg text-white">
          3️⃣
        </div>
      </div>

      {/* Empty Thali - Positioned Behind Circles */}
      <div className="absolute top-28 w-full flex justify-center z-0">
        <Image
          src="/thali.png"
          alt="Empty Thali"
          width={360}
          height={100}
        />
      </div>
    </div>
  );
};

export default PyramidCircles;
