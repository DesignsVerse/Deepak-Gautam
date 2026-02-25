// components/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import menuData from "./menuData";
import { useCart } from "@/lib/CartContext"; // Import useCart

const Header = () => {
  const { openCart, isCartOpen, closeCart } = useCart(); // Use CartContext
  const [language, setLanguage] = useState("HI");
  const [sticky, setSticky] = useState(false);
  const [shrink, setShrink] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setHidden(false);
      }
      if (window.scrollY > 150) {
        setShrink(true);
        setSticky(true);
      } else {
        setShrink(false);
        setSticky(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Update cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const cart = localStorage.getItem("cart");
      if (cart) {
        const items = JSON.parse(cart);
        setCartCount(items.length);
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  // Don't show offer banner on puja page
  const showOfferBanner = pathname !== "/puja";

  return (
    <>
      {/* Special Offer Banner */}
      {showOfferBanner && (
        <div className="fixed top-0 left-0 w-full z-[60] bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white py-2 shadow-lg">
          <div className="container mx-auto px-4 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <span className="text-sm sm:text-base font-bold animate-pulse">🎉</span>
              <span className="text-xs sm:text-sm font-semibold">
                काल सर्प पूजा सिर्फ ₹2,500 में | Kaal Sarp Puja at Only ₹2,500 in Ujjain
              </span>
            </div>
            <a
              href="tel:+91-9153164444"
              className="bg-white text-orange-600 px-3 py-1 rounded-full text-xs sm:text-sm font-bold hover:bg-yellow-100 transition-colors whitespace-nowrap"
              onClick={() => {
                // ✅ Track Google Ads Conversion
                if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
                  (window as any).gtag_report_conversion();
                }
              }}
            >
              📞 Call Now
            </a>
          </div>
        </div>
      )}
      
      <div
        className={`fixed left-0 w-full z-50 transition-all duration-500 
          ${sticky ? "shadow-lg bg-white" : "bg-[#800000]"} 
          ${shrink ? "py-2" : "py-4"}
          ${showOfferBanner ? "top-10" : "top-0"}`}
      >
        <header>
          <div className="container mx-auto px-4 flex items-center justify-between transition-all duration-300">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo/newlogo.png"
                alt="ujjainkalsarp"
                width={40}
                height={30}
                className="cursor-pointer mr-1"
              />
              <span
                className={`text-m mt-2 font-bold tracking-wide ${
                  sticky ? "text-black" : "text-white"
                }`}
              >
                Deepak Goutam
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-black p-2 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>

            {/* Mobile & Desktop Navigation */}
            <nav
              className={`fixed top-0 left-0 h-full w-64 transition-transform duration-300 
              ${mobileMenuOpen ? "translate-x-0 bg-white shadow-lg" : "-translate-x-full"} 
              md:relative md:translate-x-0 md:bg-transparent md:w-auto md:h-auto md:flex md:flex-row md:space-x-6 items-center`}
              style={{ backgroundColor: mobileMenuOpen ? "white" : "" }}
            >
              {/* Close Button for Mobile */}
              <button
                className="absolute top-4 right-4 text-black md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              >
                ✕
              </button>

              {/* Menu Items */}
              <div className="flex flex-col items-center mt-16 md:mt-0 md:flex-row md:space-x-6">
                {menuData.map((menuItem, index) => (
                  <Link
                    key={index}
                    href={menuItem.path}
                    className={`font-bold transition text-sm sm:text-base block py-2 relative ${
                      mobileMenuOpen
                        ? "text-black"
                        : sticky
                        ? "text-black"
                        : "text-white"
                    } hover:text-[#FF9933]`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {menuItem.title}
                  </Link>
                ))}
                <button
                  onClick={openCart} // Use openCart from CartContext
                  className="font-bold px-4 py-2 transition-all duration-300 
                    bg-[#800000] text-white hover:bg-[#FF9933] hover:scale-105 relative"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#FF9933] text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;