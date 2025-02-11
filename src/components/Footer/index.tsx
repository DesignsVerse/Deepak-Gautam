import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-10 bg-gradient-to-r from-[#c0392b] to-[#e67e22] text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <img 
              src="https://storage.googleapis.com/a1aa/image/wd2wd8O3W-zUf-jcKxFfsc-53dCZ4n6oqKM8LA1BBAs.jpg" 
              alt="Panditjee Online logo" 
              className="mb-4" 
              width={200} 
              height={100} 
            />
            <p className="italic mb-4">"पंडितजी ऑनलाइन - आपकी हर धार्मिक सेवा का विश्वसनीय साथी।"</p>
            
            
            <div className="mt-4">
              <p className="font-bold mb-2">Stay In Touch With Us:</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-white"><i className="fab fa-facebook-f"></i></Link>
                <Link href="#" className="text-white"><i className="fab fa-instagram"></i></Link>
                <Link href="#" className="text-white"><i className="fab fa-pinterest"></i></Link>
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
            <div className="mb-4">
              <i className="fas fa-map-marker-alt"></i>
              <p className="inline-block ml-2">
                Panditjee Online<br/>
                255, Satyam Mall,<br/>
                Near Mansi Cross Road, Satellite,<br/>
                Ahmedabad - 380015, (Gujarat) - India
              </p>
            </div>
            <div className="mb-4">
              <i className="fas fa-envelope"></i>
              <p className="inline-block ml-2">Email: info@panditjeeonline.in</p>
            </div>
            <div>
              <i className="fas fa-phone"></i>
              <p className="inline-block ml-2">Phone: +91 96620 01600</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <p>COPYRIGHT © 2025 <a href="#">DesignsVerse</a>. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
