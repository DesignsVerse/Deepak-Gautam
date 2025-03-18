"use client";

import { useState, useEffect } from "react";
import blogData from "@/data/blogData.json"; // Ensure correct path
import SingleBlog from "@/components/Blog/SingleBlog";
import Link from "next/link";

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 12;

  // Sort blogData by publishDate in descending order (latest first)
  const sortedBlogs = [...blogData].sort((a, b) => {
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(); // Fixed with .getTime()
  });

  const totalPages = Math.max(1, Math.ceil(sortedBlogs.length / blogsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage((prev) => Math.max(1, totalPages)); // Prevent invalid page numbers
    }
  }, [totalPages, currentPage]);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <section className="pb-[120px] pt-[10px]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {currentBlogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.slug}`} className="w-full">
              <div className="w-full p-4 rounded-2xl transform transition-transform hover:scale-105 bg-gray-light">
                <SingleBlog id={blog.id.toString()} slug={blog.slug} />
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
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
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
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
  );
};

export default Blog;