import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Department", to: "/department" },
  { label: "Doctor", to: "/doctor" },
  { label: "Pages", to: "#", hasDropdown: true, dropdown: [
    { label: "Services", to: "/services" },
    { label: "Pricing Plans", to: "/pricing" },
  ]},
  { label: "Blog", to: "#", hasDropdown: true, dropdown: [] },
  { label: "Contact Us", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [blogCategories, setBlogCategories] = useState([]);
  const { pathname } = useLocation();
  const { user, loading } = useAuth();
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await api.cmsPublic("blog-categories").getAll();
        if (data.items?.length) {
          setBlogCategories(data.items);
          return;
        }
        const blogs = await api.cmsPublic("blogs").getAll();
        const names = [...new Set((blogs.items || []).map((blog) => blog.category).filter(Boolean))];
        setBlogCategories(names.map((name) => ({ _id: name, name })));
      } catch (error) {
        // Keep the menu usable for projects that have not seeded categories yet.
        try {
          const data = await api.cmsPublic("blogs").getAll();
          const names = [...new Set((data.items || []).map((blog) => blog.category).filter(Boolean))];
          setBlogCategories(names.map((name) => ({ _id: name, name })));
        } catch (_) {
          setBlogCategories([]);
        }
      }
    };
    loadCategories();
  }, []);

  const links = navLinks.map((link) => link.label === "Blog"
    ? { ...link, dropdown: blogCategories.map((category) => ({ label: category.name, to: `/blogs?category=${encodeURIComponent(category.name)}` })) }
    : link);
  const dashboardPath = user?.role === "admin" ? "/admin/dashboard" : "/dashboard";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileDropdown(null);
  }, [pathname]);

  return (
    <header
      ref={headerRef}
      className={`navbar-scope fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Roboto:wght@400;500&display=swap');

        .navbar-scope {
          font-family: 'Playfair Display', serif;
          font-weight: 500;
        }

        .navbar-scope .navbar-logo-text {
          font-family: 'Playfair Display', serif !important;
          font-weight: 500;
          letter-spacing: -0.01em;
        }
      `}</style>

      <nav className="navbar-scope max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-5">
        <Link to="/" className="flex items-center gap-1 shrink-0">
          <img
            src="/images/icon.jpeg"
            alt="MedCare logo"
            className="w-12 h-12 object-contain"
          />
          <span className="navbar-logo-text text-2xl text-brand-navy">
            Med<span style={{ color: "#A4BD3B", fontWeight: "inherit" }}>C</span>are
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-7 text-sm text-brand-navy whitespace-nowrap">
          {links.map((link) => {
            const isActive = link.to !== "#" && pathname === link.to;
            const hasChildren = link.dropdown && link.dropdown.length > 0;

            return (
              <li key={link.label} className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    if (hasChildren) {
                      e.preventDefault();
                      setOpenDropdown(
                        openDropdown === link.label ? null : link.label
                      );
                    }
                  }}
                  className={`flex items-center gap-1 hover:text-brand-green transition-colors cursor-pointer ${
                    isActive ? "text-brand-green" : ""
                  }`}
                >
                  {hasChildren ? (
                    <span>{link.label}</span>
                  ) : (
                    <Link
                      to={link.to}
                      className={`flex items-center gap-1 hover:text-brand-green transition-colors ${
                        isActive ? "text-brand-green" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}

                  {link.hasDropdown && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className={`transition-transform duration-200 ${
                        openDropdown === link.label ? "rotate-180" : ""
                      }`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  )}
                </button>

                {hasChildren && openDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-3 w-56 rounded-2xl bg-white shadow-xl border border-gray-100 py-3 z-50">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setOpenDropdown(null)}
                        className={`block px-5 py-2.5 text-sm hover:bg-[#f8faf7] hover:text-brand-green transition-colors ${
                          pathname === item.to
                            ? "text-brand-green"
                            : "text-brand-navy"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-5 shrink-0">
          {!loading && (user ? <Link
            to={dashboardPath}
            className="flex items-center gap-1.5 text-sm font-medium text-brand-navy hover:text-brand-green transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5DA15C"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Dashboard
          </Link> : <Link to="/login" className="flex items-center gap-1.5 text-sm font-medium text-brand-navy hover:text-brand-green transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5DA15C" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>Log In</Link>)}

          <Link
            to="/contact"
            className="bg-brand-green hover:bg-brand-green-dark transition-colors text-white text-sm font-semibold px-6 py-3 rounded-xl whitespace-nowrap"
          >
            Appointment
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setMobileOpen(!mobileOpen);
          }}
          className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm text-brand-navy hover:bg-gray-50 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white shadow-xl border-t border-gray-100 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {links.map((link) => {
              const isActive = link.to !== "#" && pathname === link.to;
              const hasChildren = link.dropdown && link.dropdown.length > 0;
              const isDropdownOpen = mobileDropdown === link.label;

              return (
                <div key={link.label}>
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileDropdown(
                            isDropdownOpen ? null : link.label
                          )
                        }
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-colors ${
                          isActive
                            ? "text-brand-green bg-[#f8faf7]"
                            : "text-brand-navy hover:bg-[#f8faf7] hover:text-brand-green"
                        }`}
                      >
                        <span>{link.label}</span>

                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className={`transition-transform duration-200 ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>

                      {isDropdownOpen && (
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 pl-4">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.label}
                              to={item.to}
                              onClick={() => setMobileOpen(false)}
                              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                pathname === item.to
                                  ? "text-brand-green bg-[#f8faf7]"
                                  : "text-brand-gray hover:text-brand-green hover:bg-[#f8faf7]"
                              }`}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-sm transition-colors ${
                        isActive
                          ? "text-brand-green bg-[#f8faf7]"
                          : "text-brand-navy hover:bg-[#f8faf7] hover:text-brand-green"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              );
            })}

            {/* Mobile Auth Buttons */}
            <div className="pt-3 mt-3 border-t border-gray-100 space-y-3">
              {!loading && (user ? <Link
                to={dashboardPath}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-brand-navy hover:bg-gray-50 transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5DA15C"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Dashboard
              </Link> : <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-brand-navy hover:bg-gray-50 transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5DA15C" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>Log In</Link>)}

              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center bg-brand-green hover:bg-brand-green-dark transition-colors text-white text-sm font-semibold px-6 py-3 rounded-xl"
              >
                Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
