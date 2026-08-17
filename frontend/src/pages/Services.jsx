import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../api";
import { serviceDetails } from "./ServiceData";

// Static fallback services - always shown even if backend has no data
const staticServices = [
  {
    name: "Diagnosis",
    slug: "diagnosis",
    shortDescription: "We have implemented a number of Safety protocols and measures To ensure the safety of bath our patients and our team doctor Of dentist.",
    fullDescription: "Our diagnostic services use advanced technology and thorough examinations to accurately identify your dental and medical conditions, ensuring the right treatment plan from the start.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&h=600&fit=crop&auto=format&q=85",
    icon: "🩺",
    details: ["Comprehensive diagnostic examinations", "Digital X-rays and imaging", "Advanced screening and testing"],
    status: "active",
    showOnHome: true,
  },
  {
    name: "Consultancy",
    slug: "consultancy",
    shortDescription: "We have implemented a number of Safety protocols and measures To ensure the safety of bath our patients and our team doctor Of dentist.",
    fullDescription: "Our expert consultants provide personalized guidance and professional advice to help you make informed decisions about your health and treatment options.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&h=600&fit=crop&auto=format&q=85",
    icon: "💬",
    details: ["One-on-one expert consultations", "Personalized treatment advice", "Second opinion services"],
    status: "active",
    showOnHome: true,
  },
  {
    name: "Tracking",
    slug: "tracking",
    shortDescription: "The safety of bath our patients and our team doctor Of dentist also very good doctor for dental problem We have implemented a number.",
    fullDescription: "Our health tracking services help you monitor your treatment progress and recovery journey with regular updates and detailed reports, keeping you informed every step of the way.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop&auto=format&q=85",
    icon: "📊",
    details: ["Real-time treatment progress tracking", "Recovery milestone monitoring", "Detailed health reports"],
    status: "active",
    showOnHome: true,
  },
];

const processSteps = [
  { step: "01", title: "Book an Appointment", description: "Schedule your visit online or by phone in under two minutes." },
  { step: "02", title: "Meet Your Specialist", description: "A thorough consultation to understand your needs and goals." },
  { step: "03", title: "Personalized Treatment", description: "A clear, tailored plan designed around your unique smile." },
  { step: "04", title: "Ongoing Support", description: "Follow-up care and guidance to keep your smile healthy for life." },
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.cmsPublic("services").getAll();
        setServices(data.items);
      } catch (error) {
        console.warn("Failed to load services", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="services-page w-full overflow-x-hidden">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600&family=DM+Serif+Display&display=swap');
        .services-page h1, .services-page h2, .services-page h3, .services-page h4 {
          font-family: 'DM Serif Display', serif;
          font-weight: 400;
        }
        .services-page .eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }`}</style>
      <Navbar />

      {/* ---------- HERO ---------- */}
      <section className="pt-32 pb-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow text-brand-green text-sm mb-3">| Our Services</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-brand-navy leading-tight">
              Complete Dental Care, <span className="text-brand-green">All Under One Roof</span>
            </h1>
            <p className="mt-5 max-w-xl text-brand-gray leading-relaxed">
              From routine check-ups to advanced cosmetic procedures, our team of specialists
              provides gentle, personalized care for every member of your family.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm">6+ Specialized Services</span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm">24/7 Emergency Care</span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm">Patient-First Approach</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 rounded-2xl bg-[#E2F6DD] rotate-3" />
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1100&h=760&fit=crop&auto=format&q=85"
              alt="Modern dental clinic"
              className="relative h-[310px] sm:h-[400px] w-full object-cover rounded-2xl shadow-md"
            />
            <div className="absolute bottom-5 left-5 rounded-xl bg-white px-5 py-4 shadow-md">
              <p className="text-2xl font-heading text-brand-green">15+</p>
              <p className="text-xs font-semibold text-brand-navy">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SERVICES GRID ---------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow text-brand-green text-sm mb-3">| What We Offer</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy">
              Services Designed Around You
            </h2>
            <p className="mt-4 text-brand-gray leading-relaxed">
              Every treatment is delivered with precision, comfort, and a genuine commitment to your well-being.
            </p>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <p className="text-brand-gray col-span-full text-center">Loading services...</p>
            ) : (
              // Merge static Diagnosis/Consultancy/Tracking with backend services (avoid duplicates)
              (() => {
                const backendSlugs = new Set(services.map((s) => s.slug));
                const merged = [
                  ...staticServices.filter((s) => !backendSlugs.has(s.slug)),
                  ...services,
                ];
                return merged.map((service) => (
                  <div
                    key={service._id || service.slug}
                    className="group rounded-2xl bg-white shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.image || "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop&auto=format&q=85"}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                        <span className="text-brand-green text-xl font-bold">{service.icon || "🦷"}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-heading text-brand-navy">{service.name}</h3>
                      <p className="mt-2 text-sm text-brand-gray leading-relaxed">{service.shortDescription}</p>
                      <Link
                        to={`/service/${service.slug}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
                      >
                        Learn More
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ));
              })()
            )}
          </div>
        </div>
      </section>

      {/* ---------- PROCESS ---------- */}
      <section className="py-20" style={{ backgroundColor: "#f8faf7" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow text-brand-green text-sm mb-3">| How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy">
              Your Journey to a Healthier Smile
            </h2>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.step} className="relative rounded-2xl bg-white shadow-md p-8 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#E2F6DD] flex items-center justify-center">
                  <span className="text-xl font-heading text-brand-green">{step.step}</span>
                </div>
                <h3 className="mt-5 text-lg font-heading text-brand-navy">{step.title}</h3>
                <p className="mt-2 text-sm text-brand-gray leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="py-20" style={{ backgroundColor: "#E2F6DD" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow text-brand-green text-sm mb-3">| Ready When You Are</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy">
            Book Your Visit Today
          </h2>
          <p className="mt-4 text-brand-gray leading-relaxed max-w-xl mx-auto">
            Experience the MedCare difference. Schedule an appointment and let our team
            take care of the rest.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark transition-colors text-white text-sm font-semibold px-8 py-4 rounded-xl"
          >
            Book an Appointment
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}