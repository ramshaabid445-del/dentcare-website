import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../api";

// Static fallback detail data for Diagnosis, Consultancy, Tracking (used when backend has no data)
const staticServiceDetails = {
  diagnosis: {
    name: "Diagnosis",
    shortDescription: "We have implemented a number of Safety protocols and measures To ensure the safety of bath our patients and our team doctor Of dentist.",
    fullDescription: "Our diagnostic services use advanced technology and thorough examinations to accurately identify your dental and medical conditions, ensuring the right treatment plan from the start.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&h=600&fit=crop&auto=format&q=85",
    icon: "🩺",
    details: ["Comprehensive diagnostic examinations", "Digital X-rays and imaging", "Advanced screening and testing", "Accurate condition identification", "Personalized treatment planning"],
  },
  consultancy: {
    name: "Consultancy",
    shortDescription: "We have implemented a number of Safety protocols and measures To ensure the safety of bath patients and our doctor Of dentist.",
    fullDescription: "Our expert consultants provide personalized guidance and professional advice to help you make informed decisions about your health and treatment options.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&h=600&fit=crop&auto=format&q=85",
    icon: "💬",
    details: ["One-on-one expert consultations", "Personalized treatment advice", "Second opinion services", "Comprehensive health guidance", "Follow-up consultation support"],
  },
  tracking: {
    name: "Tracking",
    shortDescription: "The safety of bath our patients and our doctor Of dentist.",
    fullDescription: "Our health tracking services help you monitor your treatment progress and recovery journey with regular updates and detailed reports, keeping you informed every step of the way.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop&auto=format&q=85",
    icon: "📊",
    details: ["Real-time treatment progress tracking", "Recovery milestone monitoring", "Detailed health reports", "Appointment and follow-up reminders", "Personal health record management"],
  },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // Fetch the service live from the database by its slug
        const data = await api.cmsPublic("services").getBySlug(slug);
        setService(data.item);
      } catch (error) {
        // 404 / network error -> fall back to static data for Diagnosis, Consultancy, Tracking
        console.warn("Failed to load service:", error);
        const fallback = staticServiceDetails[slug];
        setService(fallback || null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  // While loading, show a lightweight placeholder
  if (loading) {
    return (
      <div className="service-detail-page w-full overflow-x-hidden">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600&family=DM+Serif+Display&display=swap');
          .service-detail-page h1, .service-detail-page h2, .service-detail-page h3, .service-detail-page h4 {
            font-family: 'DM Serif Display', serif;
            font-weight: 400;
          }
          .service-detail-page .eyebrow {
            font-family: 'DM Sans', sans-serif;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }`}</style>
        <Navbar />
        <div className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-brand-gray">Loading service details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // If the service does not exist (or failed to load), go back to the services page
  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // Derived helpers (the database Service model stores an `icon` emoji + an image)
  const heroImage = service.image || "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1100&h=760&fit=crop&auto=format&q=85";
  const detailImage = service.detailsImage || service.image || "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop&auto=format&q=80";
  const icon = service.icon || "🩺";

  return (
    <div className="service-detail-page w-full overflow-x-hidden">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600&family=DM+Serif+Display&display=swap');
        .service-detail-page h1, .service-detail-page h2, .service-detail-page h3, .service-detail-page h4 {
          font-family: 'DM Serif Display', serif;
          font-weight: 400;
        }
        .service-detail-page .eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }`}</style>
      <Navbar />

      <main>
        {/* ---------- HERO ---------- */}
        <section className="pt-32 pb-16 sm:pb-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark">
              ← Back to services
            </Link>
            <div className="mt-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <p className="eyebrow text-brand-green text-sm mb-3">| {service.name}</p>
                <h1 className="text-4xl sm:text-5xl font-heading text-brand-navy leading-tight">{service.name}</h1>
                <p className="mt-2 text-sm font-semibold text-brand-green">Specialized, patient-first care</p>
                <p className="mt-6 text-brand-gray leading-relaxed max-w-xl">
                  {service.shortDescription || service.fullDescription || ""}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm">Patient-First Approach</span>
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm">Modern Technology</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-3 sm:-inset-5 rounded-2xl bg-[#E2F6DD] rotate-3" />
                <img
                  src={heroImage}
                  alt={service.name}
                  className="relative w-full h-[290px] sm:h-[390px] object-cover rounded-2xl shadow-md"
                />
                <div className="absolute bottom-5 left-5 rounded-xl bg-white px-5 py-4 shadow-md flex items-center gap-3">
                  <span className="text-2xl">{icon}</span>
                  <span className="text-2xl font-heading text-brand-green">{icon}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- ABOUT + DETAILS ---------- */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow text-brand-green text-sm mb-3">| About this service</p>
              <h2 className="text-3xl sm:text-4xl font-heading text-brand-navy">Care built around you</h2>
              <p className="mt-5 text-brand-gray leading-relaxed">
                {service.fullDescription || service.shortDescription || ""}
              </p>
            </div>

            <div className="mt-12 grid lg:grid-cols-[1.1fr_.9fr] gap-10 items-center">
              <div className="grid sm:grid-cols-2 gap-4">
                {(service.details || []).map((item, index) => (
                  <div key={index} className="rounded-2xl bg-[#E2F6DD] p-6">
                    <span className="w-10 h-10 rounded-full bg-white font-bold flex items-center justify-center text-brand-green">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 text-lg font-heading text-brand-navy">{item}</h3>
                  </div>
                ))}
              </div>
              <img
                src={detailImage}
                alt={`${service.name} care team at work`}
                className="w-full h-[340px] object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="py-16" style={{ backgroundColor: "#E2F6DD" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="eyebrow text-brand-green text-sm mb-2">| MedCare services</p>
              <h2 className="text-3xl font-heading text-brand-navy">Explore another service</h2>
            </div>
            <Link to="/services" className="bg-brand-green hover:bg-brand-green-dark transition-colors text-white text-sm font-semibold px-7 py-4 rounded-xl">View all services</Link>
            <Link to="/contact" className="bg-brand-navy hover:bg-brand-navy/90 transition-colors text-white text-sm font-semibold px-7 py-4 rounded-xl">Book an Appointment</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
