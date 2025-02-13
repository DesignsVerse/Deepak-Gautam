"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import menuData from "./menuData";
import { FaPlus, FaMinus } from "react-icons/fa"; // Import icons

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false); // Service dropdown state
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setHidden(true);
        setMobileMenuOpen(false);
        setServiceMenuOpen(false); // Close service menu on scroll
      } else {
        setHidden(false);
      }
      setSticky(window.scrollY >= 80);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const serviceSubMenu = [
    { title: "सेवा 1", path: "/services/1" },
    { title: "सेवा 2", path: "/services/2" },
    { title: "सेवा 3", path: "/services/3" },
  ];

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${sticky ? "bg-opacity-90 shadow-lg backdrop-blur-md" : "bg-transparent"}`}
        style={{ background: "linear-gradient(to right, #c0392b, #e67e22)" }}
      >
        {/* Top Contact Bar */}
        <div className="bg-white text-black text-xs sm:text-sm flex justify-center items-center gap-4 p-2">
          <span>📞 +91 97521 65718</span>
          {/* <span>✉️ contact@example.com</span> */}
          <span>छापीहेड़ा रोड, नलखेड़ा</span>
        </div>

        {/* Main Header */}
        <header>
          <div className="container mx-auto px-4 flex items-center justify-between py-3">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/logo/LOGO-2.png" alt="Logo" width={50} height={20} className="cursor-pointer" />
            <span className="text-white text-lg font-bold tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
            नंद किशोर
            </span>
          </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>

            {/* Navigation Menu */}
            <nav
              className={`absolute md:relative top-20 left-0 md:top-0 w-full md:w-auto 
                bg-black md:bg-transparent p-4 md:p-0 flex flex-col md:flex-row 
                ${mobileMenuOpen ? "flex" : "hidden"} md:flex md:space-x-10 items-center transition-all duration-300`}
            >
              {menuData.map((menuItem, index) =>
                menuItem.title === "हमारी सेवाएं" ? (
                  <div key={index} className="w-full md:w-auto relative">
                    {/* Mobile View (Dropdown with Border) */}
                    <div className="md:hidden">
                      <button
                        className="flex justify-between items-center w-full md:w-auto text-white hover:opacity-80 transition text-sm sm:text-base font-medium border border-white p-2 rounded-md"
                        onClick={() => setServiceMenuOpen(!serviceMenuOpen)}
                      >
                        {menuItem.title}
                        {serviceMenuOpen ? <FaMinus className="ml-2" /> : <FaPlus className="ml-2" />}
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          serviceMenuOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="bg-white shadow-lg rounded-md w-full md:w-48">
                          {serviceSubMenu.map((service, idx) => (
                            <Link
                              key={idx}
                              href={service.path}
                              className="block px-4 py-2 text-black hover:bg-gray-200 border-b border-gray-300 last:border-none"
                              onClick={() => {
                                setMobileMenuOpen(false); // Close mobile menu
                                setServiceMenuOpen(false); // Close service menu
                              }}
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Desktop View (Only Link, No Dropdown) */}
                    <div className="hidden md:block">
                      <Link href={menuItem.path} className="text-white hover:opacity-80 transition text-sm sm:text-base font-medium">
                        {menuItem.title}
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={index}
                    href={menuItem.path}
                    className={`text-white hover:opacity-80 transition text-sm sm:text-base font-medium block w-full md:w-auto text-center py-2 md:py-0 
                      ${mobileMenuOpen ? "border border-white p-2 rounded-md" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {menuItem.title}
                  </Link>
                )
              )}

              {/* Language Buttons (Same for Both Views) */}
              <div className="flex items-center space-x-2 sm:space-x-3 mt-4 md:mt-0">
                <div className="flex items-center bg-black p-1 rounded-lg cursor-pointer hover:bg-gray-800 transition">
                  <span className="text-white ml-1 text-xs sm:text-sm">🇮🇳 HI</span>
                </div>
                <div className="flex items-center bg-black p-1 rounded-lg cursor-pointer hover:bg-gray-800 transition">
                  <span className="text-white ml-1 text-xs sm:text-sm">🇺🇸 EN</span>
                </div>
              </div>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
