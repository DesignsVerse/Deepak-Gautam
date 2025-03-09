import BlogSection from "@/components/Blog/Blog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Head from "next/head";

const BlogPage = () => {
  // Structured Data for Blog Listing (Schema.org)
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Pandit Deepak Gautam Ji's Blogs on Ujjain Kaal Sarp Dosh and Astrology",
    description:
      "Read expert blogs by Pandit Deepak Gautam Ji on Ujjain Kaal Sarp Dosh, astrology remedies, and Vedic rituals. Get insights into effective solutions for Kaal Sarp Yog.",
    url: "https://www.ujjainkalsarp.com/blog",
  };

  return (
    <>
      <Head>
        <title>Blogs on Kaal Sarp Dosh & Astrology | Pandit Deepak Gautam Ji - Ujjain</title>
        <meta
          name="description"
          content="Read blogs by Pandit Deepak Gautam Ji on Kaal Sarp Dosh puja in Ujjain, astrology remedies, and Vedic rituals. Get expert insights into resolving Kaal Sarp Yog."
        />
        <meta
          name="keywords"
          content="Kaal Sarp Dosh, Kaal Sarp Yog, Ujjain Kaal Sarp, Pandit Deepak Gautam Ji, astrology remedies, Kaal Sarp Puja in Ujjain, Ujjain astrologer, Vedic astrology"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Pandit Deepak Gautam Ji" />
        <link rel="canonical" href="https://www.ujjainkalsarp.com/blog" />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Blogs on Kaal Sarp Dosh  | Pandit Deepak Gautam Ji - Ujjain"
        />
        <meta
          property="og:description"
          content="Explore Pandit Deepak Gautam Ji’s expert insights on Kaal Sarp Dosh remedies, Ujjain Kaal Sarp Puja, and Vedic astrology solutions."
        />
        <meta property="og:url" content="https://www.ujjainkalsarp.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.ujjainkalsarp.com/images/blog-og-image.jpg" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
        />
      </Head>

      <Breadcrumb
        pageName="Kaal Sarp DoshBlogs"
        description="Explore expert blogs by Pandit Deepak Gautam Ji on Kaal Sarp Dosh puja in Ujjain, astrology remedies, and Vedic rituals for spiritual well-being."
      />
      <BlogSection />
    </>
  );
};

export default BlogPage;
