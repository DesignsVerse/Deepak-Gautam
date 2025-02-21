import { notFound } from "next/navigation";
import blogData from "@/data/blogData.json"; // Single source
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";

export async function generateMetadata({ params }) {
  const post = blogData.find((post) => post.id.toString() === params.id);
  if (!post) {
    return { title: "Blog Post Not Found | Deepak Gautam" };
  }

  return {
    title: `${post.title} | Deepak Gautam - SEO & Digital Marketing Expert`,
    description:
      post.sections[0]?.content.slice(0, 150) + "..." || "Read more about this topic by Deepak Gautam.",
    keywords: `${post.title.split(" ").join(", ")}, Deepak Gautam, SEO, digital marketing, blog`, // ✅ Dynamic keywords
    robots: "index, follow", // ✅ Ensure indexing
    authors: [{ name: "Deepak Gautam" }], // ✅ Author attribution
    alternates: {
      canonical: `https://www.deepakgautam.com/blog/${params.id}`, // ✅ Replace with your domain
    },
    openGraph: {
      title: `${post.title} | Deepak Gautam`,
      description: post.sections[0]?.content.slice(0, 150) + "..." || "A blog by Deepak Gautam.",
      images: [
        {
          url: post.thumbnail || "/images/default-blog.jpg", // ✅ Fallback image
          width: 900,
          height: 500,
          alt: `${post.title} - Deepak Gautam Blog`,
        },
      ],
      url: `https://www.deepakgautam.com/blog/${params.id}`,
      type: "article", // ✅ Blog ke liye "article" type
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Deepak Gautam`,
      description: post.sections[0]?.content.slice(0, 150) + "...",
      image: post.thumbnail || "/images/default-blog.jpg",
    },
  };
}

export async function generateStaticParams() {
  console.log("Generating Static Params...");
  return blogData.map((post) => ({
    id: post.id.toString(), // Ensure id is a string
  }));
}

export default function BlogPost({ params }) {
  console.log("Params:", params.id); // Debugging
  console.log("Blog Data:", blogData); // Debugging

  const post = blogData.find((post) => post.id.toString() === params.id);

  if (!post) {
    console.log("Post Not Found!"); // Debugging
    return notFound();
  }

  // Structured Data for Blog (Schema.org)
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.sections[0]?.content.slice(0, 150) + "...",
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    datePublished: post.publishDate,
    image: post.thumbnail || "/images/default-blog.jpg",
    publisher: {
      "@type": "Person",
      name: "Deepak Gautam",
    },
  };

  return (
    <main className="mt-20 mb-20 w-full min-h-screen flex flex-col items-center pt-16 px-6 md:px-12 lg:px-24 bg-gray-50 dark:bg-[#121723] text-black dark:text-white transition-all duration-300">
      {/* Add Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-xl shadow-md p-10 border-4 border-[#800000]">
        {post.thumbnail && (
          <div className="relative w-full flex justify-center mb-10">
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-72 h-72 rounded-full bg-[#800000]"></div>
            </div>
            <Image
              src={post.thumbnail}
              width={900}
              height={500}
              alt={`${post.title} - Blog by Deepak Gautam`} // ✅ Enhanced alt text
              className="object-cover w-full h-auto relative z-10 rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            {post.title}
          </h1>
          <p className="text-md text-gray-500 dark:text-gray-400 mt-3">
            Published on {post.publishDate} • {post.readTime} min read
          </p>
        </div>

        <div>
          {post.sections.map((section, index) => (
            <div key={index} className="p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
                {section.heading}
              </h2>
              <ReactMarkdown className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {section.content}
              </ReactMarkdown>
            </div>
          ))}
        </div>

        <div className="flex items-center mt-16 p-6 rounded-lg bg-gray-100 dark:bg-gray-900 shadow-md border-t-4 border-[#800000]">
          <Image
            src={post.author.image}
            width={60}
            height={60}
            alt={`Author ${post.author.name} - Deepak Gautam Blog`} // ✅ Enhanced alt text
            className="rounded-full border-2 border-gray-300 dark:border-gray-700"
          />
          <div className="ml-4">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {post.author.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {post.author.designation}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}