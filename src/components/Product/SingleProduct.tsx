import Image from "next/image";
import Link from "next/link";
import productDetailsData from "@/data/product/product-details.json";
import { Product } from "@/types/product";
import { Star } from "lucide-react";


const SingleProduct = ({ id }: { id: string }) => {
  const product = productDetailsData.find((p) => p.id.toString() === id) as Product | undefined;

  if (!product) {
    return (
      <p className="text-red-500 text-center animate-pulse font-medium">
        Product not found!
      </p>
    );
  }

  const getRashiColor = (rashi: string) => {
    const rashiColors: { [key: string]: string } = {
      Vrishabha: "#4ECDC4",
      Mesh: "#FF6B6B",
      Mithun: "#45B7D1",
      Kanya: "#D4A5A5",
      Singh: "#FFEEAD",
    };
    return rashiColors[rashi] || "#d4a017";
  };

  // Mock rating and reviews (you can replace this with actual data from your JSON)
  const rating = 5; // Assuming 5 stars for this example
  const reviews = 3; // Assuming 3 reviews

  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 relative">
      {/* Product Image with Background */}
      <div className="relative">
        <Link href={`/product/${product.id}`} className="block" aria-label={`View details for ${product.name}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={220}
            height={220}
            className="w-full h-40 object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+/ahAQI8BwkL5E2bAAAAAElFTkSuQmCC"
          />
          
        </Link>

        {/* Discount Badge */}
        {product.discount > 0 && (
          <span
            className="absolute top-2 left-2 bg-green-700 text-white px-2 py-1 rounded-full text-xs font-bold "
          >
            {product.discount}% off
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 text-center">
        <h3 className=" text-sm md:text-base font-semibold text-gray-800 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating and Reviews */}
        <div className="flex justify-center items-center mt-2 text-yellow-500">
        <span className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < product.rating ? "gold" : "gray"}
                  className={i < product.rating ? "text-yellow-500" : "text-gray-300"}
                />
              ))}
            </span>
          {/* <span className=" text-[8px] md:text-sm text-gray-600 ml-1">({reviews} Reviews)</span> */}
        </div>

        {/* Pricing */}
        <p className="text-sm text-gray-600 mt-2">
          <span className="line-through text-red-700 mr-2">₹{product.originalPrice.toFixed(2)}</span>
          <span className="text-green-800 font-bold">₹{product.price.toFixed(2)}</span>
        </p>

        {/* Call to Action Button */}
        <Link
          href={`/product/${product.id}`}
          className="mt-3 inline-block w-full bg-[#800000] text-white text-sm font-medium py-2 rounded-md hover:bg-green-600 transition-colors hover:shadow-lg"
        >
          View More
        </Link>
      </div>
    </div>
  );
};

export default SingleProduct;