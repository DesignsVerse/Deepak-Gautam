'use client';
import React, { useState } from 'react';

const Faq = () => {
  const [open, setOpen] = useState(null);

  const toggleAnswer = (index) => {
    setOpen(open === index ? null : index);
  };

  return ( 
    <div className="w-full mt-10 mb-10 max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold text-[#800000] mb-8">FAQ&apos;s</h1>
      <div className="space-y-6">
        <div className="border border-red-200 rounded-lg p-6 text-xl">
          <button
            className="w-full text-left text-2xl font-semibold text-[#800000] flex justify-between items-center"
            onClick={() => toggleAnswer(1)}
          >
            How can I book a consultation call with Astro Arun Pandit?
            <i className={`fas ${open === 1 ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </button>
          {open === 1 && (
            <div className="p-4 text-gray-700 text-lg">
              <p>
                You can book a consultation call with Astro Arun Pandit by visiting our{' '}
                <a href="#" className="text-blue-600">Consultation Call</a> page on the website. There, you&apos;ll find information on the available consultation options and how to schedule your appointment.
              </p>
            </div>
          )}
        </div>

        <div className="border border-red-200 rounded-lg p-6 text-xl">
          <button
            className="w-full text-left text-2xl font-semibold text-[#800000] flex justify-between items-center"
            onClick={() => toggleAnswer(2)}
          >
            Does Astro Arun Pandit provide astrology courses?
            <i className={`fas ${open === 2 ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </button>
          {open === 2 && (
            <div className="p-4 text-gray-700 text-lg">
              <p>Yes, Astro Arun Pandit provides online astrology courses. Check the courses page for more details.</p>
            </div>
          )}
        </div>

        <div className="border border-red-200 rounded-lg p-6 text-xl">
          <button
            className="w-full text-left text-2xl font-semibold text-[#800000] flex justify-between items-center"
            onClick={() => toggleAnswer(3)}
          >
            What is &quot;The Arun Pandit Show&quot;?
            <i className={`fas ${open === 3 ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </button>
          {open === 3 && (
            <div className="p-4 text-gray-700 text-lg">
              <p>
                &quot;The Arun Pandit Show&quot; is a platform where Astro Arun Pandit shares his expert insights on astrology, personal growth, and life challenges.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Faq;
