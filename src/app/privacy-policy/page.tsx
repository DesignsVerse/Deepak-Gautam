// pages/privacy.jsx
"use client";
import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

export default function PrivacyPolicy() {
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
      title: '1. Introduction',
      content:
        'Welcome to [Your App/Service Name]! This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our services. Your privacy is important to us, and we are committed to safeguarding it.',
    },
    {
      id: 2,
      title: '2. Information We Collect',
      content: (
        <>
          <p className="leading-relaxed">
            We collect various types of information to provide and improve our services, including:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Personal Information: Name, email address, and contact details you provide.</li>
            <li>Usage Data: Information about how you interact with our service, such as IP address, browser type, and pages visited.</li>
            <li>Cookies: We use cookies to enhance your experience and track usage patterns.</li>
          </ul>
        </>
      ),
    },
    {
      id: 3,
      title: '3. How We Use Your Information',
      content:
        'We use your information to operate, maintain, and improve our services, communicate with you, and comply with legal obligations. This includes personalizing your experience and analyzing usage trends.',
    },
    {
      id: 4,
      title: '4. Sharing Your Information',
      content:
        'We do not sell your personal information. We may share it with trusted third parties (e.g., service providers) only to assist in delivering our services or as required by law.',
    },
    {
      id: 5,
      title: '5. Data Security',
      content:
        'We implement reasonable security measures to protect your information from unauthorized access, loss, or misuse. However, no system is completely secure, and we cannot guarantee absolute security.',
    },
    {
      id: 6,
      title: '6. Your Rights',
      content: (
        <p className="leading-relaxed">
          You have the right to access, update, or delete your personal information. To exercise these rights, please contact us at{' '}
          <a href="mailto:support@yourdomain.com" className="text-[#800000] hover:underline">
            support@yourdomain.com
          </a>.
        </p>
      ),
    },
    {
      id: 7,
      title: '7. Changes to This Policy',
      content:
        'We may update this Privacy Policy from time to time. Changes will be posted here with an updated "Last Updated" date. Your continued use of the service signifies acceptance of the revised policy.',
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
  }, []);

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      <Head>
        <title>Privacy Policy | Your App</title>
        <meta name="description" content="Privacy Policy for Your App" />
      </Head>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50"
        style={{ scaleX, backgroundColor: '#800000', transformOrigin: '0%' }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 mt-16 bg-white/90 backdrop-blur-md shadow-md z-20">
        <div className="max-w-7xl mx-auto py-6 px-6">
          <h1 className="text-4xl font-bold" style={{ color: '#800000' }}>
            Privacy Policy
          </h1>
          <p className="text-gray-600 mt-2">
            <strong></strong>
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl  mt-20 mx-auto flex px-6 pt-24 pb-8">
        {/* Sidebar with Search and TOC */}
        <aside className="hidden md:block w-1/4 pr-6 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="mb-6">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search policy..."
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
                      {section.content}
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
        
      </footer>
    </div>
  );
}