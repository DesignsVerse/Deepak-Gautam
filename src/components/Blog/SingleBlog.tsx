'use client'
import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { id,image ,title, paragraph, author, publishDate } = blog;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Link href={`/blog/${id}`} className="block">
        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="p-4 text-left">
        <p className="text-sm text-gray-500">{author.name} - {publishDate}</p>
        <h2 className="text-xl font-bold text-gray-900 mt-2">
          <Link href={`/blog/${id}`} className="hover:text-[#D55F26]">
            {title}
          </Link>
        </h2>
        <p className="text-gray-700 mt-2">{paragraph}</p>
        <Link href={`/blog/${id}`} className="text-[#D55F26] font-semibold mt-4 inline-flex items-center">
        आगे पढ़ें <ArrowRight className="ml-2" size={18} />
        </Link>
      </div>
    </div>
  );
};

export default SingleBlog;
