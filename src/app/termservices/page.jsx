// pages/terms.jsx
"use client";
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion'; // Enhanced animations
import { FaMoon, FaSun } from 'react-icons/fa'; // Icons for dark mode toggle

export default function TermsOfService() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
    document.getElementById(`section-${section}`).scrollIntoView({ behavior: 'smooth' });
  };

  const sections = [
    {
      id: 1,
      title: '1. Acceptance of Terms',
      content:
        'Welcome to [Your App/Service Name]! By accessing or using our service, you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please refrain from using our service.',
    },
    {
      id: 2,
      title: '2. Use of the Service',
      content: (
        <>
          <p className="leading-relaxed">
            You agree to use the service only for lawful purposes and in accordance with these Terms. Prohibited activities include, but are not limited to:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Violating any applicable laws or regulations.</li>
            <li>Harassing or harming others.</li>
            <li>Attempting to gain unauthorized access to our systems.</li>
          </ul>
          <p className="leading-relaxed mt-2">
            We reserve the right to terminate or suspend your access at our sole discretion, with or without notice, for any violation of these Terms.
          </p>
        </>
      ),
    },
    {
      id: 3,
      title: '3. Intellectual Property',
      content:
        'All content, trademarks, and materials provided through the service are owned by [Your Company Name] or its licensors and are protected by intellectual property laws. You may not reproduce, distribute, or modify any part of the service without prior written consent.',
    },
    {
      id: 4,
      title: '4. Limitation of Liability',
      content:
        'To the fullest extent permitted by law, [Your Company Name] shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.',
    },
    {
      id: 5,
      title: '5. Changes to These Terms',
      content:
        'We may update these Terms from time to time. Any changes will be posted on this page with an updated "Last Updated" date. Your continued use of the service after such changes constitutes acceptance of the revised Terms.',
    },
    {
      id: 6,
      title: '6. Contact Us',
      content: (
        <p className="leading-relaxed">
          If you have any questions about these Terms, please contact us at{' '}
          <a
            href="mailto:support@yourdomain.com"
            className="text-[#800000] hover:underline transition-colors duration-200"
          >
            support@yourdomain.com
          </a>.
        </p>
      ),
    },
  ];

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen mt-20 font-sans transition-colors duration-500 '}`}>
      <Head>
        <title>Terms of Service | Your App</title>
        <meta name="description" content="Terms of Service for Your App" />
      </Head>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50"
        style={{ scaleX, backgroundColor: '#800000', transformOrigin: '0%' }}
      />

      {/* Sticky Header */}
      <header className="sticky top-0 bg-white dark:bg-gray-800 shadow-md z-10">
        <div className="max-w-7xl mx-auto py-6 px-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold" style={{ color: '#800000' }}>
              Terms And Service
            </h1>
            
            
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex px-6 py-8">
        {/* Sidebar Navigation */}
        <aside className="hidden md:block w-1/4 pr-6 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => toggleSection(section.id)}
                className={`w-full text-left py-2 px-4 rounded-md transition-all duration-300 ${
                  expandedSection === section.id
                    ? 'bg-[#800000] text-white'
                    : 'text-[#800000] hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4 space-y-8">
          {sections.map((section) => (
            <motion.section
              key={section.id}
              id={`section-${section.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: section.id * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full text-left p-6 flex justify-between items-center font-semibold text-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
              {expandedSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="p-6 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700"
                >
                  {section.content}
                </motion.div>
              )}
            </motion.section>
          ))}
        </main>
      </div>

      {/* Footer CTA */}
      <footer className="max-w-7xl mx-auto p-6 text-center">
        
      </footer>
    </div>
  );
}