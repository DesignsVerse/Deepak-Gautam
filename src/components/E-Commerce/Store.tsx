"use client";

import { useState, useEffect, Suspense } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import productData from "@/data/product/products.json";
import SingleProduct from "@/components/E-Commerce/SingleProduct";

// Create a separate component for the search params logic
const StoreContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial values from URL or use defaults
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialSort = searchParams.get("sort") || "default";
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [sortOption, setSortOption] = useState(initialSort);
  const [filterCategory, setFilterCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const productsPerPage = 12;

  // Update URL when any state changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    params.set("sort", sortOption);
    params.set("category", filterCategory);
    params.set("search", searchQuery);
    router.push(`?${params.toString()}`, { scroll: false });
  }, [currentPage, sortOption, filterCategory, searchQuery, router]);

  // Filter and sort products
  const filteredProducts = productData
    .filter((product) => {
      const matchesCategory = filterCategory === "all" || product.category === filterCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === "price-low-high") return a.price - b.price;
      if (sortOption === "price-high-low") return b.price - a.price;
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));

  // Adjust page if it exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [totalPages, currentPage]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (page: number) => setCurrentPage(page);

  const categories = ["all", ...new Set(productData.map((p) => p.category))];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: currentProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        image: product.image,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        description: product.description,
      },
    })),
  };

  return (
    <>
      <Head>
        <title>Store - Deepak GoutamPanditji</title>
        <meta
          name="description"
          content="Explore sacred Rudraksha, gemstones, and spiritual items at Deepak GoutamPanditji’s store. Find divine products for peace, prosperity, and spiritual growth."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <section className="pb-[120px] pt-[10px]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full md:w-1/3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full md:w-1/4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full md:w-1/4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
            >
              <option value="default">Sort By: Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>

          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              {currentProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/E-commerce/${product.id}`}
                  className="w-full"
                >
                  <div className="w-full rounded-2xl transform transition-transform hover:scale-105 shadow-lg">
                    <SingleProduct id={product.id.toString()} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">No products found matching your criteria.</p>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-10 space-x-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                aria-label="Previous Page"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => goToPage(index + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === index + 1 ? "bg-[#800000] text-white" : "bg-gray-300"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                aria-label="Next Page"
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

const StorePage = () => {
  return (
    <Suspense fallback={<div>Loading store...</div>}>
      <StoreContent />
    </Suspense>
  );
};

export default StorePage;