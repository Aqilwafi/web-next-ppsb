import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 80) {
        // scroll ke bawah
        setHidden(true);
      } else {
        // scroll ke atas
        setHidden(false);
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <header
      className={`w-full bg-blue-800 fixed top-0 left-0 z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-bold text-white">Baca Berjalan</h1>

        {/* Navigation + Auth Buttons */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 text-white font-medium">
            <li><Link to="/services" className="hover:text-yellow-300">Articles</Link></li>
            <li><Link to="/about" className="hover:text-yellow-300">Story</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-300">Novel</Link></li>
            <li><Link to="/bookingList" className="hover:text-yellow-300">About</Link></li>
            <li><Link to="/cancel" className="hover:text-yellow-300">Contacts</Link></li>
          </ul>

          <div className="w-px h-6 bg-white mx-4"></div>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="text-white px-4 py-2 border border-white rounded hover:bg-white hover:text-blue-900 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-blue-900 bg-white px-4 py-2 rounded hover:bg-yellow-300 hover:text-white transition"
            >
              Register
            </Link>
          </div>
        </nav>

        <div className="md:hidden text-white cursor-pointer">☰</div>
      </div>
    </header>
  );
};

export default Header;
