import Image from "next/image";
import { notFound } from "next/navigation";
import data from "@/data/services.json";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";

export async function generateMetadata({ params }) {
  const post = data.find((post) => post.id === parseInt(params.id));
  if (!post) {
    return { title: "Service Not Found | Deepak Gautam" };
  }

  return {
    title: `${post.title} | Deepak Gautam - वेब डेवलपमेंट और डिजिटल मार्केटिंग विशेषज्ञ`,
    description:
      post.paragraph.slice(0, 150) + "..." || "Deepak Gautam से इस सेवा के बारे में और जानें।",
    keywords: `${post.title}, Deepak Gautam, वेबसाइट डेवलपमेंट, डिजिटल मार्केटिंग, SEO, पर्सनल ब्रांडिंग, सेवा`,
    robots: "index, follow",
    authors: [{ name: "Deepak Gautam" }],
    alternates: {
      canonical: `https://www.deepakgautam.com/services/${params.id}`,
    },
    openGraph: {
      title: `${post.title} | Deepak Gautam`,
      description: post.paragraph.slice(0, 150) + "..." || "Deepak Gautam की विशेषज्ञ सेवा।",
      images: [
        {
          url: post.image || "/images/default-service.jpg",
          width: 800,
          height: 400,
          alt: `${post.title} - Deepak Gautam Service`,
        },
      ],
      url: `https://www.deepakgautam.com/services/${params.id}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Deepak Gautam`,
      description: post.paragraph.slice(0, 150) + "...",
      image: post.image || "/images/default-service.jpg",
    },
  };
}

export default async function ServicePost({ params }) {
  const post = data.find((post) => post.id === parseInt(params.id));
  if (!post) return notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: post.title,
    description: post.paragraph,
    provider: {
      "@type": "Person",
      name: "Deepak Gautam",
    },
    url: `https://www.deepakgautam.com/services/${params.id}`,
    image: post.image || "/images/default-service.jpg",
  };

  return (
    <main className="mt-[140px] max-w-7xl mx-auto p-4">
      {/* Add Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content + Additional Content */}
        <section className="lg:col-span-2 mb:border p-3 rounded-lg shadow-md">
          {/* Main Content */}
          <div>
            <h1 className="text-4xl font-bold text-left">{post.title}</h1>
            <p className="text-gray-500 mt-5 text-left">{post.paragraph}</p>

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

            <p className="mt-5">{post.description}</p>
          </div>

          {/* Additional Content */}
          <div className="mt-12">
            <h1 className="text-3xl font-bold text-center">
              {post.details?.finalHeading || "कोई शीर्षक उपलब्ध नहीं"}
            </h1>
            <p className="text-lg mt-2 text-center">
              {post.details?.finalParagraph || "कोई विवरण उपलब्ध नहीं"}
            </p>

            {post.sections && post.sections.length > 0 ? (
              post.sections.map((section, index) => (
                <div key={index} className=" rounded-xl">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
                    {section.heading}
                  </h2>
                  <ReactMarkdown className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {section.content}
                  </ReactMarkdown>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-4">कोई अतिरिक्त सामग्री उपलब्ध नहीं।</p>
            )}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="lg:col-span-1 p-5 rounded-lg shadow-md border sticky top-[140px] max-h-[calc(100vh-160px)] overflow-y-auto">
          {parseInt(params.id) === data[0].id && (
            <div>
              <h2 className="text-xl font-semibold mb-4">अतिरिक्त सेवाएँ</h2>
              <ul className="space-y-2">
                {[
                  { id: 101, title: "अनंत कालसर्प दोष" },
                  { id: 102, title: "कुलिक कालसर्प दोष" },
                  { id: 103, title: "वासुकी कालसर्प दोष " },
                  { id: 104, title: "शंखचूड़ कालसर्प दोष" },
                  { id: 105, title: "पद्म कालसर्प दोष" },
                  { id: 106, title: "महापद्म कालसर्प दोष" },
                  { id: 107, title: "तक्षक कालसर्प दोष:" },
                  { id: 108, title: "कर्कोटक कालसर्प दोष" },
                  { id: 109, title: "शंखनाद कालसर्प दोष" },
                  { id: 110, title: "विषधर कालसर्प दोष" },
                
                  { id: 112, title: "शेषनाग कालसर्प दोष" },
                  { id: 111, title: "पातक कालसर्प दोष" },
                ].map((demo) => (
                  <li
                    key={demo.id}
                    className="border p-2 rounded hover:bg-gray-200 cursor-pointer transition-colors"
                  >
                    <Link href={`/additional-services/${demo.id}`} className="flex justify-between items-center">
                      <span className="text-black">{demo.title}</span>
                      <span className="text-blue-500">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <h2 className="text-xl font-semibold mb-4 mt-6">सभी सेवाएँ</h2>
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
    </main>
  );
}