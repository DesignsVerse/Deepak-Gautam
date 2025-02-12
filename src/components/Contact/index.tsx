'use client';
import { useState } from "react";
import Image from "next/image";

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
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "82495069-61df-41f2-8dee-8380a0fa117c",
          name: formData.name,
          email: formData.email,
          message: formData.message,
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
    <section id="contact" className="overflow-hidden py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full lg:w-1/2 xl:w-1/2 p-4">
            <div className="rounded-sm bg-[#F9F9F2] px-6 py-8 shadow-lg sm:p-[40px] lg:px-6 xl:p-[40px]">
              <h2 className="mb-3 text-2xl font-bold text-black sm:text-3xl lg:text-2xl xl:text-3xl">
                सहायता चाहिए? संपर्क करें
              </h2>
              <p className="mb-8 text-base font-medium text-gray-600">
                हमारी सपोर्ट टीम जल्द ही ईमेल के माध्यम से आपसे संपर्क करेगी।
              </p>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {isSubmitted ? (
                <p className="text-green-500 font-medium">आपका फ़ॉर्म सफलतापूर्वक सबमिट हो गया!</p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col space-y-4">
                    <div>
                      <label htmlFor="name" className="mb-2  block text-sm font-medium text-dark">
                        आपका नाम
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="अपना नाम दर्ज करें"
                        className="border border-gray-400 w-full rounded-sm bg-white px-4 py-2 text-base outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-dark">
                        आपका ईमेल
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="अपना ईमेल दर्ज करें"
                        className="border border-gray-400 w-full rounded-sm bg-white px-4 py-2 text-base outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium text-dark">
                        आपका संदेश
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="अपना संदेश लिखें"
                        className="border border-gray-400 w-full resize-none rounded-sm bg-white px-4 py-2 text-base outline-none focus:border-black"
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className={`rounded-sm px-6 py-3 text-base font-medium text-white shadow-lg duration-300 ${
                          loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-black hover:bg-gray-800"
                        }`}
                        disabled={loading}
                      >
                        {loading ? "सबमिट हो रहा है..." : "फ़ॉर्म सबमिट करें"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/2 xl:w-1/2 flex justify-center items-center p-4">
            <Image src="/images/contact.jpeg" alt="संपर्क करें" width={500} height={400} className="rounded-sm object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;