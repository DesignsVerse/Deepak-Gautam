// app/additional-services/[id]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import additionalServices from "@/data/additional-services.json";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Metadata } from "next";

// Generate Metadata for SEO
export async function generateMetadata({ params }) {
  const service = additionalServices.find((s) => s.id === parseInt(params.id));
  if (!service) {
    return {
      title: "Service Not Found | Pandit Deepak Goutam",
      description: "The requested service page was not found. Contact Pandit Deepak Goutam for Kaal Sarp Puja in Ujjain.",
    };
  }

  return {
    title: `${service.title} - Kaal Sarp Puja Ujjain`,
    description: `${service.description.slice(0, 150)}... Book your Kaal Sarp Dosha Nivaran with Pandit Deepak Goutam in Ujjain today!`,
    keywords: "ujjain kaal sarp, kaal sarp puja ujjain, deepak goutam pandit, kaal sarp dosha nivaran, spiritual rituals , काल सर्प दोष, काल सर्प योग, उज्जैन काल सर्प दोष, उज्जैन काल सर्प योग, काल सर्प दोष पूजा उज्जैन, उज्जैन काल सर्प पूजा, काल सर्प दोष निवारण पूजा उज्जैन",
    robots: "index, follow",
    alternates: {
      canonical: `https://www.ujjainkalsarp.com/kaal-sarp-dosh-/${params.id}`,
    },
    openGraph: {
      title: `${service.title} - Kaal Sarp Puja Ujjain | Pandit Deepak Goutam`,
      description: `${service.description.slice(0, 150)}... Contact Pandit Deepak Goutam for expert Kaal Sarp solutions.`,
      images: [
        {
          url: service.image || "/images/default-kaal-sarp-puja.jpg",
          width: 800,
          height: 400,
          alt: `${service.title} - Pandit Deepak Goutam`,
        },
      ],
      url: `https://www.ujjainkalsarp.com/kaal-sarp-dosh-/${params.id}`,
      type: "website",
    },
  };
}

export default function AdditionalServicePage({ params }) {
  const service = additionalServices.find((s) => s.id === parseInt(params.id));
  if (!service) return notFound();

  return (
    <main className="mt-[140px] max-w-7xl mx-auto p-4 md:p-6">
      {/* Breadcrumb for Navigation */}
      <nav className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">Home</Link> &gt; 
        <Link href="/services" className="text-blue-600 hover:underline">Services</Link> &gt; 
        <span className="text-gray-600">{service.title}</span>
      </nav>

      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content + Additional Content */}
        <section className="lg:col-span-2 p-6 border rounded-lg shadow-md">
          {/* Main Content */}
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                {service.title} - Pandit Deepak Goutam
              </h1>
              <a
                href="tel:+919153164444"
                className="bg-[#800000] text-white px-4 py-2 rounded-lg hover:bg-[#660000] transition-colors flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
            <p className="text-gray-600 mt-5 text-left leading-relaxed">
              {service.paragraph || service.description}
            </p>
          </div>

          {/* Dynamic Image */}
          {service.image && (
            <div className="mt-6">
              <Image
                src={service.image}
                alt={`${service.title} - Kaal Sarp Puja by Pandit Deepak Goutam`}
                width={800}
                height={400}
                className="rounded-lg object-cover w-full h-auto lg:h-[500px] lg:max-w-[800px]"
                priority={true}
              />
            </div>
          )}

          {/* Additional Content */}
          <div className="mt-12">
            {service.sections && service.sections.length > 0 ? (
              service.sections.map((section, index) => (
                <div key={index} className="p-4 rounded-xl">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    {section.heading}
                  </h2>
                  <ReactMarkdown className="text-lg text-gray-700 leading-relaxed">
                    {section.content}
                  </ReactMarkdown>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-4">No additional content available.</p>
            )}
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {service.details?.finalHeading || "Final Thoughts"}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {service.details?.finalParagraph || "Contact Pandit Deepak Goutam for more details about this service."}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link href="/contact" className="text-blue-600 hover:underline">
              Book Your Kaal Sarp Puja Now
            </Link>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="lg:col-span-1 p-5 rounded-lg shadow-md border sticky top-[140px] max-h-[calc(100vh-160px)] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Other Additional Services</h2>
          <ul className="space-y-2">
            {additionalServices.map((demo) => (
              <li
                key={demo.id}
                className="border p-2 rounded hover:bg-gray-100 transition-colors"
              >
                <Link href={`/kaal-sarp-dosh-/${demo.id}`} className="flex justify-between items-center">
                  <span className="text-gray-900">{demo.title}</span>
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