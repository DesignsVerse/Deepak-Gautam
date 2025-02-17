import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="p-10 bg-[#800000] text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Premium Services */}
        <div>
          <h2 className="font-bold mb-4">Premium Services</h2>
          <ul>
            <li>Premium Personalized Kundli</li>
            <li>Book Consultation Call</li>
            <li>Fortune Report</li>
            <li>Kundali Matching</li>
          </ul>
        </div>

        {/* Our Courses */}
        <div>
          <h2 className="font-bold mb-4">Our Courses</h2>
          <ul>
            <li>Basic Numerology Course</li>
            <li>Basic Astrology Course</li>
            <li>Advanced Numerology Course</li>
            <li>Advanced Astrology Course</li>
            <li>Mobile Numerology Course</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-bold mb-4">Quick Links</h2>
          <ul>
            <li>Daily Horoscope</li>
            <li>Numerology 2025</li>
            <li>Free Lucky Rudraksha Calculator</li>
            <li>Collaborate With Us</li>
            <li>News/PR</li>
            <li>Blogs</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Subscribe Section */}
        <div>
          <h2 className="font-bold mb-4">Subscribe To Our Newsletter</h2>
          <div className="mb-4">
            <input className="p-2 w-full text-black" placeholder="Your Email" type="email" />
            <button className="bg-orange-500 text-white p-2 mt-2 w-full">→</button>
          </div>
          <p>
            Astro Arun Pandit is the best astrologer in India in the field of Astrology, Numerology & Palmistry.
            He has been helping people solve their life problems for over 49 years.
          </p>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-10 border-t border-gray-500 pt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Contact Details */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <Image src="https://storage.googleapis.com/a1aa/image/73c7xmthcVttxfI8SeHu6XDA8JM8_i52199JHpr3Au4.jpg" alt="Astro Arun Pandit logo" width={100} height={50} className="mx-auto md:mx-0 mb-4" />
            <p>Contact Details</p>
            <p>+91-7236936903, +91-63919 23456, +91-86048 02202</p>
            <p>Occult Gurukul</p>
            <p>+91-7236936903 (Sales)</p>
          </div>
          
          {/* Policies and Social Media */}
          <div className="text-center md:text-right">
            <p className="mb-4">Help | Terms & Services | Privacy Policy | Refund Policy</p>
            <p>All rights reserved by © Astro Arun Pandit</p>
            <div className="flex justify-center md:justify-end space-x-4 mt-4">
              <Link href="#"><i className="fab fa-facebook-f"></i></Link>
              <Link href="#"><i className="fab fa-twitter"></i></Link>
              <Link href="#"><i className="fab fa-youtube"></i></Link>
              <Link href="#"><i className="fab fa-linkedin-in"></i></Link>
              <Link href="#"><i className="fab fa-instagram"></i></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
