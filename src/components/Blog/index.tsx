'use client';

import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";
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
      "name": "बगलामुखी मंदिर न्यूज़",
      "description": "बगलामुखी माता से जुड़ी नवीनतम खबरें और विशेष रिपोर्ट्स।",
      "url": "https://yourwebsite.com/blog",
      "blogPost": blogData.map((blog) => ({
        "@type": "BlogPosting",
        "headline": blog.title,
        "datePublished": blog.publishDate || "December 01, 2024",
        "author": {
          "@type": "Person",
          "name": blog.author
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://yourwebsite.com/blog/${blog.id}`
        }
      }))
    });
    document.head.appendChild(script);
  }, []);

  return (
    <section id="blog" className="bg-[#FDF7F4] py-10 md:py-14 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* SEO-Friendly Section Title */}
        <SectionTitle
          title="माँ बगलामुखी से जुड़ी ताज़ा खबरें"
          paragraph="नवीनतम समाचार और धार्मिक अपडेट के लिए हमारे न्यूज़ सेक्शन को विजिट करें।"
          center
        />

        <section className="pb-10">
          <div className="container">
            <div className="flex flex-wrap mt-10 justify-between gap-6">
              {blogData.map((blog) => (
                <article
                  key={blog.id}
                  className="w-full md:w-[30%] flex-shrink-0 rounded-2xl text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-white shadow-md"
                  aria-labelledby={`blog-title-${blog.id}`}
                >
                  <SingleBlog blog={blog} />
                </article>
              ))}
            </div>

            {/* View More Button with SEO Optimization */}
            <div className="flex justify-center mt-8">
            <Link 
              href="/blog"
              className="bg-[#800000] text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-500 transition-all duration-300 hover:scale-105"
              aria-label="Read more articles on माँ बगलामुखी मंदिर न्यूज़"
            >
              और पढ़ें
            </Link>

            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Blog;
