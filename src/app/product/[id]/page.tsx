// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight, Star, ShoppingCart, Heart } from "lucide-react";
// import productDetailsData from "@/data/product/product-details.json";
// import { Product } from "@/types/product";
// import Head from "next/head";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";
// import ProductInfo from "@/components/E-Commerce/ProductInfo"; // Import the new component

// export default function ProductDetailPage({ params }: { params: { id: string } }) {
//   const product = productDetailsData.find((p) => p.id.toString() === params.id) as Product | undefined;

//   // State for interactivity
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [selectedSize, setSelectedSize] = useState<string>("-20mm Bead");
//   const [isInCart, setIsInCart] = useState(false);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [quantity, setQuantity] = useState(1);

//   if (!product) {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="min-h-screen bg-offwhite flex items-center justify-center"
//       >
//         <p className="text-red-500 text-xl animate-pulse">
//           Divine connection lost - Product not found!
//         </p>
//       </motion.div>
//     );
//   }

//   // Structured Data for SEO
//   const structuredData = {
//     "@context": "https://schema.org",
//     "@type": "Product",
//     name: product.name,
//     image: product.image,
//     description: product.description,
//     offers: {
//       "@type": "Offer",
//       price: product.price,
//       priceCurrency: "INR",
//       availability: "https://schema.org/InStock",
//     },
//     aggregateRating: {
//       "@type": "AggregateRating",
//       ratingValue: product.rating,
//       reviewCount: product.reviews?.length || "0",
//     },
//   };

//   // Rashi-specific color
//   const getRashiColor = (rashi: string) => {
//     const rashiColors: { [key: string]: string } = {
//       Mesh: "#FF6B6B",
//       Vrishabha: "#4ECDC4",
//       Mithun: "#45B7D1",
//       Kanya: "#D4A5A5",
//       Singh: "#FFEEAD",
//     };
//     return rashiColors[rashi] || "#d4a017";
//   };

//   // Related Products
//   const relatedProducts = productDetailsData
//     .filter((p) => product.relatedIds?.includes(p.id))
//     .slice(0, 3);

//   // Handle Add to Cart
//   const handleAddToCart = () => {
//     setIsInCart(true);
//     toast.success(`${quantity} x ${product.name} added to cart!`, { position: "top-right" });
//   };

//   // Handle Wishlist
//   const handleWishlist = () => {
//     setIsWishlisted(!isWishlisted);
//     toast.success(
//       isWishlisted ? "Removed from wishlist" : `${product.name} added to wishlist!`,
//       { position: "top-right" }
//     );
//   };

//   return (
//     <>
//       <Head>
//         <title>{`${product.name} - Deepak Gautam Panditji`}</title>
//         <meta
//           name="description"
//           content={`Buy ${product.name} at Deepak Gautam Panditji's store. Ideal for ${product.rashi} Rashi, this sacred item brings peace and prosperity.`}
//         />
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
//         />
//       </Head>

//       <motion.section
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="min-h-screen bg-white py-12"
//       >
//         <div className="container mx-auto px-3 mt-10">
//           {/* Breadcrumb */}
//           <div className="text-sm text-gray-500 mb-6 flex items-center space-x-2">
//             <Link href="/" className="hover:text-saffron transition-colors">Home</Link>
//             <ArrowRight size={14} />
//             <Link href="/E-commerce" className="hover:text-saffron transition-colors">Store</Link>
//             <ArrowRight size={14} />
//             <span className="text-maroon">{product.name}</span>
//           </div>

//           {/* Main Product Section */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Product Images and Certifications */}
//             <div className="relative">
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 className="overflow-hidden rounded-lg shadow-lg"
//               >
//                 <Image
//                   src={selectedImage || product.image}
//                   alt={product.name}
//                   width={400}
//                   height={400}
//                   className="w-full h-[400px] object-cover transition-transform duration-300"
//                 />
//               </motion.div>
//               <span
//                 className="absolute top-4 left-4 bg-opacity-80 text-white px-3 py-1 rounded-full text-sm animate-fade-in"
//                 style={{ backgroundColor: getRashiColor(product.rashi) }}
//               >
//                 {product.rashi} ✨
//               </span>
//               {product.images && product.images.length > 0 && (
//                 <div className="flex space-x-2 mt-4">
//                   {product.images.map((img, idx) => (
//                     <motion.div
//                       key={idx}
//                       whileHover={{ scale: 1.1 }}
//                       onClick={() => setSelectedImage(img)}
//                       className="cursor-pointer"
//                     >
//                       <Image
//                         src={img}
//                         alt={`${product.name} thumbnail ${idx + 1}`}
//                         width={80}
//                         height={80}
//                         className="rounded-md hover:opacity-75 transition-opacity"
//                       />
//                     </motion.div>
//                   ))}
//                 </div>
//               )}
//               {/* Certifications */}
//               <div className="flex space-x-2 mt-4">
//                 <Image src="/certifications/purity.png" alt="Purity" width={50} height={50} />
//                 <Image src="/certifications/lab-tested.png" alt="Lab Tested" width={50} height={50} />
//                 <Image src="/certifications/iso.png" alt="ISO Certified" width={50} height={50} />
//                 <Image src="/certifications/genuine.png" alt="100% Genuine" width={50} height={50} />
//               </div>
//             </div>

