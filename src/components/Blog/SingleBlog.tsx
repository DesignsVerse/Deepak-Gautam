"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Moon } from "lucide-react";
import blogData from "@/data/blogData.json";
import { useState } from "react";

const SingleBlog = ({ id }: { id: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  const blog = blogData.find((b) => b.id.toString() === id);

  if (!blog) {
    return (
      <p className="text-red-500 text-center animate-pulse">
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-labelledby={`blog-title-${blog.id}`}
    >
      {/* Cosmic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />

      {/* Blog Thumbnail with Zodiac Highlight */}
      <Link href={`/blog/${blog.id}`} className="block relative">
        <Image
          src={blog.thumbnail || "/images/default-astro-blog.jpg"}
          alt={`${blog.title || "Astrological Insights"} - Featured Image`}
          width={600}
          height={400}
          className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
        />
        {blog.zodiacSign && (
          <span
            className="absolute top-3 left-3 bg-opacity-80 text-white px-2 py-1 rounded-full text-xs sm:text-sm animate-fade-in"
            style={{ backgroundColor: getZodiacColor(blog.zodiacSign) }}
          >
            {blog.zodiacSign} ✨
          </span>
        )}
      </Link>

      {/* Blog Content */}
      <div className="p-4 sm:p-6 relative z-20 bg-white flex-grow">
        {/* Animated Title */}
        <h2
          id={`blog-title-${blog.id}`}
          className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 transition-colors duration-300 line-clamp-2"
          style={{ color: isHovered ? getZodiacColor(blog.zodiacSign) : "#800000" }}
        >
          <Link href={`/blog/${blog.id}`} className="hover:text-[#D55F26] focus:outline-none focus:ring-2 focus:ring-[#D55F26]">
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

        {/* Author & Meta Section */}
        <div className="flex justify-between items-center flex-wrap gap-2 sm:gap-4">
          {/* Uncomment and optimize if needed */}
          {/* <div className="flex items-center">
            <Image
              src={blog.author.image}
              alt={`Profile of ${blog.author.name}`}
              width={40}
              height={40}
              className="rounded-full border-2 border-purple-300 transition-transform duration-300 hover:rotate-12"
            />
            <div className="ml-2 sm:ml-3">
              <p className="text-xs font-semibold text-gray-800">{blog.author.name}</p>
              <p className="text-xs text-gray-500">{blog.author.designation}</p>
            </div>
          </div> */}

          <Link
            href={`/blog/${blog.id}`}
            className="text-[#D55F26] text-sm font-semibold inline-flex items-center group hover:underline focus:outline-none focus:ring-2 focus:ring-[#D55F26]"
          >
            View More
            <ArrowRight
              className="ml-1 sm:ml-2 transition-transform duration-300 group-hover:translate-x-1"
              size={16}
            />
          </Link>
        </div>

        {/* Meta Info */}
        <div className="border-t border-gray-200 mt-3 sm:mt-4 pt-3 sm:pt-4 flex justify-between text-xs sm:text-sm text-gray-500">
          <span className="flex items-center">
            <Moon size={12} className="mr-1 flex-shrink-0" />
            {blog.publishDate}
          </span>
          <span>⏳ {blog.readTime} min read</span>
        </div>

        {/* Lucky Color Bar */}
        {blog.luckyColor && (
          <div
            className="h-1 mt-3 sm:mt-4 rounded-b animate-pulse"
            style={{ backgroundColor: blog.luckyColor }}
          />
        )}
      </div>
    </article>
  );
};

export default SingleBlog;