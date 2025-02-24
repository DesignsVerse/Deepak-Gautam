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
      question: "How can I book a Kaal Sarp Dosh Puja consultation in Ujjain?",
      answer:
        "You can book a Kaal Sarp Dosh Puja consultation in Ujjain by visiting our {link}. Choose your preferred date, provide birth details, and complete the payment. Our team will confirm your appointment via WhatsApp or email within 24 hours.",
      link: "https://wa.me/919153164444?text=Namaste!!%20Mujhe%20Consult%20krna%20hai",
      linkText: "Kaal Sarp Dosh Puja Consultation",
    },
    {
      id: 2,
      category: "Courses",
      question:
        "Does Astro Deepak Gautam offer astrology courses on Kaal Sarp Dosh Nivaran?",
      answer:
        "Yes, we provide online astrology courses on Kaal Sarp Dosh Nivaran, Mangal Dosh remedies, and Grahan Dosh effects. Visit {link} to check the syllabus, duration, and enrollment steps.",
      link: "https://wa.me/919153164444?text=Namaste!!%20Mujhe%20Consult%20krna%20hai",
      linkText: "Astrology Courses",
    },
    {
      id: 3,
      category: "Show",
      question: "What is 'The Deepak Gautam Show' about?",
      answer:
        "The Deepak Gautam Show covers astrology, Vedic remedies, and personal growth. Topics include Kaal Sarp Dosh effects, Kundali analysis, Navgraha Dosh solutions, and powerful mantras for success.",
      link: "https://wa.me/919153164444?text=Namaste!!%20Mujhe%20Consult%20krna%20hai",
      linkText: "",
    },
    {
      id: 4,
      category: "Consultation",
      question:
        "What are the consultation charges for Kaal Sarp Dosh Puja guidance?",
      answer:
        "The fees depend on session type: Rs. 1500 for basic guidance, Rs. 2500 for a detailed Kundali analysis, and Rs. 5000 for a premium package with remedies. Visit {link} for updated prices.",
      link: "https://wa.me/919153164444?text=Namaste!!%20Mujhe%20Consult%20krna%20hai",
      linkText: "Consultation Pricing",
    },
    {
      id: 5,
      category: "Courses",
      question:
        "Are certificates provided after completing astrology courses?",
      answer:
        "Yes, after finishing any astrology course, you will receive an authenticated digital certificate. Check {link} for sample certificates and completion details.",
      link: "https://wa.me/919153164444?text=Namaste!!%20Mujhe%20Consult%20krna%20hai",
      linkText: "Course Completion Certificate",
    },
    {
      id: 6,
      category: "Muhurt",
      question:
        "What is the importance of Kaal Sarp Dosh Puja Muhurt in Ujjain?",
      answer:
        "Performing the puja on an auspicious Kaal Sarp Dosh Puja Muhurt in Ujjain ensures effective results. Our experts guide you in selecting the best dates based on planetary alignments.",
      link: "https://wa.me/919153164444?text=Namaste!!%20Mujhe%20Consult%20krna%20hai",
      linkText: "",
    },
    {
      id: 7,
      category: "Marriage",
      question: "How does Mangal Dosh affect marriage, and what is the remedy?",
      answer:
        "Mangal Dosh can delay marriage and create relationship issues. Performing Mangal Dosh Pujan in Ujjain neutralizes its effects, ensuring a harmonious married life.",
      link: "https://wa.me/919153164444?text=Namaste!!%20Mujhe%20Consult%20krna%20hai",
      linkText: "",
    },
    {
      id: 8,
      category: "Dosh",
      question: "What are the effects of Grahan Dosh, and how to remove it?",
      answer:
        "Grahan Dosh impacts career and health. Performing Surya Grahan Dosh Puja in Ujjain reduces its negative effects. Our astrology experts suggest personalized remedies for long-term relief.",
      link: "https://wa.me/919153164444?text=Namaste!!%20Mujhe%20Consult%20krna%20hai",
      linkText: "",
    },
    {
      id: 9,
      category: "Wealth",
      question:
        "What is the significance of Rudrabhishek in Ujjain for wealth and peace?",
      answer:
        "Rudrabhishek in Ujjain is a powerful remedy for financial stability and inner peace. It removes Kaal Sarp Dosh and attracts prosperity by pleasing Lord Shiva.",
      link: "https://wa.me/919153164444?text=Namaste!!%20Mujhe%20Consult%20krna%20hai",
      linkText: "",
    },
    {
      id: 10,
      category: "Pitru Dosh",
      question: "Which puja is best for removing ancestral Pitru Dosh?",
      answer:
        "Amavasya Shanti Puja in Ujjain is highly effective in resolving Pitru Dosh. It helps in bringing peace to ancestors and removing financial or family troubles.",
      link: "https://wa.me/919153164444?text=Namaste!!%20Mujhe%20Consult%20krna%20hai",
      linkText: "",
    },
    {
      id: 11,
      category: "Consultation",
      question: "Can I get a consultation for career growth through astrology?",
      answer:
        "Yes, we offer career-focused astrology consultations to analyze planetary influences on your professional life. Book a session at {link} for personalized guidance.",
      link: "https://wa.me/919153164444?text=Namaste!!%20Mujhe%20Consult%20krna%20hai",
      linkText: "Career Consultation",
    },
    {
      id: 12,
      category: "Courses",
      question: "Are there beginner-level astrology courses available?",
      answer:
        "Absolutely! We offer beginner-friendly courses covering basics like Kundali reading and planetary effects. Check out {link} for details.",
      link: "https://wa.me/919153164444?text=Namaste!!%20Mujhe%20Consult%20krna%20hai",
      linkText: "Beginner Astrology Courses",
    },
    {
      id: 13,
      category: "Health",
      question: "How can astrology help improve my health?",
      answer:
        "Astrology identifies planetary impacts on health. Remedies like Chandra Grahan Puja or specific mantras can mitigate negative effects for better well-being.",
      link: "https://wa.me/919153164444?text=Namaste!!%20Mujhe%20Consult%20krna%20hai",
      linkText: "",
    },
    {
      id: 14,
      category: "Wealth",
      question: "Which puja is best for attracting business success?",
      answer:
        "Laxmi Puja in Ujjain is highly recommended for business prosperity. It aligns planetary energies to boost financial growth and success.",
      link: "https://wa.me/919153164444?text=Namaste!!%20Mujhe%20Consult%20krna%20hai",
      linkText: "",
    },
    {
      id: 15,
      category: "Marriage",
      question: "Can astrology predict my marriage timing?",
      answer:
        "Yes, through Kundali analysis, we can predict marriage timing based on planetary positions. Book a consultation for a detailed report.",
      link: "https://wa.me/919153164444?text=Namaste!!%20Mujhe%20Consult%20krna%20hai",
      linkText: "",
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

  // Limit to first 5 items initially or when filters are applied
  const displayedFaqs =
    searchQuery === "" && categoryFilter === "All"
      ? faqItems.slice(0, 5) // Show only first 5 when no filters
      : filteredFaqs; // Show all filtered results when filters are applied

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
        {displayedFaqs.length > 0 ? (
          displayedFaqs.map((item) => (
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