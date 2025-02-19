"use client";

import React, { useState } from "react";

const Faq = () => {
  const [open, setOpen] = useState(null);

  const toggleAnswer = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section className="w-full mt-10 mb-10 max-w-4xl mx-auto p-6 text-center">
      <h2 className="text-4xl font-bold text-[#800000] mb-8">
        Frequently Asked Questions (FAQs) – Astro Arun Pandit
      </h2>
      <div className="space-y-6">
        {/* FAQ Item 1 */}
        <div className="border border-red-200 rounded-lg p-6 text-xl">
          <button
            className="w-full text-left text-2xl font-semibold text-[#800000] flex justify-between items-center"
            onClick={() => toggleAnswer(1)}
            aria-expanded={open === 1}
          >
            How can I book an astrology consultation call with Astro Arun Pandit?
            <i className={`fas ${open === 1 ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
          </button>
          {open === 1 && (
            <div className="p-4 text-gray-700 text-lg">
              <p>
                You can book an astrology consultation call with{" "}
                <strong>Astro Arun Pandit</strong> by visiting our{" "}
                <a href="#" className="text-blue-600">
                  Astrology Consultation Booking Page
                </a>
                . You will find all the details about available time slots, consultation fees, and how to schedule an appointment.
              </p>
            </div>
          )}
        </div>

        {/* FAQ Item 2 */}
        <div className="border border-red-200 rounded-lg p-6 text-xl">
          <button
            className="w-full text-left text-2xl font-semibold text-[#800000] flex justify-between items-center"
            onClick={() => toggleAnswer(2)}
            aria-expanded={open === 2}
          >
            Does Astro Arun Pandit offer astrology courses online?
            <i className={`fas ${open === 2 ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
          </button>
          {open === 2 && (
            <div className="p-4 text-gray-700 text-lg">
              <p>
                Yes, <strong>Astro Arun Pandit</strong> provides <strong>online astrology courses</strong> covering Kundali reading, Vedic astrology, numerology, and palmistry. Visit our{" "}
                <a href="#" className="text-blue-600">
                  Astrology Courses Page
                </a>{" "}
                to enroll and start learning.
              </p>
            </div>
          )}
        </div>

        {/* FAQ Item 3 */}
        <div className="border border-red-200 rounded-lg p-6 text-xl">
          <button
            className="w-full text-left text-2xl font-semibold text-[#800000] flex justify-between items-center"
            onClick={() => toggleAnswer(3)}
            aria-expanded={open === 3}
          >
            What is &quot;The Arun Pandit Show&quot; and what topics does it cover?
            <i className={`fas ${open === 3 ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
          </button>
          {open === 3 && (
            <div className="p-4 text-gray-700 text-lg">
              <p>
                <strong>&quot;The Arun Pandit Show&quot;</strong> is a special platform where <strong>Astro Arun Pandit</strong> shares expert insights on astrology, personal growth, spiritual awakening, and overcoming life challenges. The show covers topics such as <strong>Kundali reading, numerology predictions, planetary effects, and astrology-based life guidance.</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Faq;
