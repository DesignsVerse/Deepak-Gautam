import BlogSection from "@/components/Blog/Blog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Head from "next/head";

const BlogPage = () => {
  // Structured Data for Blog Listing (Schema.org)
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Deepak Gautam के ब्लॉग और लेख",
    description:
      "Deepak Gautam द्वारा वेबसाइट डेवलपमेंट, डिजिटल मार्केटिंग, और पर्सनल ब्रांडिंग पर नवीनतम ब्लॉग और लेख।",
    url: "https://www.deepakgautam.com/blog",
    // Add actual blog items dynamically if possible from BlogSection data
  };

  return (
    <>
      <Head>
        <title>ब्लॉग और लेख | Deepak Gautam - SEO और डिजिटल मार्केटिंग विशेषज्ञ</title>
        <meta
          name="description"
          content="Deepak Gautam के नवीनतम ब्लॉग और लेख पढ़ें—वेबसाइट डेवलपमेंट, SEO, डिजिटल मार्केटिंग, और पर्सनल ब्रांडिंग पर विशेषज्ञ सुझाव और इंडस्ट्री ट्रेंड्स।"
        />
        <meta
          name="keywords"
          content="Deepak Gautam, ब्लॉग, वेबसाइट डेवलपमेंट, डिजिटल मार्केटिंग, SEO, पर्सनल ब्रांडिंग, ऑनलाइन रणनीति"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Deepak Gautam" /> {/* ✅ Added author */}
        <link rel="canonical" href="https://www.deepakgautam.com/blog" /> {/* ✅ Updated domain */}

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="ब्लॉग और लेख | Deepak Gautam - डिजिटल मार्केटिंग विशेषज्ञ"
        />
        <meta
          property="og:description"
          content="Deepak Gautam के ब्लॉग में वेबसाइट डेवलपमेंट, SEO, और पर्सनल ब्रांडिंग पर नवीनतम लेख। इंडस्ट्री ट्रेंड्स के साथ अपडेट रहें।"
        />
        <meta property="og:url" content="https://www.deepakgautam.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.deepakgautam.com/images/blog-og-image.jpg" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="ब्लॉग और लेख | Deepak Gautam"
        />
        <meta
          name="twitter:description"
          content="Deepak Gautam के ब्लॉग में वेबसाइट डेवलपमेंट, SEO, और डिजिटल मार्केटिंग पर विशेषज्ञ लेख।"
        />
        <meta
          name="twitter:image"
          content="https://www.deepakgautam.com/images/blog-twitter-image.jpg"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
        />
      </Head>

      <Breadcrumb
        pageName="ब्लॉग और लेख"
        description="Deepak Gautam के नवीनतम ब्लॉग और लेख देखें—वेबसाइट डेवलपमेंट, SEO, और डिजिटल मार्केटिंग पर विशेषज्ञ सुझाव।"
      />
      <BlogSection />
    </>
  );
};

export default BlogPage;