import { notFound } from "next/navigation";
import data from "@/data/servicedata.json";
import Link from "next/link";

// Fetch metadata for SEO
export async function generateMetadata({ params }) {
  const post = data.find((post) => post.id === params.id);
  if (!post) return { title: "Service Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function ServicePost({ params }) {
  const post = data.find((post) => post.id === params.id);
  if (!post) {
    return notFound();
  }

  return (
    <main className="mt-[140px] max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main Content */}
        <section className="w-full lg:w-2/3 border p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-left">{post.title}</h1>
          <p className="text-gray-500 pl-1 text-left">{post.author}</p>

          {/* Image Section instead of Video */}
          {post.image && (
            <div className="relative mt-6 w-full rounded-lg overflow-hidden">
              <img 
                src={post.image} 
                alt="image" 
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>
          )}

          {/* Service Description */}
          <article className="prose lg:prose-xl justify-text text-left mt-6">
            <div className="text-justify" dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mt-8 border p-4 rounded-lg shadow-lg">
            {/* Small Video Section */}
            <div className="mt-5 relative w-[250px] h-[300px] rounded-lg overflow-hidden">
              <video 
                src={post.smallVideo} 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Content Section */}
            <div className="flex-1">
              <h3 className="text-2xl font-semibold">{post.heading}</h3>
              <ul className="text-black dark:text-gray-200 space-y-2 mt-2">
                {post.points?.map((point, index) => (
                  <li key={index} className="flex text-s items-start">
                    <span className="text-blue-500 mr-2">✔</span> 
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="w-full lg:w-1/3 p-5 pt-24 rounded-lg shadow-md order-2 lg:order-none">
          
          {/* All Services - Moved up */}
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

          {/* Sidebar Video */}
          

          {/* Download Brochure - Moved to the bottom of Sidebar */}
          <div className="p-4 bg-gradient-to-r from-[#c0392b] to-[#e67e22] text-white rounded-lg mt-6">
            <h3 className="text-lg font-semibold">कोई भी प्रश्न है?</h3>
            <p className="mt-3 text-sm text-white">
              बेझिझक हमसे संपर्क करें। हम जितनी जल्दी हो सकेगा आप को वापस संपर्क करेंगे।
              या अभी हमें फोन करें।
            </p>

            <div className="mt-4">
              <p className="text-sm text-white">कॉल करें: <span className="text-blue-300">+(91) 9810487266</span></p>
              <p className="text-sm text-white">मेल करें: <span className="text-blue-300">baglamukhisadhnapeeth@gmail.com</span></p>
            </div>
          </div>

        </aside>
      </div>
    </main>
  );
}
