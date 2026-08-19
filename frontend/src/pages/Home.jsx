import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PlanSelectionModal from "../components/PlanSelectionModal";
import { api } from "../api";

const services = [
  {
    title: "Diagnosis",
    description:
      "We have implemented a number of Safety protocols and measures To ensure the safety of bath our patients and our team doctor Of dentist.",
    iconType: "diagnosis",
    accent: false,
  },
  {
    title: "Consultancy",
    description:
      "We have implemented a number of Safety protocols and measures To ensure the safety of bath our patients and our team doctor Of dentist.",
    iconType: "consultancy",
    accent: true,
  },
  {
    title: "Tracking",
    description:
      "The safety of bath our patients and our team doctor Of dentist also very good doctor for dental problem We have implemented a number.",
    iconType: "tracking",
    accent: false,
  },
  {
    title: "Support",
    description:
      "We have implemented a number of Safety protocols and measures To ensure the safety of bath our patients and our team doctor Of dentist.",
    iconType: "support",
    accent: true,
  },
];

const doctors = [
  {
    name: "Dr. Christopher Dyer",
    specialty: "Cardiologist",
    photo:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=faces&auto=format&q=80",
    slug: "christopher-dyer",
  },
  {
    name: "Dr. Madeleine Bond",
    specialty: "Oncologist",
    photo:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop&crop=faces&auto=format&q=80",
    slug: "madeleine-bond",
  },
  {
    name: "Dr. Bermadette Carr",
    specialty: "General Medicine",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=faces&auto=format&q=80",
    slug: "bermadette-carr",
  },
  {
    name: "Dr. Nichalas Allan",
    specialty: "Dental Surgeon",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces&auto=format&q=80",
    slug: "nichalas-allan",
  },
];

const pricingPlans = [
  {
    title: "Standard",
    subtitle: "Our facily is equppwd",
    price: "$29k",
    iconType: "standard",
    features: [
      "10/7 Full General Service",
      "2 Clinic Hours",
      "2 Clinic Hours",
      "1 Book Appointment",
      "5 Orthopaedic Sean",
    ],
  },
  {
    title: "Pro Business",
    subtitle: "Our facily is equppwd",
    price: "$39k",
    iconType: "pro",
    features: [
      "15/7 Full General Service",
      "3 Clinic Hours",
      "4 Clinic Hours",
      "2 Book Appointment",
      "7 Orthopaedic Sean",
    ],
  },
  {
    title: "Enterprise",
    subtitle: "Our facily is equppwd",
    price: "$59k",
    iconType: "enterprise",
    features: [
      "20/7 Full General Service",
      "4 Clinic Hours",
      "5 Clinic Hours",
      "3 Book Appointment",
      "10 Orthopaedic Sean",
    ],
  },
];

const faqs = [
  {
    question: "How to make an appointment at Dentate?",
    answer:
      "Our facily is equppwd with stare of the art techonolahy to measures To ensure the safety of bath our patients .",
  },
  {
    question: "Glasses required after laser eys surgery?",
    answer:
      "Our facily is equppwd with stare of the art techonolahy to measures To ensure the safety of bath our patients .",
  },
  {
    question: "What are the signs and symptoms of corneal disease?",
    answer:
      "Our facily is equppwd with stare of the art techonolahy to measures To ensure the safety of bath our patients .",
  },
  {
    question: "What can we do for you with adobe zomia max?",
    answer:
      "Our facily is equppwd with stare of the art techonolahy to measures To ensure the safety of bath our patients .",
  },
  {
    question: "Is my microwave giving me cancer?",
    answer:
      "Our facily is equppwd with stare of the art techonolahy to measures To ensure the safety of bath our patients .",
  },
];

