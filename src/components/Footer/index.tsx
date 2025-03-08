"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

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
          {/* Left Column - Important Links */}
          <div>
            <h2 className="text-xl font-bold mb-4">Important Links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="hover:text-orange-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Center Column - Important Services */}
          <div>
            <h2 className="text-xl font-bold mb-4">Important Services</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/1" className="hover:text-orange-400 transition-colors">
                  Kaal Sarp Dosh Puja
                </Link>
              </li>
              <li>
                <Link href="/services/2" className="hover:text-orange-400 transition-colors">
                  Mangal Dosh Pujan
                </Link>
              </li>
              <li>
                <Link href="/services/3" className="hover:text-orange-400 transition-colors">
                Rudrabhishek
                </Link>
              </li>
              <li>
                <Link href="/services/4" className="hover:text-orange-400 transition-colors">
                Laghu Rudrabhishek
                </Link>
              </li>
              <li>
                <Link href="/services/5" className="hover:text-orange-400 transition-colors">
                Mahamrityunjay Jaap
                </Link>
              </li>
              <li>
                <Link href="/services/6" className="hover:text-orange-400 transition-colors">
                Mahamrityunjay Pujan
                </Link>
              </li>
              <li>
                <Link href="/services/7" className="hover:text-orange-400 transition-colors">
                Ark Vivah
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange-400 transition-colors">
                  All Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column - Kaal Sarp Dosh Services with Links */}
          <div>
            <h2 className="text-xl font-bold mb-4">Kaal Sarp Dosh Services</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/kaal-sarp-dosh-/101" className="hover:text-orange-400 transition-colors">
                  Anant Kaal Sarp Dosh
                </Link>
              </li>
              <li>
                <Link href="/kaal-sarp-dosh-/102" className="hover:text-orange-400 transition-colors">
                  Kulik Kaal Sarp Dosh
                </Link>
              </li>
              <li>
                <Link href="/kaal-sarp-dosh-/103" className="hover:text-orange-400 transition-colors">
                  Vasuki Kaal Sarp Dosh
                </Link>
              </li>
              <li>
                <Link href="/kaal-sarp-dosh-/104" className="hover:text-orange-400 transition-colors">
                  Shankhpal Kaal Sarp Dosh
                </Link>
              </li>
              <li>
                <Link href="/kaal-sarp-dosh-/105" className="hover:text-orange-400 transition-colors">
                  Padma Kaal Sarp Dosh
                </Link>
              </li>
              <li>
                <Link href="/kaal-sarp-dosh-/106" className="hover:text-orange-400 transition-colors">
                  Mahapadma Kaal Sarp Dosh
                </Link>
              </li>
              <li>
                <Link href="/kaal-sarp-dosh-/107" className="hover:text-orange-400 transition-colors">
                  Takshak Kaal Sarp Dosh
                </Link>
              </li>
              <li>
                <Link href="/kaal-sarp-dosh-/108" className="hover:text-orange-400 transition-colors">
                  Karkotak Kaal Sarp Dosh
                </Link>
              </li>
              <li>
                <Link href="/kaal-sarp-dosh-/109" className="hover:text-orange-400 transition-colors">
                  Shankhchud Kaal Sarp Dosh
                </Link>
              </li>
              
              <li>
                <Link href="/kaal-sarp-dosh-/110" className="hover:text-orange-400 transition-colors">
                  Vishdhar Kaal Sarp Dosh
                </Link>
              </li>
              <li>
                <Link href="/kaal-sarp-dosh-/112" className="hover:text-orange-400 transition-colors">
                  Sheshnag Kaal Sarp Dosh
                </Link>
              </li>
              <li>
                <Link href="/kaal-sarp-dosh-/111" className="hover:text-orange-400 transition-colors">
                Patak Kaal Sarp Dosh
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription with Call Now */}
          <div>
            <h2 className="text-xl  font-bold mb-4">Subscribe To Our Newsletter</h2>
            <p className="text-sm text-left">
              Get the latest astrology insights, numerology predictions, and exclusive offers.
            </p>
            
            <button
              className="w-full mt-4 bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition-colors"
            
            >
              <a href="tel:+919153164444" className="hover:text-orange-400">Call Now</a>
              
            </button>
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
                src="/images/logo/logo-2.png"
                alt="ujjain-kal-sarp"
                width={100}
                height={50}
                className="mx-auto md:mx-0 mb-4"
              />
              <p><strong>Contact Details</strong></p>
              <p>
                📞 
                <a href="tel:+919153164444" className="hover:text-orange-400">+91-9153164444</a>
              </p>
            </div>

            {/* Policies and Social Media */}
            <div className="text-center md:text-right">
              <p className="mb-4 space-x-4">
                <Link href="/" className="hover:text-orange-400">Help</Link>
                <span>|</span>
                <Link href="/" className="hover:text-orange-400">Terms & Services</Link>
                <span>|</span>
                <Link href="/" className="hover:text-orange-400">Privacy Policy</Link>
                
              </p>
              <p>© {new Date().getFullYear()} <strong>DesignsVerse</strong>. All Rights Reserved.</p>

              {/* Social Media Icons */}
              <div className="flex justify-center md:justify-end space-x-4 mt-4">
                <Link href="https://facebook.com" className="hover:text-orange-400 transition-colors">
                  <FaFacebookF />
                </Link>
                
                <Link href="https://www.youtube.com/@Astrodeepak4444" className="hover:text-orange-400 transition-colors">
                  <FaYoutube />
                </Link>
                <Link href="https://linkedin.com" className="hover:text-orange-400 transition-colors">
                  <FaLinkedinIn />
                </Link>
                <Link href="https://www.instagram.com/astro.deepakgoutam" className="hover:text-orange-400 transition-colors">
                  <FaInstagram />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}