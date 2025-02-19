import { notFound } from "next/navigation";
import data from "@/data/posts.json";
import { Metadata } from "next";

// ✅ Fetch metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = data.find((p) => p.id.toString() === params.id); // Ensuring id matches as string
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt || post.content.slice(0, 150) + "...",
    keywords: post.tags ? post.tags.join(", ") : "Blog, Articles, Next.js",
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.slice(0, 150) + "...",
      images: [{ url: post.image || "/images/default-blog.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.content.slice(0, 150) + "...",
      images: [post.image || "/images/default-blog.jpg"],
    },
  };
}

// ✅ Generate static paths
export async function generateStaticParams() {
  return data.map((post) => ({
    id: post.id.toString(), // Ensuring id is always a string
  }));
}

// ✅ Blog Page Component
export default function BlogPost({ params }: { params: { id: string } }) {
  const post = data.find((p) => p.id.toString() === params.id);

  if (!post) {
    return notFound();
  }

  return (
    <main className="mt-10 w-full min-h-screen flex flex-col items-center justify-center pt-24 px-6 text-center bg-white dark:bg-[#121723] text-black dark:text-white transition-colors duration-300">
      {/* Blog Content Section */}
      <div className="max-w-2xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-base sm:text-lg leading-relaxed">{post.content}</p>
      </div>
    </main>
  );
}
