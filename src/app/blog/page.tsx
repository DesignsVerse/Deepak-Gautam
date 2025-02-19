import BlogSection from "@/components/Blog/1";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Head from "next/head";

const BlogPage = () => {
  return (
    <>
      <Head>
        <title>समाचार | ब्लॉग और लेख</title>
        <meta
          name="description"
          content="वेबसाइट डेवलपमेंट, डिजिटल मार्केटिंग, और पर्सनल ब्रांडिंग पर नवीनतम ब्लॉग और लेख पढ़ें। इंडस्ट्री ट्रेंड्स के साथ अपडेट रहें।"
        />
        <meta name="keywords" content="ब्लॉग, वेबसाइट डेवलपमेंट, डिजिटल मार्केटिंग, SEO, पर्सनल ब्रांडिंग" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourwebsite.com/blog" />

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content="समाचार | ब्लॉग और लेख" />
        <meta
          property="og:description"
          content="वेबसाइट डेवलपमेंट, डिजिटल मार्केटिंग, और पर्सनल ब्रांडिंग पर नवीनतम ब्लॉग और लेख पढ़ें।"
        />
        <meta property="og:url" content="https://yourwebsite.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://yourwebsite.com/og-image.jpg" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="समाचार | ब्लॉग और लेख" />
        <meta
          name="twitter:description"
          content="वेबसाइट डेवलपमेंट, डिजिटल मार्केटिंग, और पर्सनल ब्रांडिंग पर नवीनतम ब्लॉग और लेख पढ़ें।"
        />
        <meta name="twitter:image" content="https://yourwebsite.com/twitter-image.jpg" />
      </Head>

      <Breadcrumb pageName="ब्लॉग और लेख" description="हमारे नए ब्लॉग और लेख देखो!" />
      <BlogSection />
    </>
  );
};

export default BlogPage;
