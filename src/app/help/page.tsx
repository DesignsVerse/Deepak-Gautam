// pages/help.jsx
"use client";
import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

export default function Help() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const sectionRefs = useRef([]);

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
    document.getElementById(`section-${sectionId}`).scrollIntoView({ behavior: 'smooth' });
  };

  const sections = [
    {
      id: 1,
      title: '1. How do I get started with [Your App/Service Name]?',
      content:
        'To get started, sign up on our website by providing your email and creating a password. Once registered, you can log in and explore the dashboard to access all features. Check out our quick-start guide in the app for step-by-step instructions!',
    },
    {
      id: 2,
      title: '2. What should I do if I forget my password?',
      content: (
        <>
          <p className="leading-relaxed">
            If you forget your password, follow these steps:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Go to the login page and click {"\"Forgot Password?\""}</li>
            <li>Enter your registered email address.</li>
            <li>Check your inbox for a reset link and follow the instructions.</li>
          </ul>
          <p className="leading-relaxed mt-2">
            If you don’t receive the email, check your spam folder or contact support.
          </p>
        </>
      ),
    },
    {
      id: 3,
      title: '3. How can I contact support?',
      content:
        'You can reach our support team by emailing us at <a href="mailto:support@yourdomain.com" className="text-[#800000] hover:underline">support@yourdomain.com</a>. We’re available 24/7 to assist with any issues or questions!',
    },
    {
      id: 4,
      title: '4. Is my data secure with [Your App/Service Name]?',
      content:
        'Yes, we take data security seriously. We use encryption and other industry-standard measures to protect your information. For more details, see our <a href="/privacy" className="text-[#800000] hover:underline">Privacy Policy</a>.',
    },
    {
      id: 5,
      title: '5. Can I cancel my subscription?',
      content:
        'Absolutely! You can cancel your subscription anytime from your account settings. Go to "Billing," select "Cancel Subscription," and follow the prompts. Your access will continue until the end of the current billing cycle.',
    },
    {
      id: 6,
      title: '6. What are the system requirements?',
      content:
        'Our service works on any modern web browser (Chrome, Firefox, Safari, Edge) and requires an internet connection. For the best experience, ensure your browser is up to date.',
    },
  ];

  // Filter sections based on search query
  const filteredSections = sections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof section.content === 'string' && section.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Scrollspy to detect active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(parseInt(entry.target.id.split('-')[1]));
          }
        });
      },
      { threshold: 0.5 }
    );
    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, [filteredSections]); // Re-run when filtered sections change

  return (
    <div className="min-h-screen mt-20 font-sans bg-gray-50">
      <Head>
        <title>Help | Your App</title>
        <meta name="description" content="Help and Support for Your App" />
      </Head>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50"
        style={{ scaleX, backgroundColor: '#800000', transformOrigin: '0%' }}
      />

      {/* Header */}
      <header className="fixed top-0 mt-20 left-0 right-0 bg-white/90 backdrop-blur-md shadow-md z-20">
        <div className="max-w-7xl mx-auto py-6 px-6">
          <h1 className="text-4xl font-bold" style={{ color: '#800000' }}>
            Help & Support
          </h1>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto flex px-6 pt-24 pb-8">
        {/* Sidebar with Search and TOC */}
        <aside className="hidden md:block w-1/4 pr-6 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="mb-6">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search help..."
                className="w-full pl-10 pr-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#800000] transition-all"
              />
            </div>
          </div>
          <nav className="space-y-2">
            {filteredSections.map((section) => (
              <button
                key={section.id}
                onClick={() => toggleSection(section.id)}
                className={`w-full text-left py-2 px-4 rounded-md transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-[#800000] text-white'
                    : 'text-[#800000] hover:bg-gray-100'
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4 space-y-8">
          <AnimatePresence>
            {filteredSections.map((section, index) => (
              <motion.section
                key={section.id}
                id={`section-${section.id}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6 }}
                className="bg-white/70 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-gray-200"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full text-left p-6 flex justify-between items-center font-semibold text-xl transition-all duration-300 hover:bg-gray-100/50"
                  style={{ color: '#800000' }}
                >
                  {section.title}
                  <motion.span
                    animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl"
                  >
                    {expandedSection === section.id ? '−' : '+'}
                  </motion.span>
                </button>
                <AnimatePresence>
                  {expandedSection === section.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="p-6 text-gray-800 bg-gray-50/70"
                    >
                      <motion.div
                        className="h-1 bg-[#800000] rounded-full mb-4"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                      {typeof section.content === 'string' ? (
                        <div dangerouslySetInnerHTML={{ __html: section.content }} />
                      ) : (
                        section.content
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>
            ))}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto p-6 text-center">
        <p className="mt-4 text-gray-600">
          Related: <a href="/Terms-&-Services" className="text-[#800000] hover:underline">Terms of Service</a> |{' '}
          <a href="/privacy-policy" className="text-[#800000] hover:underline">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
}