"use client";
import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("कृपया सभी फ़ील्ड भरें।");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "YOUR_ACCESS_KEY",
          ...formData,
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError("सबमिट करने में असफल। कृपया बाद में पुनः प्रयास करें।");
      }
    } catch {
      setError("नेटवर्क समस्या। कृपया अपना इंटरनेट कनेक्शन जांचें।");
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Head>
        <title>हमसे संपर्क करें - सहायता प्राप्त करें</title>
        <meta name="description" content="अगर आपको सहायता चाहिए, तो हमसे संपर्क करें।" />
      </Head>

      <section className="flex flex-col w-full gap-10 md:flex-row bg-[#A24439] p-4 md:p-12 rounded-lg shadow-lg max-w-6xl mx-auto">
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md mb-4 md:mb-0">
          <div className="mb-6">
            <FaMapMarkerAlt className="text-[#800000] text-xl inline-block mr-2" />
            <h2 className="text-lg font-semibold">Address</h2>
            <p>Surkhet, NP12, Bherendranagar 06</p>
          </div>
          <div className="mb-6">
            <FaPhoneAlt className="text-[#800000] text-xl inline-block mr-2" />
            <h2 className="text-lg font-semibold">Phone</h2>
            <p>+0098 9893 5647</p>
            <p>+0096 3434 5678</p>
          </div>
          <div>
            <FaEnvelope className="text-[#800000] text-xl inline-block mr-2" />
            <h2 className="text-lg font-semibold">Email</h2>
            <p>codinglab@gmail.com</p>
            <p>info.codinglab@gmail.com</p>
          </div>
        </div>

        <div className="w-full md:w-2/3 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-black mb-4">Send us a message</h1>
          <p className="text-black mb-6">If you have any queries, feel free to reach out to us.</p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {isSubmitted ? (
            <p className="text-green-500 font-medium">आपका फ़ॉर्म सफलतापूर्वक सबमिट हो गया!</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000]" />
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000]" />
              <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Enter your message" className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000]"></textarea>
              <button type="submit" className={`w-full bg-[#800000] text-white p-2 rounded-md ${loading ? "opacity-50" : "hover:bg-black"}`} disabled={loading}>{loading ? "सबमिट हो रहा है..." : "Send Now"}</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default Contact;
