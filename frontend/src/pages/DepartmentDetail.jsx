import { Link, Navigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { departmentDetails } from "./DepartmentData";

export default function DepartmentDetail() {
  const { slug } = useParams();
  const department = departmentDetails.find((item) => item.slug === slug);
  if (!department) return <Navigate to="/department" replace />;

  return (
    <div className="department-detail-page w-full overflow-x-hidden">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600&family=DM+Serif+Display&display=swap');
        .department-detail-page h1, .department-detail-page h2, .department-detail-page h3, .department-detail-page h4 {
          font-family: 'DM Serif Display', serif;
          font-weight: 400;
        }
        .department-detail-page .eyebrow {
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
            <Link to="/department" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark">
              ← Back to departments
            </Link>
            <div className="mt-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <p className="eyebrow text-brand-green text-sm mb-3">| {department.name}</p>
                <h1 className="text-4xl sm:text-5xl font-heading text-brand-navy leading-tight">{department.name}</h1>
                <p className="mt-2 text-sm font-semibold text-brand-green">{department.specialists.length} Specialist{department.specialists.length > 1 ? "s" : ""} on the team</p>
                <p className="mt-6 text-brand-gray leading-relaxed max-w-xl">{department.tagline}</p>
                <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold text-brand-navy">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#A6CE39]" />Same-week consultations</span>
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#A6CE39]" />Connected care plans</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-3 sm:-inset-5 rounded-2xl bg-[#E2F6DD] -rotate-3" />
                <img src={department.image} alt={department.name} className="relative w-full h-[290px] sm:h-[390px] object-cover rounded-2xl shadow-md" />
              </div>
            </div>
          </div>
        </section>

        {/* ---------- ABOUT + SERVICES ---------- */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow text-brand-green text-sm mb-3">| About the department</p>
              <h2 className="text-3xl sm:text-4xl font-heading text-brand-navy">Care built around you</h2>
              <p className="mt-5 text-brand-gray leading-relaxed">{department.about}</p>
            </div>

            <div className="mt-12 grid lg:grid-cols-[1.1fr_.9fr] gap-10 items-center">
              <div className="grid sm:grid-cols-2 gap-4">
                {department.services.map((service, index) => (
                  <div key={service} className="rounded-2xl bg-[#E2F6DD] p-6">
                    <span className="w-10 h-10 rounded-full bg-white font-bold flex items-center justify-center text-brand-green">0{index + 1}</span>
                    <h3 className="mt-5 text-lg font-heading text-brand-navy">{service}</h3>
                  </div>
                ))}
              </div>
              <img src={department.image2} alt={`${department.name} care team at work`} className="w-full h-[340px] object-cover rounded-2xl shadow-md" />
            </div>
          </div>
        </section>

        {/* ---------- SPECIALISTS ---------- */}
        <section className="py-20" style={{ backgroundColor: "#f8faf7" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <p className="eyebrow text-brand-green text-sm mb-3">| The care team</p>
                <h2 className="text-3xl sm:text-4xl font-heading text-brand-navy">Specialists in {department.name}</h2>
              </div>
              <Link to="/doctor" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark">Meet all our doctors <span aria-hidden="true">→</span></Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              {department.specialists.map((specialist) => (
                <span key={specialist} className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-navy shadow-sm">{specialist}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="py-16" style={{ backgroundColor: "#E2F6DD" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="eyebrow text-brand-green text-sm mb-2">| MedCare departments</p>
              <h2 className="text-3xl font-heading text-brand-navy">Explore another department</h2>
            </div>
            <Link to="/department" className="bg-brand-green hover:bg-brand-green-dark transition-colors text-white text-sm font-semibold px-7 py-4 rounded-xl">View all departments</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}