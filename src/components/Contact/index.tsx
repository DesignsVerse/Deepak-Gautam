"use client";
import { useState } from "react";
import Head from "next/head";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion"; // For animations

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
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("कृपया वैध ईमेल पता दर्ज करें।");
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

      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#A24439] to-[#800000] p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row gap-8 max-w-6xl w-full bg-white rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Contact Info Section */}
          <div className="w-full md:w-1/3 p-8 bg-gradient-to-b from-[#800000] to-[#A24439] text-white">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6">हमसे संपर्क करें</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold">पता</h3>
                    <p>Surkhet, NP12, Bherendranagar 06</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaPhoneAlt className="text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold">फोन</h3>
                    <p>+0098 9893 5647</p>
                    <p>+0096 3434 5678</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold">ईमेल</h3>
                    <p>codinglab@gmail.com</p>
                    <p>info.codinglab@gmail.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-2/3 p-8">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-3xl font-bold text-[#800000] mb-4"
            >
              हमें एक संदेश भेजें
            </motion.h1>
            <p className="text-gray-600 mb-6">कोई प्रश्न? हमसे संपर्क करने में संकोच न करें।</p>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 mb-4"
              >
                {error}
              </motion.p>
            )}

            {isSubmitted ? (
              <motion.p
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-green-600 font-semibold text-lg"
              >
                आपका फ़ॉर्म सफलतापूर्वक सबमिट हो गया!
              </motion.p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="अपना नाम दर्ज करें"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000] transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="अपना ईमेल दर्ज करें"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000] transition-all duration-300"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="अपना संदेश दर्ज करें"
                  
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000] transition-all duration-300 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full bg-[#800000] text-white p-3 rounded-md font-semibold transition-all duration-300 ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#A24439]"
                  }`}
                  disabled={loading}
                >
                  {loading ? "सबमिट हो रहा है..." : "अभी भेजें"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Contact;