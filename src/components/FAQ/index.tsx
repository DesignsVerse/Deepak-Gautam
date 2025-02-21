"use client";

import React, { useState } from "react";

const FAQItem = ({ item, isOpen, toggle }) => {
  const renderAnswer = () => {
    if (!item.link || !item.linkText) return <p>{item.answer}</p>;
    const parts = item.answer.split("{link}");
    return (
      <p>
        {parts[0]}
        <a href={item.link} className="text-blue-600 hover:underline">
          {item.linkText}
        </a>
        {parts[1]}
      </p>
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/faq#${item.id}`);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="border border-red-200 rounded-lg p-4 text-lg transition-all">
      <button
        className="w-full text-left font-semibold text-[#800000] flex justify-between items-center focus:outline-none text-lg md:text-xl"
        onClick={() => toggle(item.id)}
        aria-expanded={isOpen}
      >
        <span>
          {item.question} <span className="ml-2"></span>
        </span>
        <span>{isOpen ? "↑" : "↓"}</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="p-4 text-gray-700 text-base">{renderAnswer()}</div>
        <button
          onClick={handleCopyLink}
          className="text-sm text-blue-500 hover:underline mb-2"
        >
          Copy Link to this FAQ
        </button>
      </div>
    </div>
  );
};

const Faq = () => {
  const [open, setOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const faqItems = [
    {
      id: 1,
      category: "Consultation",
      question: "How can I book an astrology consultation call with Astro Deepak Gautam?",
      answer:
        "You can book an astrology consultation call with Astro Deepak Gautam by visiting our {link}. Simply select your preferred time slot, provide your birth details (date, time, and place), and complete the payment process. Our team will confirm your appointment via email or WhatsApp within 24 hours.",
      link: "/consultation",
      linkText: "Astrology Consultation Booking Page",
    },
    {
      id: 2,
      category: "Courses",
      question: "Does Astro Deepak Gautam offer astrology courses online?",
      answer:
        "Yes, Astro Deepak Gautam offers comprehensive online astrology courses including Kundali reading, Vedic astrology basics, advanced numerology, and palmistry techniques. Visit our {link} to explore course details, syllabus, duration, and enrollment steps. Start your journey to mastering astrology today!",
      link: "/courses",
      linkText: "Astrology Courses Page",
    },
    {
      id: 3,
      category: "Show",
      question: "What is 'The Deepak Gautam Show' and what topics does it cover?",
      answer:
        "'The Deepak Gautam Show' is a unique platform where Astro Deepak Gautam discusses astrology, personal growth, spiritual awakening, and practical life solutions. Topics include detailed Kundali analysis, numerology predictions, planetary influences on daily life, remedies for doshas, and guidance for career, relationships, and health.",
      link: "",
      linkText: "",
    },
    {
      id: 4,
      category: "Consultation",
      question: "What are the fees for an astrology consultation?",
      answer:
        "The consultation fees vary based on session type: Rs. 1500 for a 30-minute basic session, Rs. 2500 for a 60-minute detailed session, and Rs. 5000 for a premium package including follow-ups. Check our {link} for the latest pricing and offers.",
      link: "/consultation",
      linkText: "Consultation Pricing Page",
    },
    {
      id: 5,
      category: "Courses",
      question: "Are certificates provided after completing astrology courses?",
      answer:
        "Yes, upon successful completion of any course by Astro Deepak Gautam, you will receive a digital certificate of completion, authenticated by our institute. Visit the {link} to see sample certificates and course completion criteria.",
      link: "/courses",
      linkText: "Courses Page",
    },
  ];

  const toggleAnswer = (id) => {
    setOpen(open === id ? null : id);
  };

  const categories = ["All", ...new Set(faqItems.map((item) => item.category))];

  const filteredFaqs = faqItems.filter((item) => {
    const matchesSearch = [item.question, item.answer, item.linkText]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="w-full mt-10 mb-10 max-w-5xl mx-auto p-4 sm:p-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#800000] mb-6">
        Frequently Asked Questions (FAQs) – Deepak Gautam Pandit
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search FAQs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-2/3 text-base focus:outline-none focus:ring-2 focus:ring-[#800000]"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-1/3 text-base focus:outline-none focus:ring-2 focus:ring-[#800000]"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={open === item.id}
              toggle={toggleAnswer}
            />
          ))
        ) : (
          <p className="text-gray-700 text-base">No results found.</p>
        )}
      </div>
    </section>
  );
};

export default Faq;