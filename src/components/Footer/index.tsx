import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="py-10 bg-gradient-to-r from-[#c0392b] to-[#e67e22] text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <Image
              src="/moreadd-2.jpg" 
              alt="Panditjee Online logo" 
              width={200} 
              height={100} 
              className="mb-4"
            />
            <p className="italic mb-4">&quot;पंडितजी ऑनलाइन - आपकी हर धार्मिक सेवा का विश्वसनीय साथी।&quot;</p>
            
            <div className="mt-4">
              <p className="font-bold mb-2">Stay In Touch With Us:</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-white">📘</Link>
                <Link href="#" className="text-white">📸</Link>
                <Link href="#" className="text-white">📌</Link>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">QUICK LINKS</h3>
            <ul>
              <li className="mb-2"><Link href="/" className="text-white">Home</Link></li>
              <li className="mb-2"><Link href="/about" className="text-white">Gallery</Link></li>
              <li className="mb-2"><Link href="/blog" className="text-white">Blogs</Link></li>
              <li className="mb-2"><Link href="/contact" className="text-white">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Puja Services */}
          <div>
            <h3 className="font-bold mb-4">PUJA SERVICES</h3>
            <ul>
              <li className="mb-2"><Link href="/services/1" className="text-white">Puran Katha</Link></li>
              <li className="mb-2"><Link href="/services/2" className="text-white">Shanti Puja</Link></li>
              <li className="mb-2"><Link href="/services/3" className="text-white">Havan / Yagna</Link></li>
              <li className="mb-2"><Link href="/services/4" className="text-white">Sanskar Vidhi</Link></li>
              <li className="mb-2"><Link href="/services/5" className="text-white">Sthapan Puja</Link></li>
              <li className="mb-2"><Link href="/services/6" className="text-white">Festival Puja</Link></li>
              <li className="mb-2"><Link href="/services" className="text-white font-bold">All Puja Services</Link></li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div>
            <h3 className="font-bold mb-4">CONTACT US</h3>
            <div className="mb-4 flex items-center">
              <span className="mr-2">📍</span>
              <p>
                Panditjee Online<br/>
                255, Satyam Mall,<br/>
                Near Mansi Cross Road, Satellite,<br/>
                Ahmedabad - 380015, (Gujarat) - India
              </p>
            </div>
            <div className="mb-4 flex items-center">
              <span className="mr-2">📧</span>
              <p>Email: info@panditjeeonline.in</p>
            </div>
            <div className="flex items-center">
              <span className="mr-2">📞</span>
              <p>Phone: +91 96620 01600</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <p>COPYRIGHT © 2025 <Link href="#">DesignsVerse</Link>. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
