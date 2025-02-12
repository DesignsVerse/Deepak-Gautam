"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import menuData from "./menuData";

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setHidden(true);
        setMobileMenuOpen(false);
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
    { title: "Service 1", path: "/services/1" },
    { title: "Service 2", path: "/services/2" },
    { title: "Service 3", path: "/services/3" },
    { title: "Service 3", path: "/services/4" },
    { title: "Service 3", path: "/services/5" },
    { title: "Service 3", path: "/services/6" },
    { title: "Service 3", path: "/services/7" },
    { title: "Service 3", path: "/services/8" },
    { title: "Service 3", path: "/services/9" },
    { title: "Service 3", path: "/services/10" },
    { title: "Service 3", path: "/services/11" },
    { title: "Service 3", path: "/services/12" },
  ];


  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${sticky ? "bg-opacity-90 shadow-lg backdrop-blur-md" : "bg-transparent"}`}
        style={{
          background: "linear-gradient(to right, #c0392b, #e67e22)",
          paddingBottom: "5px",
        }}
      >
        <div className="bg-white text-black text-xs sm:text-sm flex sm:flex-row justify-center items-center gap-2 sm:gap-6 text-center">
          <span>📞 +91 98765 43210</span>
          <span>✉️ contact@example.com</span>
          <span>Rajasthan</span>
        </div>

        <header>
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex-shrink-0">
              <Image src="/images/logo/LOGO-2.png" alt="Logo" width={80} height={40} />
            </div>

            <div className="md:hidden">
              <button
                className="text-white p-2 focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                ☰
              </button>
            </div>

            <nav
              className={`absolute md:relative top-14 left-0 md:top-0 w-full md:w-auto 
              bg-black md:bg-transparent p-4 md:p-0 flex-col md:flex-row 
              ${mobileMenuOpen ? "flex" : "hidden"} md:flex md:space-x-10 items-center transition-all`}
            >
              {menuData.map((menuItem, index) => (
                menuItem.title === "services" ? (
                  <div
                    key={index}
                    className="relative group"
                  >
                    {/* "Services" text itself will open services page */}
                    <Link
                      href="/services"
                      className="text-white hover:opacity-80 transition text-sm sm:text-base font-medium"
                    >
                      Services ▼
                    </Link>

                    {/* Dropdown on hover */}
                    <div className="absolute left-0 bg-white shadow-lg rounded-md py-2 w-40 mt-2 hidden group-hover:block">
                      {serviceSubMenu.map((service, idx) => (
                        <Link
                          key={idx}
                          href={service.path}
                          className="block px-4 py-2 text-black hover:bg-gray-200"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={index}
                    href={menuItem.path}
                    className={`text-white hover:opacity-80 transition text-sm sm:text-base font-medium ${
                      pathname === menuItem.path ? "font-bold underline" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {menuItem.title}
                  </Link>
                )
              ))}

              <div className="flex items-center space-x-2 sm:space-x-3 mt-4 md:mt-0">
                <div className="flex items-center bg-black p-1 rounded-lg cursor-pointer hover:bg-gray-800 transition">
                  {/* <Image src="/images/india.png" alt="HI" width={16} height={16} /> */}
                  <span className="text-white ml-1 text-xs sm:text-sm">HI</span>
                </div>
                <div className="flex items-center bg-black p-1 rounded-lg cursor-pointer hover:bg-gray-800 transition">
                  {/* <Image src="/images/us.png" alt="EN" width={16} height={16} /> */}
                  <span className="text-white ml-1 text-xs sm:text-sm">EN</span>
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
