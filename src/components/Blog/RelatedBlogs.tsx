 "use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import blogData from "@/data/blogData.json";

const getRandomBlogs = (currentBlogId: string) => {
  // Filter out the current blog
  const filteredBlogs = blogData.filter((blog) => blog.id.toString() !== currentBlogId);

  // Shuffle the array randomly
  const shuffledBlogs = filteredBlogs.sort(() => 0.5 - Math.random());

  // Return only 5 random blogs
  return shuffledBlogs.slice(0, 5);
};

const RelatedBlogs = ({ currentBlogId }: { currentBlogId: string }) => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    // Get new random blogs whenever currentBlogId changes
    setRelatedBlogs(getRandomBlogs(currentBlogId));
  }, [currentBlogId]); // Runs every time currentBlogId changes

  return (
    <aside className="w-full mt-1 space-y-8 sticky top-0 h-screen overflow-y-auto">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 tracking-wide bg-gradient-to-r from-[#800000] to-[#b30000] bg-clip-text text-transparent border-l-4 border-[#800000] pl-4">
        Related Blogs
      </h3>

      <div className="grid gap-3">
        {relatedBlogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.id}`}
            className="group block bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center space-x-5 p-5 relative">
              <div className="relative flex-shrink-0 w-28 h-20">
                <Image
                  src={blog.thumbnail || "/images/default-astro-blog.jpg"}
                  width={112}
                  height={80}
                  alt={`${blog.title} - Thumbnail`}
                  className="rounded-lg object-cover w-full h-full transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="flex-1 space-y-2">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight transition-colors duration-300">
                  {blog.title}
                </h4>
                <div className="flex items-center space-x-3 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    {blog.publishDate}
                  </span>
                  <span className="text-gray-400 dark:text-gray-300">•</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {blog.readTime} min read
                  </span>
                </div>
              </div>
            </div>

            <div className="h-1 bg-gradient-to-r from-[#800000] to-[#b30000] w-0 group-hover:w-full transition-all duration-500 ease-in-out" />
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default RelatedBlogs;
