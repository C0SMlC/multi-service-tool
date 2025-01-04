"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, Close } from "@mui/icons-material";
import { useRouter } from "next/navigation";
// import { handleLogout } from "@/utils/LogOut";

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navButtonClicked, setNavButtonClicked] = useState(false);

  const onLogout = async () => {
    const { success, error } = await handleLogout();
    if (success) {
      router.push("/auth/signin");
    } else {
      console.error("Logout failed:", error);
    }
  };

  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-primary py-6 px-6 flex justify-between items-center relative z-50">
      <div className="flex items-center">
        <img
          src="https://via.placeholder.com/32x32?text=Logo"
          alt="Logo"
          className="h-8 mr-4"
        />
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="text-black focus:outline-none relative z-50"
        >
          {isMenuOpen ? <Close /> : <Menu />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-between gap-x-14 text-black items-center content-center cursor-pointer">
        <a href="#" className="hover:text-gray-200">
          Nav Item 1
        </a>
        <a href="#" className="hover:text-gray-200">
          Nav Item 2
        </a>
        <a href="#" className="hover:text-gray-200">
          Nav Item 3
        </a>
        <a
          onClick={onLogout}
          className="ml-4 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
        >
          Logout
        </a>
      </div>

      {/* Mobile Circular Menu */}
      <div
        ref={menuRef}
        className={`fixed inset-0 bg-blue-500 z-40 flex flex-col items-center justify-center hidden
          ${isMenuOpen ? "animate-circular-reveal" : "animate-circular-hide"}`}
      >
        {isMenuOpen && (
          <>
            {/* <div className="absolute top-6 right-6">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
              >
                <Close fontSize="large" />
              </button>
            </div> */}

            <div className="flex flex-col items-center justify-center space-y-8 mt-32">
              {["Nav Item 1", "Nav Item 2", "Nav Item 3", "Nav Item 4"].map(
                (item, index) => (
                  <a
                    key={item}
                    href="#"
                    className="text-white text-2xl hover:text-gray-200"
                    onClick={toggleMenu}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0,
                      animation: isMenuOpen
                        ? `fadeInFromCenter 0.5s ease-out ${
                            index * 0.1
                          }s forwards`
                        : "none",
                    }}
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
