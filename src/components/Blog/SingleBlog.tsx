"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import blogData from "@/data/blogData.json"; // ✅ Ensure correct path

const SingleBlog = ({ id }: { id: string }) => {
  // ✅ Find blog by ID (string comparison)
  const blog = blogData.find((b) => b.id.toString() === id);

  console.log("Blog Data:", blog); // Debugging ke liye

  if (!blog) return <p className="text-red-500 text-center">Blog not found!</p>;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Blog Thumbnail */}
      <Link href={`/blog/${blog.id}`} className="block">
        <Image
          src={blog.thumbnail || "/images/default-blog.jpg"}
          alt={blog.title || "Blog Image"}
          width={600}
          height={400}
          className="w-full h-64 object-cover"
          loading="lazy"
        />
      </Link>

      {/* Blog Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-[#800000] mb-2">
          <Link href={`/blog/${blog.id}`} className="hover:text-[#D55F26]">
            {blog.title}
          </Link>
        </h2>

        <p className="text-sm text-gray-500">{blog.paragraph}</p>

        {/* Author Section */}
        <div className="flex justify-between">
        <div className="flex justify-between items-center mt-4">
          <Link
            href={`/blog/${blog.id}`} // ✅ Corrected path
            className="text-[#D55F26] font-semibold inline-flex items-center"
          >
            आगे पढ़ें <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
        <div className="flex items-center mt-3">
          <Image
            src={blog.author.image}
            alt={blog.author.name}
            width={40}
            height={40}
            className="rounded-full border-2 border-gray-300"
          />
          <div className="ml-3">
            <p className="text-sm font-semibold text-gray-700">{blog.author.name}</p>
            <p className="text-xs text-gray-500">{blog.author.designation}</p>
          </div>
        </div>

        {/* Read More Button */}
        
        </div>


        <div className="border-t border-gray-300 my-4" />
        <p className="text-sm text-left text-gray-500">📅 {blog.publishDate} | ⏳ {blog.readTime} min read</p>
      </div>
    </div>
  );
};

export default SingleBlog;
