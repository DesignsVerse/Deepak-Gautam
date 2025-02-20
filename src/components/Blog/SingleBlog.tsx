"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Moon } from "lucide-react";
import blogData from "@/data/blogData.json";
import { useState } from "react";

// Assuming blogData.json has these additional fields for astrology:
// zodiacSign: string, cosmicTip: string, luckyColor: string

const SingleBlog = ({ id }: { id: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const blog = blogData.find((b) => b.id.toString() === id);

  if (!blog) return (
    <p className="text-red-500 text-center animate-pulse">
      Cosmic alignment failed - Blog not found!
    </p>
  );

  // Astrology-specific enhancements
  const getZodiacColor = (sign?: string) => {
    const zodiacColors: { [key: string]: string } = {
      Aries: "#FF6B6B", Taurus: "#4ECDC4", Gemini: "#45B7D1",
      Cancer: "#96CEB4", Leo: "#FFEEAD", Virgo: "#D4A5A5",
      // Add others as needed
    };
    return sign ? zodiacColors[sign] || "#800000" : "#800000";
  };

  return (
    <div 
      className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cosmic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10" />

      {/* Blog Thumbnail with Zodiac Highlight */}
      <Link href={`/blog/${blog.id}`} className="block relative">
        <Image
          src={blog.thumbnail || "/images/default-astro-blog.jpg"}
          alt={blog.title || "Astrological Insights"}
          width={600}
          height={400}
          className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        {blog.zodiacSign && (
          <span 
            className="absolute top-4 left-4 bg-opacity-80 text-white px-3 py-1 rounded-full text-sm animate-fade-in"
            style={{ backgroundColor: getZodiacColor(blog.zodiacSign) }}
          >
            {blog.zodiacSign} ✨
          </span>
        )}
      </Link>

      {/* Blog Content */}
      <div className="p-6 relative z-20 bg-white">
        {/* Animated Title */}
        <h2 
          className="text-2xl font-bold mb-3 transition-colors duration-300"
          style={{ color: isHovered ? getZodiacColor(blog.zodiacSign) : "#800000" }}
        >
          <Link href={`/blog/${blog.id}`} className="hover:text-[#D55F26]">
            {blog.title}
          </Link>
        </h2>

        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {blog.paragraph.substring(0, 150)}...
        </p>

        {/* Cosmic Tip */}
        {blog.cosmicTip && (
          <div className="bg-purple-50 p-3 rounded-lg mb-4 border border-purple-200">
            <p className="text-sm text-purple-700 flex items-center">
              <Star size={16} className="mr-2" />
              Cosmic Tip: {blog.cosmicTip}
            </p>
          </div>
        )}

        {/* Author & Meta Section */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center">
            <Image
              src={blog.author.image}
              alt={blog.author.name}
              width={48}
              height={48}
              className="rounded-full border-2 border-purple-300 transition-transform duration-300 hover:rotate-12"
            />
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-800">{blog.author.name}</p>
              <p className="text-xs text-gray-500">{blog.author.designation}</p>
            </div>
          </div>

          {/* Read More with Animation */}
          <Link
            href={`/blog/${blog.id}`}
            className="text-[#D55F26] font-semibold inline-flex items-center group"
          >
            Cosmic Insights
            <ArrowRight 
              className="ml-2 transition-transform duration-300 group-hover:translate-x-2" 
              size={18} 
            />
          </Link>
        </div>

        {/* Meta Info */}
        <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between text-sm text-gray-500">
          <span className="flex items-center">
            <Moon size={14} className="mr-1" />
            {blog.publishDate}
          </span>
          <span>⏳ {blog.readTime} min read</span>
        </div>

        {/* Lucky Color Bar */}
        {blog.luckyColor && (
          <div 
            className="h-1 mt-4 rounded-b animate-pulse"
            style={{ backgroundColor: blog.luckyColor }}
          />
        )}
      </div>
    </div>
  );
};

export default SingleBlog;