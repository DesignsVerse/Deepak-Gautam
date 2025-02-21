"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000); // Reset after 3 seconds
    }
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <footer className="bg-[#800000] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={footerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Premium Services */}
          <div>
            <h2 className="text-xl font-bold mb-4">Premium Astrology Services</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/kundli" className="hover:text-orange-400 transition-colors">Premium Personalized Kundli</Link></li>
              <li><Link href="/consultation" className="hover:text-orange-400 transition-colors">Book Astrology Consultation Call</Link></li>
              <li><Link href="/fortune-report" className="hover:text-orange-400 transition-colors">Fortune Report</Link></li>
              <li><Link href="/kundali-matching" className="hover:text-orange-400 transition-colors">Kundali Matching</Link></li>
            </ul>
          </div>

          {/* Our Courses */}
          <div>
            <h2 className="text-xl font-bold mb-4">Astrology & Numerology Courses</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/courses/numerology-basic" className="hover:text-orange-400 transition-colors">Basic Numerology Course</Link></li>
              <li><Link href="/courses/astrology-basic" className="hover:text-orange-400 transition-colors">Basic Astrology Course</Link></li>
              <li><Link href="/courses/numerology-advanced" className="hover:text-orange-400 transition-colors">Advanced Numerology Course</Link></li>
              <li><Link href="/courses/astrology-advanced" className="hover:text-orange-400 transition-colors">Advanced Astrology Course</Link></li>
              <li><Link href="/courses/mobile-numerology" className="hover:text-orange-400 transition-colors">Mobile Numerology Course</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/horoscope" className="hover:text-orange-400 transition-colors">Daily Horoscope</Link></li>
              <li><Link href="/numerology-2025" className="hover:text-orange-400 transition-colors">Numerology 2025 Predictions</Link></li>
              <li><Link href="/rudraksha-calculator" className="hover:text-orange-400 transition-colors">Free Lucky Rudraksha Calculator</Link></li>
              <li><Link href="/collaborate" className="hover:text-orange-400 transition-colors">Collaborate With Us</Link></li>
              <li><Link href="/news" className="hover:text-orange-400 transition-colors">Latest Astrology News</Link></li>
              <li><Link href="/blog" className="hover:text-orange-400 transition-colors">Astrology & Numerology Blogs</Link></li>
              <li><Link href="/contact" className="hover:text-orange-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h2 className="text-xl font-bold mb-4">Subscribe To Our Newsletter</h2>
            <p className="text-sm mb-4">Get the latest astrology insights, numerology predictions, and exclusive offers.</p>
            {subscribed ? (
              <p className="text-green-400 mb-4">Subscribed Successfully!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="w-full p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition-colors"
                >
                  Subscribe →
                </button>
              </form>
            )}
            <p className="mt-4 text-sm">
              <strong>Deepak Gautam</strong> is one of the <strong>best astrologers in India</strong> with 49+ years of expertise in <strong>Vedic Astrology, Numerology, and Palmistry</strong>.
            </p>
          </div>
        </motion.div>

        {/* Footer Bottom Section */}
        <div className="mt-12 border-t border-gray-500 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Contact Details */}
            <div className="text-center md:text-left">
              <Image
                src="https://storage.googleapis.com/a1aa/image/73c7xmthcVttxfI8SeHu6XDA8JM8_i52199JHpr3Au4.jpg"
                alt="Deepak Gautam - Best Astrologer in India"
                width={100}
                height={50}
                className="mx-auto md:mx-0 mb-4"
              />
              <p><strong>Contact Details</strong></p>
              <p>📞 <a href="tel:+917236936903" className="hover:text-orange-400">+91-7236936903</a>, <a href="tel:+916391923456" className="hover:text-orange-400">+91-63919 23456</a></p>
              <p><strong>Occult Gurukul</strong> – Advanced Astrology Learning</p>
              <p>📞 <a href="tel:+917236936903" className="hover:text-orange-400">+91-7236936903 (Sales)</a></p>
            </div>

            {/* Policies and Social Media */}
            <div className="text-center md:text-right">
              <p className="mb-4 space-x-4">
                <Link href="/help" className="hover:text-orange-400">Help</Link>
                <span>|</span>
                <Link href="/terms" className="hover:text-orange-400">Terms & Services</Link>
                <span>|</span>
                <Link href="/privacy-policy" className="hover:text-orange-400">Privacy Policy</Link>
                <span>|</span>
                <Link href="/refund-policy" className="hover:text-orange-400">Refund Policy</Link>
              </p>
              <p>© {new Date().getFullYear()} <strong>DesignsVerse</strong>. All Rights Reserved.</p>

              {/* Social Media Icons */}
              <div className="flex justify-center md:justify-end space-x-4 mt-4">
                <Link href="https://facebook.com" className="hover:text-orange-400 transition-colors"><FaFacebookF /></Link>
                <Link href="https://twitter.com" className="hover:text-orange-400 transition-colors"><FaTwitter /></Link>
                <Link href="https://youtube.com" className="hover:text-orange-400 transition-colors"><FaYoutube /></Link>
                <Link href="https://linkedin.com" className="hover:text-orange-400 transition-colors"><FaLinkedinIn /></Link>
                <Link href="https://instagram.com" className="hover:text-orange-400 transition-colors"><FaInstagram /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}