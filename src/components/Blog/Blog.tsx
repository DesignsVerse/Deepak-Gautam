"use client"; // ✅ Ensure this is present

import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation"; // ✅ Correct Next.js hooks
import blogData from "@/data/blogData.json";
import SingleBlog from "@/components/Blog/SingleBlog";
import Link from "next/link";

const Blog = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // ✅ Get page number from URL
  const page = searchParams.get("page") || "1";
  const initialPage = parseInt(page, 10) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const blogsPerPage = 12;
  const totalPages = Math.max(1, Math.ceil(blogData.length / blogsPerPage))

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <section className="pb-[120px] pt-[10px]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {currentBlogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.id}`} className="w-full">
              <div className="w-full p-4 rounded-2xl transform transition-transform hover:scale-105 bg-gray-light">
                <SingleBlog id={blog.id.toString()} />
              </div>
            </Link>
          ))}
        </div>

        {/* ✅ Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 space-x-2">
            <Pagination currentPage={currentPage} totalPages={totalPages} pathname={pathname} />
          </div>
        )}
      </div>
    </section>
  );
};

// ✅ Pagination Component - Uses `searchParams` correctly
const Pagination = ({ currentPage, totalPages, pathname }: { currentPage: number; totalPages: number; pathname: string }) => {
  const searchParams = useSearchParams();

  const getPageLink = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <Link href={getPageLink(currentPage - 1)} className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50" aria-disabled={currentPage === 1}>
        &lt;
      </Link>
      {Array.from({ length: totalPages }, (_, index) => (
        <Link
          key={index + 1}
          href={getPageLink(index + 1)}
          className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? "bg-[#800000] text-white" : "bg-gray-300"}`}
        >
          {index + 1}
        </Link>
      ))}
      <Link href={getPageLink(currentPage + 1)} className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50" aria-disabled={currentPage === totalPages}>
        &gt;
      </Link>
    </>
  );
};

export default Blog;
