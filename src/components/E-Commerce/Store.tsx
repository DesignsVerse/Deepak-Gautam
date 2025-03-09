// "use client";

// import { useState, useEffect } from "react";
// import Head from "next/head";
// import Link from "next/link";
// import productData from "@/data/product/products.json"; // Ensure correct path to products.json
// import SingleProduct from "@/components/E-Commerce/SingleProduct";

// const StorePage = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortOption, setSortOption] = useState("default"); // Sorting state
//   const [filterCategory, setFilterCategory] = useState("all"); // Category filter
//   const [searchQuery, setSearchQuery] = useState(""); // Search state
//   const productsPerPage = 12;

//   // Filter and sort products
//   const filteredProducts = productData
//     .filter((product) => {
//       const matchesCategory = filterCategory === "all" || product.category === filterCategory;
//       const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
//       return matchesCategory && matchesSearch;
//     })
//     .sort((a, b) => {
//       if (sortOption === "price-low-high") return a.price - b.price;
//       if (sortOption === "price-high-low") return b.price - a.price;
//       return 0; // Default: no sorting
//     });

//   const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));

//   useEffect(() => {
//     if (currentPage > totalPages) {
//       setCurrentPage((prev) => Math.max(1, totalPages));
//     }
//   }, [totalPages, currentPage]);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

//   const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

//   // Assuming categories exist in your product data (e.g., Rudraksha, Gemstones)
//   const categories = ["all", ...new Set(productData.map((p) => p.category))];

//   // Structured Data for Product Listing (Schema.org)
//   const structuredData = {
//     "@context": "https://schema.org",
//     "@type": "ItemList",
//     itemListElement: currentProducts.map((product, index) => ({
//       "@type": "ListItem",
//       position: index + 1,
//       item: {
//         "@type": "Product",
//         name: product.name,
//         image: product.image,
//         offers: {
//           "@type": "Offer",
//           price: product.price,
//           priceCurrency: "INR",
//           availability: "https://schema.org/InStock",
//         },
//         description: product.description,
//       },
//     })),
//   };

//   return (
//     <>
//       <Head>
//         <title>Store - Deepak Gautam Panditji</title>
//         <meta
//           name="description"
//           content="Explore sacred Rudraksha, gemstones, and spiritual items at Deepak Gautam Panditji’s store. Find divine products for peace, prosperity, and spiritual growth."
//         />
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
//         />
//       </Head>

//       <section className="pb-[120px] pt-[10px]">
//         <div className="container mx-auto">
//           {/* Filter and Sort Controls */}
//           <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//             {/* Search Bar */}
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setCurrentPage(1); // Reset to first page on search
//               }}
//               placeholder="Search products..."
//               className="w-full md:w-1/3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
//             />

//             {/* Category Filter */}
//             <select
//               value={filterCategory}
//               onChange={(e) => {
//                 setFilterCategory(e.target.value);
//                 setCurrentPage(1); // Reset to first page on filter change
//               }}
//               className="w-full md:w-1/4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
//             >
//               {categories.map((category) => (
//                 <option key={category} value={category}>
//                   {category === "all" ? "All Categories" : category}
//                 </option>
//               ))}
//             </select>

//             {/* Sort Options */}
//             <select
//               value={sortOption}
//               onChange={(e) => {
//                 setSortOption(e.target.value);
//                 setCurrentPage(1); // Reset to first page on sort change
//               }}
//               className="w-full md:w-1/4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
//             >
//               <option value="default">Sort By: Default</option>
//               <option value="price-low-high">Price: Low to High</option>
//               <option value="price-high-low">Price: High to Low</option>
//             </select>
//           </div>

//           {/* Product Grid */}
//           {currentProducts.length > 0 ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
//               {currentProducts.map((product) => (
//                 <Link
//                   key={product.id}
//                   href={`/product/${product.id}`}
//                   className="w-full"
//                 >
//                   <div className="w-full rounded-2xl transform transition-transform hover:scale-105 shadow-lg">
//                     <SingleProduct id={product.id.toString()} />
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500 mt-10">No products found matching your criteria.</p>
//           )}

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-center items-center mt-10 space-x-2">
//               <button
//                 onClick={prevPage}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
//                 aria-label="Previous Page"
//               >
//                 &lt;
//               </button>
//               {Array.from({ length: totalPages }, (_, index) => (
//                 <button
//                   key={index + 1}
//                   onClick={() => setCurrentPage(index + 1)}
//                   className={`px-4 py-2 rounded-md ${
//                     currentPage === index + 1 ? "bg-saffron text-white" : "bg-gray-300"
//                   }`}
//                   aria-label={`Go to page ${index + 1}`}
//                 >
//                   {index + 1}
//                 </button>
//               ))}
//               <button
//                 onClick={nextPage}
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
//                 aria-label="Next Page"
//               >
//                 &gt;
//               </button>
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// };

// export default StorePage;