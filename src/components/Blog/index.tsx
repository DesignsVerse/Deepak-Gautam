'use client';

import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "@/data/blogData.json";
import Link from "next/link";
import { useEffect } from "react";

const Blog = () => {
  useEffect(() => {
    // Inject JSON-LD structured data for SEO
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Pandit Deepak Gautam - Kaal Sarp Dosh Remedies",
      "description": "Latest updates and rituals by Pandit Deepak Gautam .",
      "url": "https://yourwebsite.com/blog",
      "publisher": {
        "@type": "Person",
        "name": "Pandit Deepak Gautam",
        "description": "Renowned astrologer specializing in Kaal Sarp Dosh remedies in Ujjain."
      },
      "blogPost": blogData.slice(0, 3).map((blog) => ({
        "@type": "BlogPosting",
        "headline": `${blog.title} - Kaal Sarp Puja Ujjain`,
        "datePublished": blog.publishDate || "March 12, 2025",
        "author": {
          "@type": "Person",
          "name": "Pandit Deepak Gautam"
        },
        "keywords": "Kaal Sarp Puja Ujjain, Ujjain Kaal Sarp Dosh, Kaal Sarp Dosh",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://ujjainkalsarp.com/blog/${blog.id}`
        }
      }))
    });
    document.head.appendChild(script);

    // Cleanup to avoid duplicate scripts on re-render
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Limit blogData to first 3 items
  const featuredBlogs = blogData.slice(0, 3);

  return (
    <section id="blog" className="bg-[#FDF7F4] py-10 md:py-14 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* SEO-Optimized Section Title */}
        <SectionTitle
          title="Latest Spiritual & Astrological Updates by Pandit Deepak Gautam"
          paragraph="Explore the latest news and rituals for Kaal Sarp Dosh remedies in Ujjain by renowned astrologer Pandit Deepak Gautam."
          center
        />

        <section className="pb-10 mt-10">
          <div className="container">
            <div className="flex flex-wrap mt-10 justify-between gap-6">
              {featuredBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="w-full md:w-[30%] flex-shrink-0 rounded-2xl text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-white shadow-md"
                  aria-labelledby={`blog-title-${blog.id}`}
                >
                  <SingleBlog id={blog.id.toString()} />
                </article>
              ))}
            </div>

            {/* SEO-Optimized View More Button */}
            <div className="flex justify-center mt-8">
              <Link
                href="/blog"
                className="bg-[#800000] text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-500 transition-all duration-300 hover:scale-105"
                aria-label="Read more about Kaal Sarp Puja Ujjain by Pandit Deepak Gautam"
              >
                Explore More 
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Blog;