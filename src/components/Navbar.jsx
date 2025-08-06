import { useState } from "react";
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo / Site Name */}
        <a href="/" className="text-yellow-500 font-extrabold text-2xl tracking-tight">
          GlovoCompare
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center">
          <ScrollLink to="features" smooth={true} duration={500} className="text-gray-700 font-medium hover:text-yellow-500 transition cursor-pointer">
            Learn More
          </ScrollLink>
          <ScrollLink to="city-selector" smooth={true} duration={500} className="bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-yellow-600 transition cursor-pointer">
            Try It Now
          </ScrollLink>
          <ScrollLink to="report-missing" smooth={true} duration={500} className="text-yellow-500 underline font-medium hover:text-yellow-600 transition cursor-pointer">
            Missing Menu?
          </ScrollLink>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-yellow-500 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <ScrollLink to="features" smooth={true} duration={500} className="block px-6 py-3 text-gray-700 font-medium hover:text-yellow-500 transition cursor-pointer"
            onClick={() => setOpen(false)}>
            Learn More
          </ScrollLink>
          <ScrollLink to="city-selector" smooth={true} duration={500} className="block px-6 py-3 bg-yellow-500 text-white rounded-full font-semibold shadow hover:bg-yellow-600 transition my-2 mx-4 text-center cursor-pointer"
            onClick={() => setOpen(false)}>
            Try It Now
          </ScrollLink>
          <ScrollLink to="report-missing" smooth={true} duration={500} className="block px-6 py-3 text-yellow-500 underline font-medium hover:text-yellow-600 transition cursor-pointer"
            onClick={() => setOpen(false)}>
            Missing Menu?
          </ScrollLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
