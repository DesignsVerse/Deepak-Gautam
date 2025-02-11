import { notFound } from "next/navigation";
import data from "@/data/posts.json";
import Image from "next/image";

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
    <main className="mt-20 w-full min-h-screen flex flex-col items-center pt-24 px-6 md:px-10 lg:px-20 bg-white dark:bg-[#121723] text-black dark:text-white transition-colors duration-300">
      {/* Blog Content Section */}
      <div className="w-full mb-30 flex flex-col lg:flex-row items-center lg:items-start gap-10">
        {/* Text Content */}
        <div className="lg:w-2/3 flex flex-col items-start">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center lg:text-left">
            {post.title}
          </h1>
          <p className="text-base sm:text-lg text-justify leading-relaxed">
            {post.content} 
          </p>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/3 flex justify-center">
          {post.image && (
            <Image
              src={post.image}
              width={400}
              height={500}
              alt="Blog Image"
              className="rounded-lg w-full max-w-[400px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover"
            />
          )}
        </div>
      </div>

      {/* New Section with Image on Left & Text on Right */}
      <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-6 mt-12 p-6 bg-gray-200 dark:bg-gray-800 rounded-lg transition-colors duration-300">
        {/* Left Side Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          {post.extraImage && (
            <Image
              src={post.extraImage}
              width={200}
              height={200}
              alt="Extra Image"
              className="rounded-lg object-cover"
            />
          )}
        </div>

        {/* Right Side Text */}
        <div className="w-full md:w-2/3 text-justify">
          <h2 className="text-xl md:text-2xl font-bold mb-2">{post.extraHeading}</h2>
          <p className="md:text-lg leading-relaxed">{post.extraContent}</p>
        </div>
      </div>
    </main>
  );
}
