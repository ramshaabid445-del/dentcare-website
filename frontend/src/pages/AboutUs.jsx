import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const stats = [
  { value: "12+", label: "Years of Experience", blob: "#8a9a3f" },
  { value: "40+", label: "Expert Doctors", blob: "#a78bda" },
  { value: "8k+", label: "Happy Patients", blob: "#d4a017" },
  { value: "99%", label: "Patient Satisfaction", blob: "#8a9a3f" },
];

const values = [
  {
    title: "Our Mission",
    description:
      "To make quality healthcare simple, affordable and accessible for every patient who walks through our doors, with safety protocols in place every step of the way.",
    iconType: "mission",
  },
  {
    title: "Our Vision",
    description:
      "To be the most trusted name in family healthcare — a place where patients feel heard, cared for, and confident in the treatment they receive.",
    iconType: "vision",
  },
  {
    title: "Our Values",
    description:
      "Compassion, honesty and excellence guide every consultation, every diagnosis and every follow-up — because good care is built on trust.",
    iconType: "values",
  },
];

const features = [
  {
    title: "Certified Specialists",
    description: "Every doctor on our team is board-certified with years of hands-on clinical experience.",
    iconType: "certified",
  },
  {
    title: "Modern Equipment",
    description: "We invest in the latest diagnostic and treatment technology across every department.",
    iconType: "equipment",
  },
  {
    title: "Transparent Pricing",
    description: "No hidden charges — you know exactly what a visit or treatment costs before you commit.",
    iconType: "pricing",
  },
  {
    title: "Personalised Care",
    description: "Treatment plans are built around your history, not a one-size-fits-all checklist.",
    iconType: "care",
  },
];

const team = [
  {
    name: "Christopher Dyer",
    specialty: "Heart Specialist",
    photo:
      "https://plus.unsplash.com/premium_photo-1661740497193-6aeca35e1b01?w=300&h=300&fit=crop&crop=faces&auto=format&q=80",
  },
  {
    name: "Madeleine Bond",
    specialty: "Cancer Specialist",
    photo:
      "https://images.unsplash.com/photo-1758691463582-11aea602cd4a?w=300&h=300&fit=crop&crop=faces&auto=format&q=80",
  },
  {
    name: "Bermadette Carr",
    specialty: "General Medicine",
    photo:
      "https://plus.unsplash.com/premium_photo-1667520580687-a85c9080a9bc?w=300&h=300&fit=crop&crop=faces&auto=format&q=80",
  },
  {
    name: "Nichalas Allan",
    specialty: "Dentist Surgeon",
    photo:
      "https://plus.unsplash.com/premium_photo-1702598946543-b70f1059b055?w=300&h=300&fit=crop&crop=faces&auto=format&q=80",
  },
];

function ValueIcon({ type }) {
  if (type === "mission") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="0.6" fill="#FFFFFF" stroke="none" />
      </svg>
    );
  }
  if (type === "vision") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-4.4-9.5-9C.8 8.4 2 4.5 6 4c2 0 3.5 1.2 4.5 3 1-1.8 2.5-3 4.5-3 4 0 5.2 4.4 3.5 8-2.5 4.6-9.5 9-9.5 9Z" />
    </svg>
  );
}

function FeatureIcon({ type }) {
  const common = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "#5DA15C", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "certified") {
    return (
      <svg {...common}>
        <path d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6l-9-4Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  if (type === "equipment") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="16" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
        <path d="M8 9h3M8 12h5" />
      </svg>
    );
  }
  if (type === "pricing") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 15.5c0 1 1 1.8 2.5 1.8s2.5-.8 2.5-1.8-1-1.5-2.5-1.8-2.5-.8-2.5-1.8S10.5 9 12 9s2.5.7 2.5 1.7" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

