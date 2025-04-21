// components/Product/SingleProduct.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import productDetailsData from "@/data/product/product.json";
import { Product } from "@/types/product";
import { Star } from "lucide-react";
import { generateSlug } from "@/lib/utils";
import { addToCart } from "@/lib/cartUtils";
import { useCart } from "@/lib/CartContext"; // Import useCart

const SingleProduct = ({ id }: { id: string }) => {
  const { openCart } = useCart(); // Get openCart from context
  const product = productDetailsData.find((p) => p.id.toString() === id) as Product | undefined;

  if (!product) {
    return (
      <p className="text-red-500 text-center animate-pulse font-medium">
        Product not found!
      </p>
    );
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      // quantity:product.quantity,
    });
    openCart(); // Open the cart sidebar
    // Show a toast notification (optional)
    // toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] relative border border-gray-100">
      <div className="relative aspect-square">
        <Link
          href={`/product/${product.slug || generateSlug(product.name)}`}
          className="block"
          aria-label={`View details for ${product.name}`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="w-full h-full object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+/ahAQI8BwkL5E2bAAAAAElFTkSuQmCC"
          />
        </Link>
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-green-700 text-white px-2 py-1 rounded-full text-xs font-bold">
            {product.discount}% off
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm md:text-base font-semibold text-gray-800 line-clamp-2 h-12 flex items-center justify-center">
          {product.name}
        </h3>
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
        </div>
        <p className="text-sm text-gray-600 mt-2 text-center">
          <span className="line-through text-red-700 mr-2">₹{product.originalPrice.toFixed(2)}</span>
          <span className="text-green-800 font-bold">₹{product.price.toFixed(2)}</span>
        </p>
        <div className="flex gap-2 mt-4">
          <Link
            href={`/product/${product.slug || generateSlug(product.name)}`}
            className="flex-1 bg-gray-200 text-gray-800 text-sm font-medium py-2 rounded-md hover:bg-gray-300 transition-colors text-center"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#800000] text-white text-sm font-medium py-2 rounded-md hover:bg-[#FF9933] transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;