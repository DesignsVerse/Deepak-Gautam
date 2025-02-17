'use client';
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";
import Link from "next/link";

const Blog = () => {
  return (
    <section id="blog" className="bg-[#FDF7F4] from-yellow-50  to-orange-100 py-10 md:py-14 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionTitle
          title="ताज़ा खबर"
          paragraph="बगलामुखी से संबंधित नवीन समाचार के लिए हमारे न्यूज़ सेक्शन को विजिट करें-"
          center
        />

        <section className="pb-[]">
          <div className="container">
            <div className="flex flex-wrap mt-10 justify-between gap-6">
              {blogData.map((blog) => (
                <div
                  key={blog.id}
                  className="w-full md:w-[30%] flex-shrink-0 rounded-2xl text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-white shadow-md"
                >
                  <SingleBlog blog={blog} />
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Link href="/blog">
                <button className="bg-[#800000] text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-500 transition-all duration-300 hover:scale-105">
                  View More
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Blog;
