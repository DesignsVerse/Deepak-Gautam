import BlogSection from "@/components/Blog/1";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "समाचार",
  description:
    "Explore our latest blogs and articles on website development, digital marketing, and personal branding. Stay updated with our insightful content and industry trends."
};

const BlogPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="ब्लॉग और लेख "
        description="हमारे नए ब्लॉग और लेख देखो!"
      />
      <BlogSection />
    </>
  );
};

export default BlogPage;
