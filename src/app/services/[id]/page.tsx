import Image from "next/image";
import { notFound } from "next/navigation";
import data from "@/data/services.json";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";

// Define TypeScript interface for params
interface Params {
  id: string;
}

// Generate Metadata for SEO
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = data.find((post) => post.id === parseInt(params.id));
  if (!post) {
    return {
      title: "Service Not Found | Pandit Deepak Goutam",
      description: "The requested service was not found. Explore expert Kaal Sarp Puja and astrology services by Pandit Deepak Goutam in Ujjain.",
    };
  }

  return {
    title: `${post.title} - Pandit Deepak Goutam | Kaal Sarp Puja Ujjain`,
    description: `${post.paragraph.slice(0, 150)}... Learn more about this Kaal Sarp Dosha Nivaran service by Pandit Deepak Goutam in Ujjain.`,
    keywords: `${post.title}, ujjain kaal sarp, pandit deepak goutam, kaal sarp puja ujjain, kaal sarp dosha nivaran, astrology, religious rituals`,
    robots: "index, follow",
    authors: [{ name: "Pandit Deepak Goutam" }],
    alternates: {
      canonical: `https://www.deepakgautam.com/services/${params.id}`,
    },
    openGraph: {
      title: `${post.title} - Pandit Deepak Goutam`,
      description: `${post.paragraph.slice(0, 150)}... Expert Kaal Sarp Puja and astrology service by Pandit Deepak Goutam in Ujjain.`,
      images: [
        {
          url: post.image || "/images/default-service.jpg",
          width: 800,
          height: 400,
          alt: `${post.title} - Pandit Deepak Goutam Service`,
        },
      ],
      url: `https://www.deepakgautam.com/services/${params.id}`,
      type: "website",
    },
  };
}

export default async function ServicePost({ params }: { params: Params }) {
  const post = data.find((post) => post.id === parseInt(params.id));
  if (!post) return notFound();

  return (
    <main className="mt-[140px] max-w-7xl mb-20 mx-auto px-4 sm:px-6 lg:px-8">
      {/* Add Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content + Additional Content */}
        <section className="lg:col-span-2 border rounded-lg shadow-md p-6">
          {/* Main Content */}
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h1 className="md:text-4xl text-xl sm:text-3xl font-bold">{post.title}</h1>
              <a
                href="tel:+919153164444"
                className="bg-[#800000] text-white px-2 py-1 w-32 sm:px-3 sm:py-1 md:px-4 md:py-2 md:w-40 rounded-lg hover:bg-[#660000] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
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

            <p className="mt-6 text-lg text-gray-700 leading-relaxed">{post.description}</p>

            {/* Additional Content */}
            <div className="mt-12">
              {post.sections && post.sections.length > 0 ? (
                post.sections.map((section, index) => (
                  <div key={index} className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">{section.heading}</h2>
                    <ReactMarkdown className="text-lg text-gray-700 leading-relaxed">
                      {section.content}
                    </ReactMarkdown>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 mt-4">No additional content available.</p>
              )}
              {/* Moved paragraph to the end */}
              <h1 className="text-xl font-bold mt-4">
                {post.details?.finalHeading || "No Heading Available"}
              </h1>
              <p className="text-lg mt-2">{post.details?.finalParagraph || "No details available."}</p>
            </div>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="lg:col-span-1 p-5 rounded-lg shadow-md border sticky top-[140px] max-h-[calc(100vh-160px)] overflow-y-auto">
          {parseInt(params.id) === data[0].id && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Additional Kaal Sarp Services</h2>
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
                ].map((demo) => (
                  <li
                    key={demo.id}
                    className="border p-2 rounded hover:bg-gray-200 cursor-pointer transition-colors"
                  >
                    <Link
                      href={`/kaal-sarp-dosh-/${demo.id}`}
                      className="flex justify-between items-center"
                    >
                      <span className="text-black">{demo.title}</span>
                      <span className="text-blue-500">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
  );
}

// Generate static params for pre-rendering
export async function generateStaticParams() {
  return data.map((post) => ({
    id: post.id.toString()
