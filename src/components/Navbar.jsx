import { Link as ScrollLink } from 'react-scroll';

const Navbar = ({ scrollToComparison }) => (
  <nav className="sticky top-0 z-50 bg-[#132040] text-white shadow-lg">
    <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
      {/* Logo / Site Name */}
      <a href="/" className="font-extrabold text-2xl tracking-tight">
        FoodyFair
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex space-x-8 items-center">
        
        <button
          type="button"
          onClick={scrollToComparison}
          className="bg-[#38BDF8] text-[#0F172A] px-4 py-2 rounded-full font-semibold shadow hover:bg-[#0F172A] hover:text-white transition"
        >
          Villes
        </button>
        <a href="#footer" className="hover:text-[#38BDF8] transition font-medium">
          Contact
        </a>
        <a href="#contribute" className="hover:text-[#38BDF8] transition font-medium">
          Contribuer
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
