import { notFound } from "next/navigation";
import blogData from "@/data/blogData.json";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";
import RelatedBlogs from "@/components/Blog/RelatedBlogs";

// Generate metadata for the blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // Await params to ensure it's resolved
  const resolvedParams = await params;

  // Check if slug exists
  if (!resolvedParams || !resolvedParams.slug) {
    return { title: "Blog Post Not Found | Deepak Goutam" };
  }

  const post = blogData.find((post) => post.slug === resolvedParams.slug);

  if (!post) {
    return { title: "Blog Post Not Found | Deepak Goutam" };
  }

  return {
    metadataBase: new URL("https://www.ujjainkalsarp.com"),
    title: `${post.title} | Deepak Goutam - kaal sarp ujjain pandit ji`,
    description:
      post.sections[0]?.content.slice(0, 150) + "..." || "Read more about this topic by Deepak Goutam.",
    keywords: `${post.title.split(" ").join(", ")}, Deepak Goutam, ujjain, ujjain kaal sarp , kaal sarp ujjain, kaal sarp, काल सर्प दोष, काल सर्प योग, उज्जैन काल सर्प दोष, उज्जैन काल सर्प योग, काल सर्प दोष पूजा उज्जैन, उज्जैन काल सर्प पूजा, काल सर्प दोष निवारण पूजा उज्जैन`,
    robots: "index, follow",
    authors: [{ name: "Deepak Goutam" }],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Deepak Goutam`,
      description: post.sections[0]?.content.slice(0, 150) + "..." || "A blog by Deepak Goutam.",
      images: [
        {
          url: post.thumbnail || "/images/default-blog.jpg",
          width: 900,
          height: 500,
          alt: `${post.title} - Deepak Goutam Blog`,
        },
      ],
      url: `/blog/${post.slug}`,
      type: "article",
    },
  };
}

// Generate static params for pre-rendering
export async function generateStaticParams() {
  console.log("Generating Static Params...");
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}

// Blog post page component
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  // Await params to ensure it's resolved
  const resolvedParams = await params;

  // Check if slug exists
  if (!resolvedParams || !resolvedParams.slug) {
    console.log("Post Not Found!");
    return notFound();
  }

  const post = blogData.find((post) => post.slug === resolvedParams.slug);

  if (!post) {
    console.log("Post Not Found!");
    return notFound();
  }

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
      name: "Deepak Goutam",
    },
  };

  return (
    <main className="mt-16 mb-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 bg-gray-50 dark:bg-[#121723] text-black dark:text-white transition-all duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
        {/* Left Side: Main Blog Content */}
        <article className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 md:p-10 border-4 border-[#800000]">
          {post.thumbnail && (
            <div className="relative w-full flex justify-center mb-6 sm:mb-10">
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full bg-[#800000]"></div>
              </div>
              <Image
                src={post.thumbnail}
                width={900}
                height={500}
                alt={`${post.title} - Blog by Deepak Goutam`}
                className="object-cover w-full max-h-[300px] sm:max-h-[400px] md:max-h-[500px] relative z-10 rounded-lg shadow-lg"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 900px"
                priority
              />
            </div>
          )}

          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            <p className="text-sm sm:text-md text-gray-500 dark:text-gray-400 mt-2">
              Published on {post.publishDate} • {post.readTime} min read
            </p>
          </div>

          <div>
            {post.sections.map((section, index) => (
              <div key={index} className="sm:p-6 md:p-4 rounded-xl">
                <h2 className="text-xl text-center mt-5 sm:text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-3 sm:mb-4">
                  {section.heading}
                </h2>
                <ReactMarkdown
                  className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none"
                >
                  {section.content}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </article>

        {/* Right Side: Related Blogs */}
        <div className="lg:col-span-1">
          <RelatedBlogs currentBlogId={post.id} />
        </div>
      </div>
    </main>
  );
}