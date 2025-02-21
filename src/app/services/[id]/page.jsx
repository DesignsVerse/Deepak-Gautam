import Image from "next/image";
import { notFound } from "next/navigation";
import data from "@/data/services.json";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export async function generateMetadata({ params }) {
  const post = data.find((post) => post.id === parseInt(params.id));
  if (!post) return { title: "Service Not Found" };
  return {
    title: post.title,
    description: post.paragraph,
  };
}

export default async function ServicePost({ params }) {
  const post = data.find((post) => post.id === parseInt(params.id));
  if (!post) return notFound();

  return (
    <main className="mt-[140px] max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <section className="w-full lg:w-2/3 border p-6 rounded-lg shadow-md order-1">
          <h1 className="text-4xl font-bold text-left">{post.title}</h1>
          <p className="text-gray-500 mt-5 text-left">{post.paragraph}</p>

          {/* Check if image exists before rendering */}
          {post?.image && (
            <div className="relative mt-6 w-full rounded-lg overflow-hidden">
              <Image
                src={post.image || null}
                alt={post.title || "Service Image"}
                width={800}
                height={400}
                className="w-full h-[400px] object-cover rounded-lg"
                unoptimized
              />
            </div>
          )}

          <p className="mt-5">{post.description}</p>
        </section>

        {/* Sidebar */}
        <aside className="w-full lg:w-1/3 p-5 pt-24 rounded-lg shadow-md border order-2">
          {/* Add Extra Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Add Extra</h2>
            <ul className="space-y-2">
              {[
                { id: 101, title: "Extra Service 1" },
                { id: 102, title: "Extra Service 2" },
                { id: 103, title: "Extra Service 3" },
                { id: 104, title: "Extra Service 4" },
                { id: 105, title: "Extra Service 5" },
              ].map((demo) => (
                <li
                  key={demo.id}
                  className="border p-2 rounded hover:bg-gray-200 cursor-pointer transition-colors"
                >
                  <Link href={`/demo/${demo.id}`} className="flex justify-between items-center">
                    <span className="text-black">{demo.title}</span>
                    <span className="text-blue-500">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* All Services Section */}
          <h2 className="text-xl font-semibold mb-4 mt-6">All Services</h2>
          <ul className="space-y-2">
            {data.map((service) => (
              <li
                key={service.id}
                className="border p-2 rounded hover:bg-gray-200 cursor-pointer transition-colors"
              >
                <Link href={`/services/${service.id}`} className="flex justify-between items-center">
                  {service.title}
                  <span className="text-blue-500">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* Additional Content */}
      <div className="mt-12 border p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center">
          {post.details?.finalHeading || "No Heading Available"}
        </h1>
        <p className="text-lg mt-2 text-center">
          {post.details?.finalParagraph || "No Description Available"}
        </p>

        {/* Check if sections exist before mapping */}
        {post.sections && post.sections.length > 0 ? (
          post.sections.map((section, index) => (
            <div key={index} className="p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
                {section.heading}
              </h2>
              <ReactMarkdown className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {section.content}
              </ReactMarkdown>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">No additional content available.</p>
        )}
      </div>
    </main>
  );
}