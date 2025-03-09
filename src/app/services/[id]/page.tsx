import Image from "next/image";
import { notFound } from "next/navigation";
import data from "@/data/services.json";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

// Define TypeScript interface for params
interface Params {
  id: string;
}

export default async function ServicePost({ params }: { params: Params }) {
  const post = data.find((post) => post.id === parseInt(params.id));
  if (!post) return notFound();

  // Structured Data for SEO
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: post.title,
    description: `${post.paragraph} Expert service by Pandit Deepak Goutam in Ujjain for Kaal Sarp Dosha Nivaran.`,
    provider: {
      "@type": "Person",
      name: "Pandit Deepak Goutam",
    },
    url: `https://www.deepakgautam.com/services/${params.id}`,
    image: post.image || "/images/default-service.jpg",
    areaServed: {
      "@type": "City",
      name: "Ujjain",
    },
  };

  return (
    <main className="mt-[140px] max-w-7xl mb-20 mx-auto px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 border rounded-lg shadow-md p-6">
          <div>
            <h1 className="md:text-4xl text-xl sm:text-3xl font-bold">{post.title}</h1>
            <p className="text-gray-500 mt-8 text-lg leading-relaxed">{post.paragraph}</p>

            {post?.image && (
              <div className="relative mt-6 w-full rounded-lg overflow-hidden">
                <Image
                  src={post.image}
                  alt={`${post.title} - Pandit Deepak Goutam Service`}
                  width={800}
                  height={400}
                  className="w-full h-[400px] object-cover rounded-lg"
                  unoptimized
                />
              </div>
            )}

            <p className="mt-6 text-lg text-gray-700 leading-relaxed">{post.description}</p>

            {post.sections?.map((section, index) => (
              <div key={index} className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{section.heading}</h2>
                <ReactMarkdown className="text-lg text-gray-700 leading-relaxed">
                  {section.content}
                </ReactMarkdown>
              </div>
            ))}

            <h1 className="text-xl font-bold mt-4">{post.details?.finalHeading || "No Heading Available"}</h1>
            <p className="text-lg mt-2">{post.details?.finalParagraph || "No details available."}</p>
          </div>
        </section>

        <aside className="lg:col-span-1 p-5 rounded-lg shadow-md border sticky top-[140px] max-h-[calc(100vh-160px)] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">All Services</h2>
          <ul className="space-y-2">
            {data.map((service) => (
              <li key={service.id} className="border p-2 rounded hover:bg-gray-200 cursor-pointer transition-colors">
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

export async function generateStaticParams() {
  return data.map((post) => ({
    id: post.id.toString(),
  }));
}