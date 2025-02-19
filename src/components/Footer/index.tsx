"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="p-10 bg-[#800000] text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Premium Services */}
        <div>
          <h2 className="font-bold mb-4">Premium Astrology Services</h2>
          <ul>
            <li><Link href="/kundli">Premium Personalized Kundli</Link></li>
            <li><Link href="/consultation">Book Astrology Consultation Call</Link></li>
            <li><Link href="/fortune-report">Fortune Report</Link></li>
            <li><Link href="/kundali-matching">Kundali Matching</Link></li>
          </ul>
        </div>

        {/* Our Courses */}
        <div>
          <h2 className="font-bold mb-4">Astrology & Numerology Courses</h2>
          <ul>
            <li><Link href="/courses/numerology-basic">Basic Numerology Course</Link></li>
            <li><Link href="/courses/astrology-basic">Basic Astrology Course</Link></li>
            <li><Link href="/courses/numerology-advanced">Advanced Numerology Course</Link></li>
            <li><Link href="/courses/astrology-advanced">Advanced Astrology Course</Link></li>
            <li><Link href="/courses/mobile-numerology">Mobile Numerology Course</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-bold mb-4">Quick Links</h2>
          <ul>
            <li><Link href="/horoscope">Daily Horoscope</Link></li>
            <li><Link href="/numerology-2025">Numerology 2025 Predictions</Link></li>
            <li><Link href="/rudraksha-calculator">Free Lucky Rudraksha Calculator</Link></li>
            <li><Link href="/collaborate">Collaborate With Us</Link></li>
            <li><Link href="/news">Latest Astrology News</Link></li>
            <li><Link href="/blog">Astrology & Numerology Blogs</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h2 className="font-bold mb-4">Subscribe To Our Astrology Newsletter</h2>
          <p className="mb-2 text-sm">Get the latest astrology insights, numerology predictions, and exclusive offers.</p>
          <div className="mb-4">
            <input className="p-2 w-full text-black" placeholder="Enter Your Email" type="email" />
            <button className="bg-orange-500 text-white p-2 mt-2 w-full">Subscribe →</button>
          </div>
          <p>
            <strong>Astro Arun Pandit</strong> is one of the <strong>best astrologers in India</strong> with 49+ years of expertise in <strong>Vedic Astrology, Numerology, and Palmistry</strong>.
          </p>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-10 border-t border-gray-500 pt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          
          {/* Contact Details */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <Image
              src="https://storage.googleapis.com/a1aa/image/73c7xmthcVttxfI8SeHu6XDA8JM8_i52199JHpr3Au4.jpg"
              alt="Astro Arun Pandit - Best Astrologer in India"
              width={100}
              height={50}
              className="mx-auto md:mx-0 mb-4"
            />
            <p><strong>Contact Details</strong></p>
            <p>📞 <a href="tel:+917236936903">+91-7236936903</a>, <a href="tel:+916391923456">+91-63919 23456</a></p>
            <p><strong>Occult Gurukul</strong> – Advanced Astrology Learning</p>
            <p>📞 <a href="tel:+917236936903">+91-7236936903 (Sales)</a></p>
          </div>

          {/* Policies and Social Media */}
          <div className="text-center md:text-right">
            <p className="mb-4">
              <Link href="/help">Help</Link> | 
              <Link href="/terms"> Terms & Services</Link> | 
              <Link href="/privacy-policy"> Privacy Policy</Link> | 
              <Link href="/refund-policy"> Refund Policy</Link>
            </p>
            <p>© {new Date().getFullYear()} <strong>Astro Arun Pandit</strong>. All Rights Reserved.</p>
            
            {/* Social Media Icons */}
            <div className="flex justify-center md:justify-end space-x-4 mt-4">
              <Link href="https://facebook.com"><i className="fab fa-facebook-f" aria-label="Facebook"></i></Link>
              <Link href="https://twitter.com"><i className="fab fa-twitter" aria-label="Twitter"></i></Link>
              <Link href="https://youtube.com"><i className="fab fa-youtube" aria-label="YouTube"></i></Link>
              <Link href="https://linkedin.com"><i className="fab fa-linkedin-in" aria-label="LinkedIn"></i></Link>
              <Link href="https://instagram.com"><i className="fab fa-instagram" aria-label="Instagram"></i></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