export default function AboutUs() {
  const [teamPage, setTeamPage] = useState(0);

  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />

      {/* ---------- HERO ---------- */}
      <section className="pt-36 pb-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 text-xs font-semibold text-brand-green shadow-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5DA15C" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
              Home / About Us
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold font-heading leading-tight text-brand-navy">
              A Team That Puts Your Health First
            </h1>
            <p className="mt-5 text-brand-gray leading-relaxed max-w-md">
              MedCare brings together specialists across general medicine, dentistry, paediatrics and ENT —
              so your whole family gets the right care, in one place, without the runaround.
            </p>
            <a
              href="#"
              className="mt-7 inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark transition-colors text-white text-sm font-semibold px-7 py-4 rounded-xl"
            >
              Book Appointment
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=650&fit=crop&auto=format&q=80"
              alt="MedCare clinical team"
              className="w-full object-cover shadow-xl"
              style={{ borderRadius: "60px 60px 20px 60px" }}
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg px-6 py-4 hidden sm:block">
              <p className="text-2xl font-extrabold font-heading text-brand-green">12+</p>
              <p className="text-xs text-brand-gray">Years serving patients</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- OUR STORY (image collage) ---------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative pb-10 pr-8">
            <img
              src="https://images.unsplash.com/photo-1580281658223-9b93f18ae9ae?w=600&h=750&fit=crop&auto=format&q=80"
              alt="Doctor consulting a patient"
              className="w-[75%] aspect-[4/5] rounded-[40px] object-cover shadow-xl"
            />
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&h=400&fit=crop&auto=format&q=80"
              alt="Clinic reception"
              className="absolute bottom-0 right-0 w-[55%] aspect-[5/4] rounded-3xl object-cover shadow-xl border-4 border-white"
            />
          </div>

          <div>
            <p className="text-brand-green font-semibold text-sm tracking-wide mb-3">| OUR STORY</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy leading-tight">
              Built On A Simple Idea
            </h2>
            <p className="mt-5 text-brand-gray leading-relaxed max-w-md">
              MedCare started with one belief — going to the doctor shouldn't feel stressful. Over the years
              we've grown from a single consultation room into a full clinic with specialists across multiple
              departments, all while keeping that same personal, unhurried approach to every appointment.
            </p>
            <p className="mt-4 text-brand-gray leading-relaxed max-w-md">
              Today, thousands of patients trust us with their care — and that trust is what we work to earn
              again with every visit.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- STATS STRIP ---------- */}
      <section className="pb-4 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-about-bg rounded-3xl px-8 py-10 flex flex-col sm:flex-row items-center justify-around gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <div className="relative inline-flex items-center justify-center px-4 py-1.5">
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: stat.blob, opacity: 0.55 }}
                  />
                  <p className="relative z-10 text-3xl font-extrabold font-heading text-brand-navy">
                    {stat.value}
                  </p>
                </div>
                <p className="mt-1 text-sm text-brand-gray leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- MISSION / VISION / VALUES (alternating rows) ---------- */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-brand-green font-semibold text-sm tracking-wide mb-3">| WHAT DRIVES US</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy">
              Mission, Vision &amp; Values
            </h2>
          </div>

          <div className="space-y-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl p-8 bg-about-bg"
              >
                <div className="w-14 h-14 rounded-full bg-brand-green flex items-center justify-center shrink-0">
                  <ValueIcon type={value.iconType} />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-bold font-heading text-brand-navy mb-2">{value.title}</h3>
                  <p className="text-sm text-brand-gray leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHY CHOOSE US (feature grid) ---------- */}
      <section className="py-20 bg-about-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-green font-semibold text-sm tracking-wide mb-3">| WHY CHOOSE US</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy max-w-2xl mx-auto">
            Reasons Patients Trust MedCare
          </h2>

          <div className="mt-14 grid sm:grid-cols-2 gap-6 text-left">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0">
                  <FeatureIcon type={feature.iconType} />
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading text-brand-navy mb-1.5">{feature.title}</h3>
                  <p className="text-sm text-brand-gray leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- OUR TEAM ---------- */}
      <section className="pt-8 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-brand-green font-semibold text-sm tracking-wide mb-3">| MEET OUR TEAM</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy">
                The People Behind MedCare
              </h2>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={() => setTeamPage((p) => Math.max(p - 1, 0))}
                className="w-11 h-11 rounded-full bg-brand-green flex items-center justify-center text-white cursor-pointer"
                aria-label="Previous"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => setTeamPage((p) => Math.min(p + 1, team.length - 4))}
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
            {team.slice(teamPage, teamPage + 4).map((doctor) => (
              <div
                key={doctor.name}
                className="group relative rounded-2xl bg-white shadow-md hover:shadow-xl pt-16 pb-8 px-6 text-center transition-colors duration-300 cursor-pointer hover:bg-brand-green"
              >
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full overflow-hidden ring-4 ring-white shadow-md">
                  <img src={doctor.photo} alt={doctor.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold font-heading mb-1 text-brand-navy transition-colors group-hover:text-white">
                  {doctor.name}
                </h3>
                <p className="text-sm mb-4 text-brand-gray transition-colors group-hover:text-white/90">
                  {doctor.specialty}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-2 text-brand-green transition-colors group-hover:text-white"
                >
                  About More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA BANNER ---------- */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-green rounded-3xl px-8 sm:px-14 py-12 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Ready To Feel Better?
              </h2>
              <p className="mt-2 text-white/85 max-w-md">
                Book an appointment with our specialists today and take the first step towards better health.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white text-brand-green hover:bg-cream transition-colors text-sm font-semibold px-8 py-4 rounded-xl shrink-0"
            >
              Book Appointment
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}