//             {/* Product Details */}
//             <div className="flex flex-col justify-between">
//               <div>
//                 {/* Sale Badge and Product Name */}
//                 <div className="flex items-center justify-between mb-4">
//                   <h1 className="text-3xl md:text-4xl font-bold text-maroon">{product.name}</h1>
//                   {product.discount > 0 && (
//                     <span className="bg-orange-500 text-white text-sm font-bold py-1 px-3 rounded">
//                       Sale!
//                     </span>
//                   )}
//                 </div>
//                 <div className="flex items-center mb-4">
//                   <span className="text-yellow-500 flex">
//                     {Array.from({ length: Math.floor(product.rating) }, (_, i) => (
//                       <Star key={i} size={20} fill="currentColor" />
//                     ))}
//                   </span>
//                   <span className="ml-2 text-gray-600">
//                     ({product.reviews?.length || 0} customer review{product.reviews?.length === 1 ? "" : "s"})
//                   </span>
//                 </div>
//                 <div className="mb-4">
//                   <span className="text-2xl font-bold text-gold">
//                     ₹{product.price.toFixed(2)}
//                   </span>
//                   <span className="ml-3 text-lg text-gray-500 line-through">
//                     ₹{product.originalPrice.toFixed(2)}
//                   </span>
//                   {product.discount > 0 && (
//                     <span className="ml-3 text-red-500">(-{product.discount}%)</span>
//                   )}
//                 </div>
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="bg-saffron/10 p-4 rounded-lg mb-6 border border-saffron-200"
//                 >
//                   <p className="text-sm text-maroon flex items-center">
//                     <Star size={16} className="mr-2 flex-shrink-0" />
//                     Blessed by Pandit Ji for prosperity and spiritual growth
//                   </p>
//                 </motion.div>

//                 {/* Size Selection */}
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Select Size</label>
//                   <select
//                     value={selectedSize}
//                     onChange={(e) => setSelectedSize(e.target.value)}
//                     className="w-full p-2 border rounded-md"
//                   >
//                     <option value="-20mm Bead">-20mm Bead</option>
//                     <option value="-20mm Silver Cape">-20mm Silver Cape</option>
//                   </select>
//                 </div>

//                 {/* Quantity */}
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
//                   <input
//                     type="number"
//                     min="1"
//                     value={quantity}
//                     onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
//                     className="w-16 p-2 border rounded-md"
//                   />
//                 </div>

//                 {/* Add to Cart and Wishlist */}
//                 <div className="flex space-x-4 mb-6">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleAddToCart}
//                     className="flex items-center bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition-all duration-300"
//                   >
//                     <ShoppingCart size={20} className="mr-2" />
//                     Add to Cart
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleWishlist}
//                     className="border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-100 transition-all duration-300 flex items-center"
//                   >
//                     <Heart size={20} className="mr-2" fill={isWishlisted ? "red" : "none"} />
//                     Add to Wishlist
//                   </motion.button>
//                 </div>

//                 {/* Shipping and Payment Info */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 }}
//                   className="mt-4 p-4 bg-gray-100 rounded-lg"
//                 >
//                   <h3 className="text-lg font-semibold text-maroon mb-2">Shipping & Payment Info</h3>
//                   <ul className="text-gray-600 list-disc list-inside space-y-1">
//                     <li>All Bharat shipping on all orders</li>
//                     <li>Shipping: Express Delivery all over Bharat</li>
//                     <li>Free Shipping: Above ₹999/- + Free Rudraksha Fruit within Bharat on Prepaid</li>
//                     <li>COD: Available on Nominal Charges</li>
//                     <li>Returns: 3 Days Easy Returns Policy*</li>
//                     <li>Dispatch: Order Yours Before 11:30am For Same Day Dispatch</li>
//                     <li>Standard Delivery Timelines: 5 to 7 Working Days</li>
//                   </ul>
//                   <div className="flex space-x-2 mt-4">
//                     <Image src="/certifications/satisfaction.png" alt="Satisfaction" width={50} height={50} />
//                     <Image src="/certifications/secure.png" alt="Secure" width={50} height={50} />
//                     <Image src="/certifications/visa.png" alt="Visa" width={50} height={50} />
//                     <Image src="/certifications/mastercard.png" alt="Mastercard" width={50} height={50} />
//                     <Image src="/certifications/paypal.png" alt="PayPal" width={50} height={50} />
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           </div>

//           {/* Add Product Info Component */}
//           <ProductInfo product={product} />

//           {/* Related Products */}
//           {relatedProducts.length > 0 && (  
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="mt-12"
//             >
//               <h2 className="text-2xl font-bold text-maroon mb-6">Related Products</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {relatedProducts.map((relatedProduct) => (
//                   <Link key={relatedProduct.id} href={`/E-commerce/${relatedProduct.id}`}>
//                     <motion.div
//                       whileHover={{ scale: 1.05 }}
//                       className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
//                     >
//                       <Image
//                         src={relatedProduct.image}
//                         alt={relatedProduct.name}
//                         width={300}
//                         height={200}
//                         className="w-full h-40 object-cover"
//                       />
//                       <div className="p-4">
//                         <h3 className="text-lg font-semibold text-maroon">{relatedProduct.name}</h3>
//                         <p className="text-gray-600 text-sm mt-1">{relatedProduct.rashi}</p>
//                         <div className="mt-2">
//                           <span className="text-gold font-bold">
//                             ₹{relatedProduct.price.toFixed(2)}
//                           </span>
//                           <span className="ml-2 text-sm text-gray-500 line-through">
//                             ₹{relatedProduct.originalPrice.toFixed(2)}
//                           </span>
//                         </div>
//                       </div>
//                     </motion.div>
//                   </Link>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </motion.section>
//     </>
//   );
// }