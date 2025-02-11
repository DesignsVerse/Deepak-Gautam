import { FC } from "react";
import Image from 'next/image';

interface BlogDetailProps {
  blog: {
    id: any;
    title: string;
    image: string;
    paragraph: string;
    author: { name: string; image: string; designation: string };
    tags: string[];
    publishDate: string;
  };
}

const BlogDetail: FC<BlogDetailProps> = ({ blog }) => {
  return (
    <section className="pb-20 pt-10">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-primary">{blog.title}</h1>
        <p className="mt-2 text-sm text-gray-600">Published on {blog.publishDate}</p>
        <Image
          src={blog.image} // Dynamically loaded image path
          alt={blog.title} // Image alt text
          width={1200} // Set the width of the image (you can adjust as needed)
          height={800} // Set the height of the image (you can adjust as needed)
          className="mt-8 w-full rounded-lg" // Retain the styling for full width and rounded corners
          layout="intrinsic" // Ensures the image is displayed with its intrinsic aspect ratio
        />
        <p className="mt-6 text-lg text-body-color">{blog.paragraph}</p>
        <div className="mt-6 flex items-center">
        <Image
            src={blog.author.image} // Dynamically loaded image path
            alt={blog.author.name} // Image alt text
            width={40} // Set the width of the image
            height={40} // Set the height of the image
            className="rounded-full" // Class to keep the round shape
          />
          <div className="ml-4">
            <h4 className="text-sm font-semibold">{blog.author.name}</h4>
            <p className="text-xs text-gray-500">{blog.author.designation}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
