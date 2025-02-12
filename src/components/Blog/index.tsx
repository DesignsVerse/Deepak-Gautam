"use client";
import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";
import Link from "next/link";

const Blog = () => {
  const sliderRef = useRef(null);
  const scrollAmount = 3 * 300;

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [scrollAmount]);  // ✅ Include it properly
  

  return (
    <section id="blog" className="bg-[#F9FAFB] from-yellow-50 to-orange-100 py-10 md:py-14 lg:py-20">
      <div className="container">
        <SectionTitle
          title="ताज़ा खबर"
          paragraph="बगलामुखी से संबंधित नवीन समाचार के लिए हमारे न्यूज़ सेक्शन को विजिट करें-"
          center
        />

        <section className="pb-[120px] relative">
          <div className="container relative">
            <button
              onClick={scrollLeft}
              className="absolute left-[-50px] z-10 top-1/2 transform -translate-y-1/2 bg-[#D96625] text-white p-3 rounded-full shadow-lg hover:bg-red-600 hidden md:block transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-[-50px] z-10 top-1/2 transform -translate-y-1/2 bg-[#D96625] text-white p-3 rounded-full shadow-lg hover:bg-red-600 hidden md:block transition-all duration-300 hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>

            <div
              ref={sliderRef}
              className="flex flex-nowrap overflow-x-auto gap-6 scroll-smooth px-4 no-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {blogData.map((blog) => (
                <div
                  key={blog.id}
                  className="w-full md:w-[427px] flex-shrink-0 p-4 rounded-2xl text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-white shadow-md"
                >
                  <SingleBlog blog={blog} />
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Link href="/blog">
                <button className="bg-[#D96625] text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 hover:scale-105">
                  View More
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Blog;
