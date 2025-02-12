import Image from "next/image";

const ProfileSection = () => {
  return (
    <div className="w-full bg-gradient-to-br from-gray-100 to-gray-50 shadow-lg rounded-xl">
      <div className="p-8">
        <div className="flex flex-col md:flex-row items-center">      
          {/* Image Section */}
          <div className="md:w-1/2 max-w-[550px]">
            <Image
              alt="A man in traditional attire standing in front of a temple"
              className="w-full h-auto rounded-2xl shadow-md border border-gray-300"
              src="/images/panditjiphoto.jpg"
              width={400}  // ✅ Width/Height define kar
              height={400}  // ✅ Ye important hai
              priority // ✅ Faster LCP ke liye
            />
          </div>
          {/* Content Section */}
          <div className="text-gray-800 md:w-1/2 mt-6 md:mt-0 md:ml-10">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900">पंडित नंदकिशोर जोशी</h1>
            <p className="mb-4 text-lg leading-relaxed">
              पंडित नंदकिशोर जोशी जी 2011 से माँ बगलामुखी माता मंदिर, नलखेड़ा में भक्तों की सेवा कर रहे हैं...
            </p>
            <button className="px-8 py-3 bg-[#D55F26] text-white rounded-lg font-semibold shadow-md hover:scale-105 hover:bg-gray-900 transition duration-300">
              📞 संपर्क करें
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
