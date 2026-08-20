import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NotificationBell from "../../components/NotificationBell";

const adminNav = [
  { label: "Dashboard", to: "/admin/dashboard", icon: "dashboard" },
  { label: "Appointments", to: "/admin/appointments", icon: "appointments" },
  { label: "Users", to: "/admin/users", icon: "users" },
  { label: "Subscribers", to: "/admin/subscribers", icon: "subscribers" },
  { label: "Doctors", to: "/admin/doctors", icon: "doctors" },
  { label: "Services", to: "/admin/services", icon: "services" },
  { label: "Blogs", to: "/admin/blogs", icon: "blogs" },
  { label: "Blog Categories", to: "/admin/blog-categories", icon: "categories" },
  { label: "Pricing", to: "/admin/pricing", icon: "pricing" },
  { label: "Testimonials", to: "/admin/testimonials", icon: "testimonials" },
  { label: "Comments", to: "/admin/comments", icon: "comments" },
  { label: "Home Content", to: "/admin/home-content", icon: "home" },
  { label: "Profile", to: "/admin/profile", icon: "profile" },
];

function AdminIcon({ type }) {
  const shared = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "dashboard") return <svg {...shared}><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></svg>;
  if (type === "appointments") return <svg {...shared}><path d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
  if (type === "users") return <svg {...shared}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
  if (type === "doctors") return <svg {...shared}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>;
  if (type === "services") return <svg {...shared}><path d="M12 6.5c-1.5-1.5-3.5-2-5.5-1.5C4 4.8 3 7 3.5 9.5c.4 2 1.5 3.5 2.5 5.5.8 1.6 1.5 3.5 2 5.5.3 1.2 1.5 1.8 2.5 1.2.8-.5 1.2-1.5 1.5-2.5.3-1 .5-2 .5-3s.2-2 .5-3c.3 1 .5 2 .5 3s.7 2 1.5 2.5c1 .6 2.2 0 2.5-1.2.5-2 1.2-3.9 2-5.5 1-2 2.1-3.5 2.5-5.5.5-2.5-.5-4.7-3-5.5-2-.5-4 0-5.5 1.5Z" /></svg>;
  if (type === "blogs") return <svg {...shared}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>;
  if (type === "categories") return <svg {...shared}><path d="M4 7h16M4 12h16M4 17h10" /><circle cx="19" cy="17" r="2" /></svg>;
  if (type === "pricing") return <svg {...shared}><circle cx="12" cy="12" r="10" /><path d="M12 6v12M9 9.5c0-.8.8-1.5 1.5-1.5h2c1 0 1.5.7 1.5 1.5 0 1-1 1.5-2.5 1.5" /><path d="M10.5 16c.5.4 1.5.8 2.5.8 1.2 0 2-.6 2-1.3" /></svg>;
  if (type === "testimonials") return <svg {...shared}><path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01" /></svg>;
  if (type === "comments") return <svg {...shared}><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8A8.5 8.5 0 0 1 12.5 20a8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3h.5A8.5 8.5 0 0 1 21 11.5Z" /></svg>;
  if (type === "home") return <svg {...shared}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></svg>;
  if (type === "profile") return <svg {...shared}><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a8 8 0 0 1 16 0v1" /></svg>;
  if (type === "subscribers") return <svg {...shared}><path d="M22 6c0-2.2-4.5-3-10-3S2 3.8 2 6c0 2.2 4.5 3 10 3s10-.8 10-3Z" /><path d="M22 6v6c0 2.2-4.5 3-10 3S2 14.2 2 12V6" /><path d="M22 12v6c0 2.2-4.5 3-10 3s-10-.8-10-3" /></svg>;
  return <svg {...shared}><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M1 12h4M19 12h4M4.2 19.8 7 17M17 7l2.8-2.8" /></svg>;
}

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const sidebarContent = (
    <>
      <div className="px-6 py-6 border-b border-brand-navy/10">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/icon.jpeg" alt="MedCare logo" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold font-heading">
            Med<span style={{ color: "#A4BD3B" }}>C</span>are
          </span>
        </Link>
        <p className="mt-2 text-xs text-white/50 font-semibold">Admin Panel</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-0.5 overflow-y-auto">
        {adminNav.map((item) => {
          const isActive = pathname === item.to;
          return (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive ? "bg-brand-green text-white" : "text-brand-navy hover:bg-brand-green hover:text-white"
              }`}
            >
              <AdminIcon type={item.icon} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-6 border-t border-brand-navy/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-brand-navy hover:bg-red-500/20 hover:text-red-600 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="M16 17l5-5-5-5M21 12H9" />
          </svg>
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="h-screen overflow-hidden bg-[#f8faf7] flex">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');`}</style>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex h-screen flex-col w-64 bg-cream text-brand-navy shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-cream text-brand-navy transform transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {sidebarContent}
        </div>
        {/* Close button */}
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Close menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* Topbar */}
        <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 text-brand-navy hover:bg-gray-50 transition-colors shrink-0"
              aria-label="Open menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
            <h1 className="text-lg font-heading text-brand-navy truncate">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <NotificationBell role="admin" />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-brand-navy truncate">{user?.name}</p>
              <p className="text-xs text-brand-green capitalize">{user?.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white font-bold shrink-0">
              {user?.name?.charAt(0) || "A"}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
