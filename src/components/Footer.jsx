const Footer = () => (
  <footer id="footer" className="bg-[#0F172A] text-white py-8 mt-16">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 text-sm">
      <div>
        © {new Date().getFullYear()} FoodyFair • Créé avec React
      </div>
      <div className="flex gap-4 mt-4 md:mt-0">
        <a href="mailto:contact@foodyfair.com" className="hover:text-[#38BDF8] transition">Contact</a>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#38BDF8] transition">GitHub</a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#38BDF8] transition">Twitter</a>
      </div>
    </div>
  </footer>
);

export default Footer;