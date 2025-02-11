import { Services } from "@/types/services";
import Image from "next/image";
import Link from "next/link";

const SingleServices = ({ services }: { services: Services }) => {
  const { id, title, image, paragraph } = services;

  return (
    <div className="group relative overflow-hidden rounded-md bg-white shadow-one duration-300 hover:shadow-two mb-8">
      
      {/* Image Link */}
      <Link href={`/services/${id}`} className="relative block w-full">
        <div className="relative w-full h-[200px] md:h-[250px] lg:h-[280px] overflow-hidden">
          <Image
            src={image}
            alt="image"
            width={500}
            height={300}
            priority
            className="rounded-md object-cover"
          />
        </div>
      </Link>

      <div className="p-4">
        {/* Title Link */}
        <h3 className="mb-4 block text-xl font-bold text-black hover:text sm:text-2xl">
          <Link href={`/services/${id}`}>{title}</Link>
        </h3>

        {/* Paragraph */}
        <p className="no-underline mb-6 border-b text-justify border-body-color border-opacity-10 pb-6 font-medium text-body-color-black">
          <Link href={`/services/${id}`} className="">{paragraph}</Link>
        </p>

        {/* Buttons - View More & Book Now */}
        <div className="flex justify-between items-center mt-4">
          <Link href={`/services/${id}`} className="text-[#d55f26] font-semibold hover:underline">
          और देखें
          </Link>
          <a
            href="https://wa.me/919876543210" // Yaha apna WhatsApp number dal dena
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#d55f26] text-white px-4 py-2 rounded-lg shadow-md font-semibold flex items-center gap-2 hover:scale-105 hover:shadow-lg transition duration-300"
          >
            {/* 📲  */}अभी बुक करें
          </a>
        </div>
      </div>
    </div>
  );
};

export default SingleServices;
