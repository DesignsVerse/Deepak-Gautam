// app/additional-services/[id]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import additionalServices from "@/data/additional-services.json";
import ReactMarkdown from "react-markdown";
import Image from "next/image"; // Added for optimized image handling

export async function generateMetadata({ params }) {
  const service = additionalServices.find((s) => s.id === parseInt(params.id));
  if (!service) {
    return { title: "Service Not Found | Deepak Gautam" };
  }

  return {
    title: `${service.title} | Deepak Gautam`,
    description: service.description.slice(0, 150) + "...",
  };
}

export default function AdditionalServicePage({ params }) {
  const service = additionalServices.find((s) => s.id === parseInt(params.id));
  if (!service) return notFound();

  return (
    <main className="mt-[140px] max-w-7xl mx-auto mb:p-6 p-4">
      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content + Additional Content */}
        <section className="lg:col-span-2 border mb:p-6 p-2 rounded-lg shadow-md">
          {/* Main Content */}
          <div>
            <h1 className="text-4xl font-bold text-left">{service.title}</h1>
            <p className="text-gray-500 mt-5 text-left">{service.paragraph || service.description}</p>
          </div>

          {/* Dynamic Image */}
          {service.image && (
            <div className="mt-6">
              <Image
                src={service.image}
                alt={`${service.title} image`}
                width={800}
                height={400}
                className="rounded-lg object-cover w-full"
                priority={true} // Optional: for faster loading of above-the-fold images
              />
            </div>
          )}

          {/* Additional Content */}
          <div className="mt-12">
            <h1 className="text-3xl font-bold text-center">
              {service.details?.finalHeading || "कोई शीर्षक उपलब्ध नहीं"}
            </h1>
            <p className="text-lg mt-2 text-center">
              {service.details?.finalParagraph || "कोई विवरण उपलब्ध नहीं"}
            </p>

            {service.sections && service.sections.length > 0 ? (
              service.sections.map((section, index) => (
                <div key={index} className="mb:p-8 p-2 rounded-xl">
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
          <h2 className="text-xl font-semibold mb-4">अन्य अतिरिक्त सेवाएँ</h2>
          <ul className="space-y-2">
            {additionalServices.map((demo) => (
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
        </aside>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return additionalServices.map((service) => ({
    id: service.id.toString(),
  }));
}