const testimonials = [
  {
    name: "Christopher Dyer",
    role: "Happy Patient",
    quote:
      "We have implemented a number of Safety protocols and measures To ensure the safety of bath our patients and our team.",
    photo:
      "https://plus.unsplash.com/premium_photo-1661740497193-6aeca35e1b01?w=100&h=100&fit=crop&crop=faces&auto=format&q=80",
  },
  {
    name: "Madeleine Bond",
    role: "Happy Patient",
    quote:
      "Our facily is equppwd with stare of the art techonolahy to measures To ensure the safety of bath our patients and our team.",
    photo:
      "https://images.unsplash.com/photo-1758691463582-11aea602cd4a?w=100&h=100&fit=crop&crop=faces&auto=format&q=80",
  },
  {
    name: "Bermadette Carr",
    role: "Happy Patient",
    quote:
      "We have implemented a number of Safety protocols and measures To ensure the safety of bath our patients and our team.",
    photo:
      "https://plus.unsplash.com/premium_photo-1667520580687-a85c9080a9bc?w=100&h=100&fit=crop&crop=faces&auto=format&q=80",
  },
  {
    name: "Nichalas Allan",
    role: "Happy Patient",
    quote:
      "Our facily is equppwd with stare of the art techonolahy to measures To ensure the safety of bath our patients and our team.",
    photo:
      "https://plus.unsplash.com/premium_photo-1702598946543-b70f1059b055?w=100&h=100&fit=crop&crop=faces&auto=format&q=80",
  },
];

const blogPosts = [
  {
    day: "25",
    month: "Mar",
    followers: "175k",
    comments: "0 Comments",
    title: "Emergency medicine research course for the doctors",
    excerpt: "Our facily is equppwd with stare of the a art techonolahy to measures .",
    image:
      "https://plus.unsplash.com/premium_photo-1667520569693-c61155e16869?w=500&h=320&fit=crop&auto=format&q=80",
    link: "/blogs/emergency-medicine-research-course",
  },
  {
    day: "16",
    month: "Apr",
    followers: "320k",
    comments: "0 Comments",
    title: "Advance care planning of the information session - 2023",
    excerpt: "Our facily is equppwd with stare of the a art techonolahy to measures .",
    image:
      "https://plus.unsplash.com/premium_photo-1661286686818-5823db33959d?w=500&h=320&fit=crop&auto=format&q=80",
    link: "/blogs/advance-care-planning-information-session",
  },
  {
    day: "23",
    month: "May",
    followers: "275k",
    comments: "0 Comments",
    title: "You can easily connect to a doctor and make a treatment",
    excerpt: "Our facily is equppwd with stare of the a art techonolahy to measures .",
    image:
      "https://plus.unsplash.com/premium_photo-1702598946543-b70f1059b055?w=500&h=320&fit=crop&auto=format&q=80",
    link: "/blogs/connect-with-doctor-for-treatment",
  },
];

function PricingIcon({ type }) {
  if (type === "standard") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M9 13.5 7 22l5-3 5 3-2-8.5" />
      </svg>
    );
  }
  if (type === "pro") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8l4 3 5-7 5 7 4-3-2 11H5L3 8Z" />
        <path d="M5 21h14" />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
      <path d="M8 5H5a2 2 0 0 0 0 4h1.5" />
      <path d="M16 5h3a2 2 0 0 1 0 4h-1.5" />
      <path d="M12 12v4" />
      <path d="M9 20h6" />
      <path d="M12 16v4" />
    </svg>
  );
}

/* ServiceIcon now always draws with stroke="currentColor" (same pattern as
   PricingIcon) so the color follows the parent's text color class. This lets
   us flip the icon color purely via Tailwind's group-hover:text-* utility
   instead of passing a hardcoded hex color — which is what makes the
   green/white swap hover-only instead of a fixed alternating style. */
function ServiceIcon({ type }) {
  if (type === "diagnosis") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 3V2.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5V3" />
        <path d="M7.5 13h2l1.5-3 2 6 1.5-3h2" />
      </svg>
    );
  }
  if (type === "consultancy") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3v6a5 5 0 0 0 10 0V3" />
        <path d="M10 15v1.5a4.5 4.5 0 0 0 9 0v-1" />
        <circle cx="19" cy="15.5" r="1.6" />
      </svg>
    );
  }
  if (type === "tracking") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 15l3-4 3 3 4-6" />
      </svg>
    );
  }
  if (type === "support") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M4 12a8 8 0 0 0 5 7.5V14h6v5.5A8 8 0 0 0 20 12" />
        <path d="M9 12h6M12 9v6" />
      </svg>
    );
  }
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 15l3-4 3 3 4-6" />
    </svg>
  );
}

