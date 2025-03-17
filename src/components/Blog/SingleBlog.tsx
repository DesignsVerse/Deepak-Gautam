"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Moon } from "lucide-react";
import blogData from "@/data/blogData.json";

const SingleBlog = ({ id, slug }: { id?: string; slug?: string }) => { // ✅ Added slug prop
  const blog = blogData.find((b) => (id && b.id.toString() === id) || (slug && b.slug === slug)); // ✅ Flexible fetch

  if (!blog) {
    return (
      <p className="text-red-500 text-center">
        Cosmic alignment failed - Blog not found!
      </p>
    );
  }

  // Astrology-specific enhancements
  const getZodiacColor = (sign?: string) => {
    const zodiacColors: { [key: string]: string } = {
      Aries: "#FF6B6B",
      Taurus: "#4ECDC4",
      Gemini: "#45B7D1",
      Cancer: "#96CEB4",
      Leo: "#FFEEAD",
      Virgo: "#D4A5A5",
      Libra: "#FFB6C1",
      Scorpio: "#8A2BE2",
      Sagittarius: "#FF4500",
      Capricorn: "#2F4F4F",
      Aquarius: "#00CED1",
      Pisces: "#9400D3",
    };
    return sign ? zodiacColors[sign] || "#800000" : "#800000";
  };

  return (
    <article
      className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl relative flex flex-col"
      aria-labelledby={`blog-title-${blog.id}`}
    >
      {/* Blog Thumbnail with Zodiac Highlight */}
      <Link href={`/blog/${blog.slug}`} className="block relative"> {/* ✅ Changed to slug */}
        <Image
          src={blog.thumbnail || "/images/default-astro-blog.jpg"}
          alt={`${blog.title || "Astrological Insights"} - Featured Image`}
          width={600}
          height={400}
          className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          loading="lazy"
        />
        <style jsx>{`
          .image-container::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent);
            z-index: 10;
            pointer-events: none;
          }
        `}</style>
        {blog.zodiacSign && (
          <span
            className="absolute top-3 left-3 bg-opacity-80 text-white px-2 py-1 rounded-full text-xs sm:text-sm"
            style={{ backgroundColor: getZodiacColor(blog.zodiacSign) }}
          >
            {blog.zodiacSign} ✨
          </span>
        )}
      </Link>

      {/* Blog Content */}
      <div className="p-4 sm:p-6 relative z-20 bg-white flex-grow">
        {/* Animated Title (using CSS for hover color) */}
        <h2
          id={`blog-title-${blog.id}`}
          className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 line-clamp-2"
        >
          <Link
            href={`/blog/${blog.slug}`} // ✅ Changed to slug
            className="hover:text-[#D55F26] focus:outline-none focus:ring-2 focus:ring-[#D55F26]"
            style={{ color: getZodiacColor(blog.zodiacSign) }}
          >
            {blog.title}
          </Link>
        </h2>

        <p className="text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed line-clamp-3">
          {blog.paragraph?.substring(0, 150) || "Explore cosmic insights..."}...
        </p>

        {blog.cosmicTip && (
          <div className="bg-purple-50 p-2 sm:p-3 rounded-lg mb-3 sm:mb-4 border border-purple-200">
            <p className="text-xs sm:text-sm text-purple-700 flex items-center">
              <Star size={14} className="mr-1 sm:mr-2 flex-shrink-0" />
              <span className="line-clamp-2">Cosmic Tip: {blog.cosmicTip}</span>
            </p>
          </div>
        )}

        {/* Meta Section */}
        <div className="border-t border-gray-200 mt-3 sm:mt-4 pt-3 sm:pt-4 flex justify-between items-center flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
          <span className="flex items-center">
            <Moon size={12} className="mr-1 flex-shrink-0" />
            {blog.publishDate} | ⏳ {blog.readTime} min read
          </span>
          <Link
            href={`/blog/${blog.slug}`} // ✅ Changed to slug
            className="text-[#D55F26] font-semibold inline-flex items-center group hover:underline focus:outline-none focus:ring-2 focus:ring-[#D55F26]"
          >
            View More
            <ArrowRight
              className="ml-1 sm:ml-2 transition-transform duration-300 group-hover:translate-x-1"
              size={16}
            />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default SingleBlog;