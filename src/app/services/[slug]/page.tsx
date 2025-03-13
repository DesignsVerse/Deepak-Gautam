// src/app/services/[slug]/page.tsx
"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import data from "@/data/services.json";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function ServicePost({ params }: { params: { slug: string } }) {
  console.log("Params in Detail Page:", params); // Check incoming slug
  console.log("Imported Data in Detail Page:", data); // Check data

  const post = data.find((post) => {
    const slugifiedTitle = post.title.toLowerCase().replace(/\s+/g, "-");
    console.log("Comparing in Detail:", slugifiedTitle, params.slug.toLowerCase()); // Debug comparison
    return slugifiedTitle === params.slug.toLowerCase();
  });

  console.log("Found Post:", post); // Check if post is found

  if (!post) {
    console.log("Post not found, triggering 404");
    return notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: post.title,
    description: post.paragraph,
    provider: {
      "@type": "Person",
      name: "Deepak Gautam",
    },
    url: `https://www.deepakgautam.com/services/${params.slug}`,
    image: post.image || "/images/default-service.jpg",
  };

  return (
    <main className="mt-[140px] max-w-7xl mb-20 mx-auto px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 border rounded-lg shadow-md p-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="md:text-4xl text-xl sm:text-3xl font-bold">{post.title}</h1>
              <a
                href="tel:+919153164444"
                className="bg-[#800000] text-white px-2 py-1 w-32 sm:px-3 sm:py-1 md:px-4 md:py-2 md:w-40 rounded-lg hover:bg-[#660000] transition-colors ml-2 sm:ml-3 md:ml-4 flex items-center justify-center gap-2 text-sm sm:text-base text-right"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 sm:h-5 w-4 sm:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Free Call
              </a>
            </div>
            <p className="text-gray-500 mt-8 text-lg leading-relaxed">{post.paragraph}</p>

            {post?.image && (
              <div className="relative mt-6 w-full rounded-lg overflow-hidden">
                <Image
                  src={post.image}
                  alt={`${post.title} - Deepak Gautam की सेवा`}
                  width={800}
                  height={400}
                  className="w-full h-[400px] object-cover rounded-lg"
                  unoptimized
                />
              </div>
            )}

            <p className="mt-6 text-lg text-gray-700 leading-relaxed">{post.description}</p>

            <div className="mt-12">
              {post.sections && post.sections.length > 0 ? (
                post.sections.map((section, index) => (
                  <div key={index} className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-">{section.heading}</h2>
                    <ReactMarkdown className="text-lg text-gray-700 leading-relaxed">
                      {section.content}
                    </ReactMarkdown>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 mt-4">कोई अतिरिक्त सामग्री उपलब्ध नहीं।</p>
              )}
              <h1 className="text-xl font-bold mt-4">
                {post.details?.finalHeading || "कोई शीर्षक उपलब्ध नहीं"}
              </h1>
              <p className="text-lg mt-">{post.details?.finalParagraph || "कोई विवरण उपलब्ध नहीं"}</p>
            </div>
          </div>
        </section>

        <aside className="lg:col-span-1 p-5 rounded-lg shadow-md border sticky top-[140px] max-h-[calc(100vh-160px)] overflow-y-auto">
          {post.id === data[0].id && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Additional Services</h2>
              <ul className="space-y-2">
                {[
                  { id: 101, title: "Anant Kaal Sarp Dosh" },
                  { id: 102, title: "Kulik Kaal Sarp Dosh" },
                  { id: 103, title: "Vasuki Kaal Sarp Dosh" },
                  { id: 104, title: "Shankhchud Kaal Sarp Dosh" },
                  { id: 105, title: "Padma Kaal Sarp Dosh" },
                  { id: 106, title: "Mahapadma Kaal Sarp Dosh" },
                  { id: 107, title: "Takshak Kaal Sarp Dosh" },
                  { id: 108, title: "Karkotak Kaal Sarp Dosh" },
                  { id: 109, title: "Shankhnaad Kaal Sarp Dosh" },
                  { id: 110, title: "Vishdhar Kaal Sarp Dosh" },
                  { id: 112, title: "Sheshnag Kaal Sarp Dosh" },
                  { id: 111, title: "Patak Kaal Sarp Dosh" },
                ].map((demo) => {
                  const slugifiedDemoTitle = demo.title.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <li
                      key={demo.id}
                      className="border p-2 rounded hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      <Link
                        href={`/kaal-sarp-dosh/${slugifiedDemoTitle}`}
                        className="flex justify-between items-center"
                      >
                        <span className="text-black">{demo.title}</span>
                        <span className="text-blue-500">→</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <h2 className="text-xl font-semibold mb-4 mt-6">All Services</h2>
          <ul className="space-y-2">
            {data.map((service) => {
              const slugifiedServiceTitle = service.title.toLowerCase().replace(/\s+/g, "-");
              return (
                <li
                  key={service.id}
                  className="border p-2 rounded hover:bg-gray-200 cursor-pointer transition-colors"
                >
                  <Link href={`/services/${slugifiedServiceTitle}`} className="flex justify-between items-center">
                    {service.title}
                    <span className="text-blue-500">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </main>
  );
}