function BlogDateBadge({ post }) {
  const date = post.createdAt ? new Date(post.createdAt) : null;
  const hasValidDate = date && !Number.isNaN(date.getTime());
  const day = hasValidDate ? String(date.getDate()).padStart(2, "0") : post.day;
  const month = hasValidDate
    ? date.toLocaleString("en-US", { month: "short" })
    : post.month;

  return (
    <div className="absolute top-4 left-4 rounded-lg px-3 py-1.5 text-center shadow-md" style={{ backgroundColor: "#A6CE39" }}>
      <p className="text-base font-extrabold font-heading text-white leading-none">{day}</p>
      <p className="text-xs text-white/90 leading-none mt-0.5">{month}</p>
    </div>
  );
}

export default function Home() {
  const [servicesPage, setServicesPage] = useState(0);
  const [doctorsPage, setDoctorsPage] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [testimonialsPage, setTestimonialsPage] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [adultCount, setAdultCount] = useState(1);
  const [selectedTab, setSelectedTab] = useState("General");
  const [homeContent, setHomeContent] = useState(null);
  const [cmsBlogs, setCmsBlogs] = useState([]);
  const [cmsDoctors, setCmsDoctors] = useState([]);
  const [cmsServices, setCmsServices] = useState([]);
  const [cmsPricing, setCmsPricing] = useState([]);
  const [cmsTestimonials, setCmsTestimonials] = useState([]);
  const [approvedComments, setApprovedComments] = useState([]);
  // Newsletter subscribe state
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("");
  const [subscribeError, setSubscribeError] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    setSubscribing(true);
    setSubscribeStatus("");
    setSubscribeError("");
    try {
      const data = await api.subscribeToNewsletter({ email: subscribeEmail });
      setSubscribeStatus(data.message || "Successfully subscribed!");
      setSubscribeEmail("");
    } catch (err) {
      setSubscribeError(err.message || "Failed to subscribe. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  const doctorCards = [...doctors, ...cmsDoctors];
  const serviceCards = [...services, ...cmsServices];
  const pricingCards = [...pricingPlans, ...cmsPricing].slice(0, 3);

  const approvedTestimonials = approvedComments.map((comment) => ({
    _id: comment._id || `approved-${comment.name}`,
    name: comment.name,
    role: "Happy Patient",
    quote: comment.message,
    image: comment.profileImage || "/images/icon.jpeg",
    rating: 5,
  }));

  const testimonialCards = [...testimonials, ...approvedTestimonials];

  useEffect(() => {
    const loadHomeContent = async () => {
      try {
        const data = await api.getHomeContent();
        setHomeContent(data.content);
      } catch (error) {
        console.warn("Home content API unavailable, using defaults", error);
      }
    };
    loadHomeContent();
  }, []);

  useEffect(() => {
    api.getApprovedComments().then((data) => setApprovedComments(data.comments)).catch(() => {});
  }, []);

  useEffect(() => {
    const loadCms = async () => {
      try {
        const [blogs, doctors, servicesData, pricing, testimonials] = await Promise.all([
          api.cmsPublic("blogs").getAll(),
          api.cmsPublic("doctors").getAll(),
          api.cmsPublic("services").getAll(),
          api.cmsPublic("pricing").getAll(),
          api.cmsPublic("testimonials").getAll(),
        ]);
        const cmsBlogsWithLinks = blogs.items
          .filter((b) => b.showOnHome && b.status === "published")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((b) => ({
            ...b,
            link: `/blogs/${b.slug}`,
          }));
        setCmsBlogs(cmsBlogsWithLinks);
        setCmsDoctors(doctors.items.filter((d) => d.showOnHome));
        setCmsServices(servicesData.items.filter((s) => s.showOnHome));
        setCmsPricing(pricing.items.filter((p) => p.showOnHome));
        setCmsTestimonials(testimonials.items.filter((t) => t.showOnHome));
      } catch (error) {
        console.warn("CMS data unavailable, using defaults", error);
      }
    };
    loadCms();
  }, []);

  const handleFindDoctors = () => {
    navigate(`/doctor?specialty=${encodeURIComponent(selectedTab)}`);
  };

  return (
    <div className="home-page w-full overflow-x-hidden">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Roboto:wght@400;500&display=swap');
        .home-page {
          font-family: 'Roboto', sans-serif;
        }
        .home-page h1, .home-page h2, .home-page h3, .home-page h4 {
          font-family: 'Playfair Display', serif !important;
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.15;
        }
        .home-page p:not(.navbar-scope p),
        .home-page li:not(.navbar-scope li),
        .home-page span:not(.navbar-scope span),
        .home-page a:not(.navbar-scope a) {
          font-family: 'Roboto', sans-serif;
        }
        .home-page p.text-brand-gray {
          font-weight: 400;
          line-height: 1.6;
        }
        .home-page p.text-brand-green.font-semibold.text-sm.tracking-wide {
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }`}</style>
      <Navbar />

      {/* ---------- HERO ---------- */}
      <section className="pt-32 lg:pt-24 bg-cream">
        <div className="max-w-7xl mx-auto pl-[68px] pr-4 sm:pl-[76px] sm:pr-6 lg:pl-[84px] lg:pr-8 pb-28 lg:pb-16 grid lg:grid-cols-2 gap-10 lg:gap-4 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:max-w-[560px] font-extrabold font-heading leading-tight text-brand-navy">
              {homeContent?.hero?.heading || "We Care About Your Dental Health"}
            </h1>
            <p className="mt-5 text-brand-gray leading-relaxed max-w-md lg:max-w-lg">
              {homeContent?.hero?.description ||
                "We have implemented a number of Safety protocols and measures To ensure the safety of bath our patients and our team doctor Of dentist also very good doctor for dental problems"}
            </p>
            <Link
              to={homeContent?.hero?.ctaLink || "/contact"}
              className="mt-7 inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark transition-colors text-white text-sm font-semibold px-7 py-4 rounded-xl"
            >
              {homeContent?.hero?.ctaText || "Get Started"}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          <div className="relative flex justify-center lg:justify-end lg:-mb-20">
            <img
              src={homeContent?.hero?.image || "/images/home1.jpeg"}
              alt="Doctor holding a stethoscope"
              className="w-full max-w-lg object-contain"
            />
          </div>
        </div>

        {/* search bar */}
        <div className="max-w-7xl mx-auto pl-[68px] pr-4 sm:pl-[76px] sm:pr-6 lg:pl-[84px] lg:pr-8 -mt-16 lg:-mt-12 relative z-30">
          <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6">
            <div className="flex flex-wrap gap-2 pb-4 mb-4 border-b border-gray-100 text-sm font-medium">
              {[
                {
                  label: "General",
                  iconSrc: "https://api.iconify.design/mdi:account-group.svg?color=%236b7280",
                },
                {
                  label: "Paediatric",
                  iconSrc: "https://api.iconify.design/mdi:baby.svg?color=%236b7280",
                },
                {
                  label: "Dentist",
                  iconSrc: "https://api.iconify.design/mdi:tooth.svg?color=%236b7280",
                },
                {
                  label: "ENT Specialist",
                  iconSrc: "https://api.iconify.design/mdi:ear-hearing.svg?color=%236b7280",
                },
              ].map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setSelectedTab(tab.label)}
                  className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full transition-colors text-brand-gray ${
                    selectedTab === tab.label ? "bg-cream text-brand-green font-semibold" : "hover:bg-cream hover:text-brand-green"
                  }`}
                >
                  <img src={tab.iconSrc} alt="" className="w-4 h-4 shrink-0" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-full bg-brand-green flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                    <path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-brand-gray">Location</p>
                  <p className="text-sm font-semibold truncate">{homeContent?.location || "Yogyakarta, Indonesia"}</p>
                </div>
              </div>

              <div className="hidden md:block w-px h-10 bg-gray-100" />

              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-full bg-brand-green flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-brand-gray">Appointment Date</p>
                  <p className="text-sm font-semibold truncate">{homeContent?.appointmentDate || "04 August 2022"}</p>
                </div>
              </div>

              <div className="hidden md:block w-px h-10 bg-gray-100" />

              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-full bg-brand-green flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21v-1a8 8 0 0 1 16 0v1" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-brand-gray">Who</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{adultCount} Adult{adultCount > 1 ? "s" : ""}</p>
                    <button onClick={() => setAdultCount((n) => Math.min(n + 1, 10))} className="ml-1 w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-xs text-brand-gray hover:bg-brand-green hover:text-white hover:border-brand-green transition-colors">+</button>
                    <button onClick={() => setAdultCount((n) => Math.max(n - 1, 1))} className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-xs text-brand-gray hover:bg-brand-green hover:text-white hover:border-brand-green transition-colors">-</button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleFindDoctors}
                className="flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark transition-colors text-white text-sm font-semibold px-7 py-4 rounded-xl whitespace-nowrap cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SERVICES ---------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto pl-[68px] pr-4 sm:pl-[76px] sm:pr-6 lg:pl-[84px] lg:pr-8 text-center">
          <p className="text-brand-green font-semibold text-sm tracking-wide mb-3">| OUR SERVICES</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy max-w-2xl mx-auto">
            Best Medical Services Makes You <br />Happy
          </h2>
          <p className="mt-4 text-brand-gray max-w-2xl mx-auto leading-relaxed">
            We have implemented a number of Safety protocols and measures To ensure the safety of bath our
            patients and our team doctor Of dentist also very good doctor for dental problem
          </p>

          {(() => {
            const allServices = serviceCards;
            const visibleServices = allServices.slice(servicesPage * 3, servicesPage * 3 + 3);
            const maxPage = Math.max(0, allServices.length - 3);

            return (
              <>
                <div className="mt-16 grid sm:grid-cols-3 gap-6 items-stretch">
                  {visibleServices.map((service, idx) => {
                    return (
                      <div
                        key={service._id || service.title || service.name}
                        className="group relative rounded-2xl pt-14 pb-8 px-8 text-left transition-colors duration-300 border min-h-[280px] flex flex-col bg-white text-brand-navy shadow-md border-gray-100 hover:bg-brand-green hover:border-brand-green hover:shadow-xl cursor-pointer"
                      >
                        <div className="absolute -top-8 left-8 w-16 h-16 rounded-full flex items-center justify-center shadow-md bg-brand-green text-white transition-colors group-hover:bg-white group-hover:text-brand-green">
                          <ServiceIcon
                            type={service.iconType || (() => {
                              const name = (service.name || service.title || "").toLowerCase();
                              if (name.includes("diagnos")) return "diagnosis";
                              if (name.includes("consult")) return "consultancy";
                              if (name.includes("track")) return "tracking";
                              if (name.includes("support")) return "support";
                              return idx === 0 ? "diagnosis" : idx === 1 ? "consultancy" : "tracking";
                            })()}
                          />
                        </div>
                        <h3 className="text-xl font-bold font-heading mb-3 transition-colors group-hover:text-white">{service.name || service.title}</h3>
                        <p className="text-sm leading-relaxed line-clamp-4 text-brand-gray transition-colors group-hover:text-white/90">
                          {service.shortDescription || service.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-10 flex items-center justify-center gap-4">
                  <button
                    onClick={() => setServicesPage((p) => Math.max(p - 1, 0))}
                    disabled={servicesPage === 0}
                    className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white cursor-pointer disabled:cursor-not-allowed"
                    aria-label="Previous"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setServicesPage((p) => Math.min(p + 1, maxPage))}
                    disabled={servicesPage >= maxPage}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors cursor-pointer disabled:cursor-not-allowed ${
                      servicesPage >= maxPage
                        ? "bg-white border-gray-200 text-gray-300"
                        : "bg-white border-gray-200 text-brand-green hover:border-brand-green"
                    }`}
                    aria-label="Next"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* ---------- ABOUT US ---------- */}
      <section className="py-20 bg-about-bg">
        <div className="max-w-7xl mx-auto pl-[68px] pr-4 sm:pl-[76px] sm:pr-6 lg:pl-[84px] lg:pr-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-brand-green font-semibold text-sm tracking-wide mb-3">| ABOUT US</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy leading-tight">
              Find The Right Doctor <br />Right At Your Fingertips
            </h2>
            <p className="mt-5 text-brand-gray leading-relaxed max-w-md">
              We have implemented a number of Safety protocols and measures To ensure the safety of bath our
              patients and our team doctor Of dentist also very good doctor for dental problem
            </p>

            <div className="mt-6 max-w-md w-full -ml-[12%]">
              <img
                src="/images/aboutus.jpeg"
                alt="About our clinic"
                className="w-[95%] rounded-xl object-cover"
              />
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <img
              src={homeContent?.aboutDoctorImage || "/images/home2.jpeg"}
              alt="Doctor holding medicine"
              className="w-full max-w-md rounded-3xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* ---------- WHY CHOOSE US ---------- */}
      <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto pl-[68px] pr-4 sm:pl-[76px] sm:pr-6 lg:pl-[84px] lg:pr-8 grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative flex justify-center lg:justify-start">
            <img
              src={homeContent?.whyChooseUs?.image || "/images/home3.jpeg"}
              alt="Doctor with stethoscope"
              className="w-full max-w-md object-contain"
            />
          </div>

          <div>
            <p className="text-brand-green font-semibold text-sm tracking-wide mb-3">| WHY CHOOSE US</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy leading-tight">
              {homeContent?.whyChooseUs?.heading || <>A Warm Welcome <br />and a beautiful Smile</>}
            </h2>
            <p className="mt-5 text-brand-gray leading-relaxed max-w-md">
              {homeContent?.whyChooseUs?.description ||
                "Our facily is equppwd with stare of the art techonolahy to measures To ensure the safety of bath our patients and our team doctor Of dentist."}
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Professional Dental Services 24/7",
                "Various Cosmetic Dentistry Services",
                "Oral and Maxillofacial Surgery",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium text-brand-navy">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#A6CE39" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              to="/doctor"
              className="mt-8 inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark transition-colors text-white text-sm font-semibold px-7 py-4 rounded-xl"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- SPECIALIST DOCTORS TEAM ---------- */}
      <section className="pt-8 pb-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto pl-[68px] pr-4 sm:pl-[76px] sm:pr-6 lg:pl-[84px] lg:pr-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-brand-green font-semibold text-sm tracking-wide mb-3">| DEDICATED TEAM</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy">
                Our Specialist Doctors Team
              </h2>
              <p className="mt-4 text-brand-gray max-w-md leading-relaxed">
                Our facily is equppwd with stare of the art techonolahy to measure.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={() => setDoctorsPage((p) => Math.max(p - 1, 0))}
                className="w-11 h-11 rounded-full bg-brand-green flex items-center justify-center text-white cursor-pointer"
                aria-label="Previous"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => setDoctorsPage((p) => Math.min(p + 1, Math.max(0, doctorCards.length - 4)))}
                className="w-11 h-11 rounded-full bg-cream flex items-center justify-center text-brand-green cursor-pointer"
                aria-label="Next"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctorCards.slice(doctorsPage * 4, doctorsPage * 4 + 4).map((doctor) => (
              <div
                key={doctor._id || doctor.name}
                className="group relative rounded-2xl bg-white shadow-md hover:shadow-xl pt-16 pb-8 px-6 text-center transition-colors duration-300 cursor-pointer hover:bg-brand-green"
              >
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full overflow-hidden ring-4 ring-white shadow-md">
                  <img
                    src={doctor.image || doctor.photo}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold font-heading mb-1 text-brand-navy transition-colors group-hover:text-white">
                  {doctor.name}
                </h3>
                <p className="text-sm mb-4 text-brand-gray transition-colors group-hover:text-white/90">
                  {doctor.specialty}
                </p>
                <Link
                  to={`/doctor/${doctor.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-2 text-brand-green transition-colors group-hover:text-white"
                >
                  About More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PRICING ---------- */}
      <section className="py-20" style={{ backgroundColor: "#f8faf7" }}>
        <div className="max-w-7xl mx-auto pl-[68px] pr-4 sm:pl-[76px] sm:pr-6 lg:pl-[84px] lg:pr-8 text-center">
          <p className="text-brand-green font-semibold text-sm tracking-wide mb-3">| PRICING</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy">
            Our Pricing Best Plane
          </h2>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {pricingCards.map((plan) => (
              <div
                key={plan._id || plan.title}
                className="group relative rounded-2xl bg-white shadow-md hover:shadow-xl border border-gray-100 hover:border-brand-green p-8 text-left transition-colors duration-300 cursor-pointer hover:bg-brand-green"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-brand-green transition-colors group-hover:bg-white">
                    <PricingIcon type={plan.iconType || "standard"} size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-heading text-brand-navy transition-colors group-hover:text-white">
                      {plan.name || plan.title}
                    </h3>
                    <p className="text-sm text-brand-gray transition-colors group-hover:text-white/90">
                      {plan.description || plan.subtitle}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 group-hover:border-white/20 transition-colors">
                  <p className="text-3xl font-extrabold font-heading text-brand-navy transition-colors group-hover:text-white">
                    {plan.price}
                    <span className="text-sm font-medium text-brand-gray group-hover:text-white/80">{plan.billingPeriod || "/Month"}</span>
                  </p>
                </div>

                <ul className="mt-6 space-y-3">
                  {(plan.features || []).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-brand-navy transition-colors group-hover:text-white">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors bg-[#A6CE39] group-hover:bg-white">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-brand-green transition-colors">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan)}
                  className="mt-8 w-full block text-center bg-brand-green text-white group-hover:bg-white group-hover:text-brand-green transition-colors text-sm font-semibold px-6 py-3.5 rounded-xl cursor-pointer"
                >
                  {plan.ctaText || "Book Now"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto pl-[68px] pr-4 sm:pl-[76px] sm:pr-6 lg:pl-[84px] lg:pr-8 grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-brand-green font-semibold text-sm tracking-wide mb-3">| FAQ & ANSWER</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy leading-tight">
              Frequently Asked <br />Questions
            </h2>
            <p className="mt-5 text-brand-gray leading-relaxed max-w-md">
              We have implemented a number of Safety protocols and measures To ensure the safety of bath our
              patients and our team doctor.
            </p>

            <div className="mt-8 max-w-md">
              <img
                src={homeContent?.faqImage || "/images/home4.jpeg"}
                alt="Medical team consultation"
                className="w-full rounded-2xl object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-xl bg-white border border-gray-100 px-6 py-5 cursor-pointer"
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-bold font-heading text-brand-navy">
                      {faq.question}
                    </h3>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`shrink-0 text-brand-navy transition-transform duration-300 ${
                        isOpen ? "rotate-0" : "rotate-180"
                      }`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                  {isOpen && (
                    <p className="mt-3 text-sm text-brand-gray leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="py-20" style={{ backgroundColor: "#f8faf7" }}>
        <div className="max-w-7xl mx-auto pl-[68px] pr-4 sm:pl-[76px] sm:pr-6 lg:pl-[84px] lg:pr-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-brand-green font-semibold text-sm tracking-wide mb-3">| TESTIMONIAL</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy">
                Our Special Patients Say
              </h2>
              <p className="mt-4 text-brand-gray max-w-lg leading-relaxed">
                We have implemented a number of Safety protocols and measures To ensure the
                safety of bath our patients and our team doctor.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={() => setTestimonialsPage((p) => Math.max(p - 1, 0))}
                className="w-11 h-11 rounded-full bg-brand-green flex items-center justify-center text-white cursor-pointer"
                aria-label="Previous"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => setTestimonialsPage((p) => Math.min(p + 1, Math.max(0, testimonialCards.length - 3)))}
                className="w-11 h-11 rounded-full bg-cream flex items-center justify-center text-brand-green cursor-pointer"
                aria-label="Next"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialCards.slice(testimonialsPage, testimonialsPage + 3).map((t) => (
              <div
                key={t._id || t.name}
                className="relative rounded-2xl bg-white shadow-md pt-14 pb-8 px-8 text-center"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-brand-green flex items-center justify-center shadow-md">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6.83v-6.83H4.6c0-1.42 1.15-2.57 2.57-2.57V6Zm10 0A5.17 5.17 0 0 0 12 11.17V18h6.83v-6.83H14.6c0-1.42 1.15-2.57 2.57-2.57V6Z" />
                  </svg>
                </div>

                <p className="text-sm text-brand-navy italic leading-relaxed">
                  "{t.quote}"
                </p>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <img
                    src={t.image || t.photo || "/images/icon.jpeg"}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover shrink-0"
                  />
                  <div className="text-left">
                    <p className="text-sm font-bold font-heading text-brand-navy">{t.name}</p>
                    <p className="text-xs font-semibold" style={{ color: "#A6CE39" }}>
                      {t.role}
                    </p>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#FBBF24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- BLOG & NEWS ---------- */}
      <section className="pt-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto pl-[68px] pr-4 sm:pl-[76px] sm:pr-6 lg:pl-[84px] lg:pr-8 text-center">
          <p className="text-brand-green font-semibold text-sm tracking-wide mb-3">| LETAST NEWS</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy">
            Updated Blog & News
          </h2>

          <div className="mt-16 grid md:grid-cols-3 gap-6 text-left">
            {(cmsBlogs.length ? cmsBlogs : blogPosts).map((post) => (
              <div key={post._id || post.title} className="rounded-2xl bg-white shadow-md overflow-hidden">
                <div className="relative">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  <BlogDateBadge post={post} />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-brand-gray mb-3">
                    <span className="flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A6CE39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 21v-1a8 8 0 0 1 16 0v1" />
                      </svg>
                      {post.followers || "0"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A6CE39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.4 8.4 0 0 1-3.8 7 8.5 8.5 0 0 1-9 .5L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 8.5-8.5h.5a8.48 8.48 0 0 1 8 8v.5Z" />
                      </svg>
                      {post.comments || "0 Comments"}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-brand-navy leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-brand-gray leading-relaxed">{post.excerpt}</p>

                  <Link
                    to={post.link || `/blogs/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green underline underline-offset-2"
                  >
                    About More
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* ---------- SUBSCRIBE NEWSLETTER CARD ---------- */}
          <div
            className="relative z-10 -mb-28 mt-16 max-w-2xl mx-auto rounded-2xl px-8 py-8 flex flex-col sm:flex-row items-center gap-6"
            style={{ backgroundColor: "#E2F6DD" }}
          >
            <img
              src={homeContent?.subscribeImage || "/images/subscribe.jpeg"}
              alt=""
              className="w-36 h-36 object-contain shrink-0"
            />

            <div className="text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-navy">
                Subscribe Our Newsletter
              </h3>
              <p className="mt-2 text-sm text-brand-gray">
                Subscribe to our newsletter and receive special offers.
              </p>

              {subscribeStatus && (
                <p className="mt-3 text-sm font-semibold text-brand-green">{subscribeStatus}</p>
              )}
              {subscribeError && (
                <p className="mt-3 text-sm font-semibold text-red-500">{subscribeError}</p>
              )}

              <form onSubmit={handleSubscribe} className="mt-5 flex items-center bg-white rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-brand-green max-w-md pr-1.5">
                <input
                  type="email"
                  required
                  value={subscribeEmail}
                  onChange={(e) => {
                    setSubscribeEmail(e.target.value);
                    setSubscribeStatus("");
                    setSubscribeError("");
                  }}
                  placeholder="Enter your Email Address"
                  className="flex-1 min-w-0 rounded-xl pl-5 py-3.5 text-sm bg-transparent focus:outline-none text-brand-navy placeholder:text-brand-gray"
                />
                <button type="submit" disabled={subscribing} className="bg-brand-green hover:bg-brand-green-dark transition-colors text-white text-sm font-semibold px-6 py-2.5 rounded-lg whitespace-nowrap shrink-0 disabled:opacity-60">
                  {subscribing ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ---------- CHECKOUT MODAL ---------- */}
      {selectedPlan && (
        <PlanSelectionModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
}
