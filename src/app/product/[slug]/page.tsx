"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ShoppingCart, Heart } from "lucide-react";
import productDetailsData from "@/data/product/product.json";
import { Product } from "@/types/product";
import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";
import ProductInfo from "@/components/Product/ProductInfo";
import CheckoutForm from "@/components/Product/CheckoutForm";
import React from "react";
import ReviewSection from "@/components/Product/ReviewSection";
import { generateSlug } from "@/lib/utils";
import { addToCart } from "@/lib/cartUtils";
import { useCart } from "@/lib/CartContext";
import { toast } from "react-hot-toast";

export default function ProductDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const params = React.use(paramsPromise);
  const { openCart } = useCart();
  const product = productDetailsData.find(
    (p) => (p.slug || generateSlug(p.name)) === params.slug,
  ) as Product | undefined;

  const images = [
    "/images/product/c-1.png",
    "/images/product/c-2.png",
    "/images/product/c-3.png",
    "/images/product/c-4.png",
  ];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("Good Quality");
  const [isInCart, setIsInCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [priceAdjustment, setPriceAdjustment] = useState(0);

  // Quality toggle state for 1-14 Mukhi Rudraksha
  const isMukhiRudraksha =
    product?.category === "1 to 14 Mukhi Rudraksha" ||
    (product?.faces && product.faces >= 1 && product.faces <= 14);
  const [qualityType, setQualityType] =
    useState<"nepali" | "indonesian">("indonesian");

  // Explicit Indonesian prices for 1-14 Mukhi products (by product id)
  const INDONESIAN_PRICES: Record<number, number> = {
    13: 2300, // 1 Mukhi
    14: 700, // 2 Mukhi
    15: 900, // 3 Mukhi
    16: 1200, // 4 Mukhi
    17: 550, // 5 Mukhi
    18: 1200, // 6 Mukhi
    19: 1600, // 7 Mukhi
    20: 3500, // 8 Mukhi
    21: 6000, // 9 Mukhi
    22: 8500, // 10 Mukhi
    23: 9500, // 11 Mukhi
    24: 10000, // 12 Mukhi
    25: 17000, // 13 Mukhi
    // 26 (14 Mukhi) – uses fallback calculation (50% of Nepali) until confirmed
  };

  // Calculate price based on quality
  const getPriceForQuality = (price: number) => {
    if (isMukhiRudraksha && qualityType === "indonesian") {
      const id = product?.id ?? -1;
      const indonesianPrice = INDONESIAN_PRICES[id];
      if (indonesianPrice !== undefined) {
        return indonesianPrice;
      }
      // Fallback: 50% of Nepali price for products without explicit Indonesian price
      return Math.round(price / 2);
    }
    return price;
  };

  const currentPrice = getPriceForQuality(product?.price || 0);
  const currentOriginalPrice = getPriceForQuality(product?.originalPrice || 0);

  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-offwhite flex min-h-screen items-center justify-center"
      >
        <p className="animate-pulse text-xl text-red-500">
          Divine connection lost - Product not found!
        </p>
      </motion.div>
    );
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const finalPrice = isMukhiRudraksha ? currentPrice : (product.price + priceAdjustment);
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: finalPrice,
      image: product.image,
      qualityType: isMukhiRudraksha ? qualityType : undefined,
      selectedSize: selectedSize,
      // quantity: quantity, // Include quantity
    });
    setIsInCart(true); // Update cart state
    openCart();
    const qualityText = isMukhiRudraksha ? ` (${qualityType.charAt(0).toUpperCase() + qualityType.slice(1)})` : "";
    toast.success(`${product.name}${qualityText} added to cart!`, { position: "top-right" });
  };

  const handleBuyNow = () => {
    setIsCheckoutOpen(true);
    const finalPrice = isMukhiRudraksha ? currentPrice : (product.price + priceAdjustment);
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: finalPrice,
      image: product.image,
      qualityType: isMukhiRudraksha ? qualityType : undefined,
      selectedSize: selectedSize,
      // quantity: quantity, // Include quantity
    });
    setIsInCart(true); // Update cart state
    openCart();
    const qualityText = isMukhiRudraksha ? ` (${qualityType.charAt(0).toUpperCase() + qualityType.slice(1)})` : "";
    toast.success(`${product.name}${qualityText} added to cart!`, { position: "top-right" });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    offers: {
      "@type": "Offer",
      price: isMukhiRudraksha ? currentPrice : (product.price + priceAdjustment),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews?.length || "0",
    },
  };

  const getRashiColor = (rashi: string) => {
    const rashiColors: { [key: string]: string } = {
      Mesh: "#FF6B6B",
      Vrishabha: "#4ECDC4",
      Mithun: "#45B7D1",
      Kanya: "#D4A5A5",
      Singh: "#FFEEAD",
    };
    return rashiColors[rashi] || "#d4a017";
  };

  const relatedProducts = productDetailsData
    .filter((p) => product.relatedIds?.includes(p.id))
    .slice(0, 4);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted
        ? "Removed from wishlist"
        : `${product.name} added to wishlist!`,
      { position: "top-right" },
    );
  };

  const handleQualitySelection = (quality: string) => {
    setSelectedSize(quality);
    if (quality === "Normal Quality") {
      setPriceAdjustment(400);
    } else {
      setPriceAdjustment(0);
    }
  };
  
  const handleQualityToggle = (quality: "nepali" | "indonesian") => {
    setQualityType(quality);
  };

  return (
    <>
      <Head>
        <title>{`${product.name} - Deepak GoutamPanditji`}</title>
        <meta
          name="description"
          content={`Buy ${product.name} at Deepak GoutamPanditji's store.`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-white py-12"
      >
        <div className="container mx-auto mt-10 px-3">
          <div className="mb-6 flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-saffron transition-colors">
              Home
            </Link>
            <ArrowRight size={14} />
            <Link
              href="/product"
              className="hover:text-saffron transition-colors"
            >
              Store
            </Link>
            <ArrowRight size={14} />
            <span className="text-maroon">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="overflow-hidden rounded-lg shadow-lg"
              >
                <div className="relative h-[300px] w-full max-w-full md:h-[500px]">
                  <Image
                    src={selectedImage || product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="absolute inset-0 h-full w-full rounded-lg object-cover transition-transform duration-300"
                  />
                  <div className="absolute right-2 top-2 flex flex-col space-y-2">
                    {images.map((img, idx) => (
                      <Image
                        key={idx}
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        width={60}
                        height={60}
                        className="h-[60px] w-[60px] object-cover"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
              {product.images && product.images.length > 0 && (
                <div className="mt-4 flex space-x-2">
                  {product.images.map((img, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setSelectedImage(img)}
                      className="cursor-pointer"
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        width={80}
                        height={80}
                        className="rounded-md transition-opacity hover:opacity-75"
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h1 className="text-maroon text-3xl font-bold md:text-4xl">
                    {product.name}
                  </h1>
                  {product.discount > 0 && (
                    <span className="rounded bg-orange-500 px-3 py-1 text-sm font-bold text-white">
                      Sale!
                    </span>
                  )}
                </div>
                <div className="mb-4 flex items-center">
                  <span className="text-yellow-500 flex">
                    {Array.from(
                      { length: Math.floor(product.rating) },
                      (_, i) => (
                        <Star
                          key={i}
                          size={20}
                          fill="gold"
                          className="text-yellow-500"
                        />
                      ),
                    )}
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-gold text-2xl font-bold">
                    ₹{isMukhiRudraksha ? currentPrice.toFixed(2) : (product.price + priceAdjustment).toFixed(2)}
                  </span>
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    ₹{isMukhiRudraksha ? currentOriginalPrice.toFixed(2) : (product.originalPrice + priceAdjustment).toFixed(2)}
                  </span>
                  {product.discount > 0 && !isMukhiRudraksha && (
                    <span className="ml-3 rounded-xl bg-green-700 p-2 text-white">
                      {product.discount}% off
                    </span>
                  )}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-saffron/10 border-saffron-200 mb-6 rounded-lg border p-4"
                >
                  <p className="text-maroon flex items-center text-sm">
                    <Star size={16} className="mr-2 flex-shrink-0" />
                    Blessed by Pandit Ji for prosperity and spiritual growth
                  </p>
                </motion.div>
                {isMukhiRudraksha && (
                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Quality
                    </label>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQualityToggle("nepali")}
                        className={`flex-1 rounded-md border px-4 py-2 transition-all duration-300 ${
                          qualityType === "nepali"
                            ? "border-[#800000] bg-[#800000] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Nepali
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQualityToggle("indonesian")}
                        className={`flex-1 rounded-md border px-4 py-2 transition-all duration-300 ${
                          qualityType === "indonesian"
                            ? "border-[#800000] bg-[#800000] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Indonesian
                      </motion.button>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      Origin: <span className="font-semibold capitalize">{qualityType}</span>
                    </p>
                  </div>
                )}
                {!isMukhiRudraksha && (
                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Select Quality
                    </label>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQualitySelection("Good Quality")}
                        className={`flex-1 rounded-md border px-4 py-2 transition-all duration-300 ${
                          selectedSize === "Good Quality"
                            ? "border-[#800000] bg-[#800000] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Good Quality
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQualitySelection("Normal Quality")}
                        className={`flex-1 rounded-md border px-4 py-2 transition-all duration-300 ${
                          selectedSize === "Normal Quality"
                            ? "border-[#800000] bg-[#800000] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Normal Quality
                      </motion.button>
                    </div>
                  </div>
                )}
                <div className="mb-4">
  <label className="mb-1 block text-sm font-medium text-gray-700">
    Quantity
  </label>
  <input
    type="number"
    min="1"
    value={quantity}
    onChange={(e) =>
      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
    }
    className="w-16 rounded-md border p-2"
  />
</div>
                <div className="mb-6 flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    className="rounded-md bg-green-600 px-6 py-3 text-white transition-all duration-300 hover:bg-green-700"
                    // aria-label={`Buy ${product.name} now`}
                  >
                    Buy Now
                  </motion.button>

                  <button
                    onClick={handleAddToCart}
                    className="rounded-md bg-[#800000] px-6 py-3 text-white transition-all duration-300 hover:bg-[#FF9933]"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    Add to Cart
                  </button>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 rounded-lg bg-gray-100 p-4"
                >
                  <h3 className="text-maroon mb-2 text-lg font-semibold">
                    Shipping & Payment Info
                  </h3>
                  <ul className="list-inside list-disc space-y-1 text-gray-600">
                    <li>All Bharat shipping on all orders</li>
                    <li>Shipping: Express Delivery all over Bharat</li>
                    <li>
                      Free Shipping: Above ₹999/- + Free Rudraksha Fruit within
                      Bharat on Prepaid
                    </li>
                    <li>COD: Available on Nominal Charges</li>
                    <li>Returns: 3 Days Easy Returns Policy*</li>
                    <li>
                      Dispatch: Order Yours Before 11:30am For Same Day Dispatch
                    </li>
                    <li>Standard Delivery Timelines: 5 to 7 Working Days</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
          <ProductInfo product={product} />
          <ReviewSection />
          {relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <h2 className="text-maroon mb-6 text-2xl font-bold">
                Related Products
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/product/${
                      relatedProduct.slug || generateSlug(relatedProduct.name)
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
                    >
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        width={300}
                        height={200}
                        className="h-40 w-full object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-maroon text-lg font-semibold">
                          {relatedProduct.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {relatedProduct.rashi}
                        </p>
                        <div className="mt-2">
                          <span className="text-gold font-bold">
                            ₹{relatedProduct.price.toFixed(2)}
                          </span>
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ₹{relatedProduct.originalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.section>

      <CheckoutForm
        product={product}
        quantity={quantity}
        selectedQuality={selectedSize}
        priceAdjustment={priceAdjustment}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
}