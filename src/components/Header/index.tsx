"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import menuData from "./menuData";

const Header = () => {
  const [language, setLanguage] = useState("HI");
  const [sticky, setSticky] = useState(false);
  const [shrink, setShrink] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 
          ${sticky ? "shadow-lg  bg-white" : "bg-[#800000]"} 
          ${shrink ? "py-2" : "py-4"}`}
      >
        <header>
          <div className="container mx-auto px-4 flex items-center justify-between transition-all duration-300">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="" alt="Logo" width={50} height={20}  className="bg-black cursor-pointer" />
              <span className={`text-lg font-bold tracking-wide ${sticky ? "text-black" : "text-white"}`}>Pandit Ji Ka Name </span>
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
                      mobileMenuOpen ? "text-black" : sticky ? "text-black" : "text-white"
                    } hover:text-[#FF9933]`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {menuItem.title}
                  </Link>
                ))}
                <button
                  onClick={() => setLanguage(language === "HI" ? "EN" : "HI")}
                  className="font-bold px-4 py-2 transition-all duration-300 
                    bg-[#800000] text-white hover:bg-[#FF9933] hover:scale-105"
                >
                  {language === "EN" ? "🇺🇸 English" : "🇮🇳 हिंदी"}
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
