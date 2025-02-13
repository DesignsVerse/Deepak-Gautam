import { notFound } from "next/navigation";
import data from "@/data/posts.json";

// Fetch metadata for SEO
export async function generateMetadata({ params }) {
  const post = data.find((post) => post.id === params.id);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

// Generate static paths
export async function generateStaticParams() {
  return data.map((post) => ({
    id: post.id.toString(), // Ensuring id is always a string
  }));
}

export default function BlogPost({ params }) {
  const post = data.find((post) => post.id === params.id);

  if (!post) {
    return notFound();
  }

  return (
    <main className="mt-10 w-full min-h-screen flex flex-col items-center justify-center pt-24 px-6 text-center bg-white dark:bg-[#121723] text-black dark:text-white transition-colors duration-300">
      {/* Blog Content Section */}
      <div className="max-w-2xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          {post.title}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed">
          {post.content}
        </p>
      </div>
    </main>
  );
}
