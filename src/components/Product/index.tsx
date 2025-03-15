"use client";

import productData from "@/data/product/product.json";
import SingleProduct from "@/components/Product/SingleProduct";
import SectionTitle from "@/components/Common/SectionTitle";
import Link from "next/link";

const ProductList = () => {
  return (
    <section className="pb-16 pt-16 px-4 w-full bg-[#FDF7F4]">
      <div className="max-w-screen-xl mx-auto">
        {/* SEO-Optimized Section Title */}
        <SectionTitle
          title="🛍️ Our Products | Authentic Astrology Items"
          paragraph="🌟 Discover high-quality astrology products, including Yantras, Rudraksha, and Gemstones. Elevate positivity and success in your life."
          center
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          {productData.slice(0, 4).map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="">
                <SingleProduct id={product.id.toString()} />
              </div>
            </Link>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-10">
          <Link href="/product">
            <button className="relative bg-[#800000] text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg transition-all duration-300 hover:bg-[#FF5C16]">
              🛒 Explore More Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
