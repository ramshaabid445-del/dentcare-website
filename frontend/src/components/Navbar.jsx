import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Department", to: "#" },
  { label: "Doctor", to: "#" },
  { label: "Pages", to: "#", hasDropdown: true },
  { label: "Blog", to: "#", hasDropdown: true },
  { label: "Contact Us", to: "#" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-5">
        <Link to="/" className="flex items-center gap-1 shrink-0">
          <img src="/images/icon.jpeg" alt="MedCare logo" className="w-12 h-12 object-contain" />
          <span className="text-2xl font-bold font-heading text-brand-navy">
            Med<span style={{ color: "#A4BD3B" }}>C</span>are
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-7 text-sm font-semibold text-brand-navy whitespace-nowrap">
          {navLinks.map((link) => {
            const isActive = link.to !== "#" && pathname === link.to;
            return (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={`flex items-center gap-1 hover:text-brand-green transition-colors ${
                    isActive ? "text-brand-green" : ""
                  }`}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-5 shrink-0">
          <a href="#" className="flex items-center gap-1.5 text-sm font-medium text-brand-navy hover:text-brand-green transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5DA15C" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Log In
          </a>
          <a
            href="#"
            className="bg-brand-green hover:bg-brand-green-dark transition-colors text-white text-sm font-semibold px-6 py-3 rounded-xl whitespace-nowrap"
          >
            Appointment
          </a>
        </div>
      </nav>
    </header>
  );
}