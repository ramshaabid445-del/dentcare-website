import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { api } from "../../api";
import { doctors as localDoctors } from "./doctorData";

export default function DoctorProfile() {
  const { slug } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.cmsPublic("doctors").getBySlug(slug);
        const localDoctor = localDoctors.find((item) => item.slug === slug);
        setDoctor({ ...localDoctor, ...data.item, shortBio: data.item.shortBio || localDoctor?.bio, biography: data.item.biography || localDoctor?.about, qualifications: data.item.qualifications || localDoctor?.degree });
      } catch (err) {
        const localDoctor = localDoctors.find((item) => item.slug === slug);
        if (localDoctor) setDoctor({ ...localDoctor, shortBio: localDoctor.bio, biography: localDoctor.about, qualifications: localDoctor.degree });
        else setError(err.message || "Doctor not found");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  return (
    <div className="doctor-profile w-full overflow-x-hidden">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600&family=DM+Serif+Display&display=swap');
        .doctor-profile h1,.doctor-profile h2,.doctor-profile h3 {
          font-family:'DM Serif Display',serif;
          font-weight:400;
        }
        .doctor-profile .profile-eyebrow {
          font-family:'DM Sans',sans-serif;
          font-weight:500;
          text-transform:uppercase;
          letter-spacing:.08em;
        }`}</style>
      <Navbar />
      <main>
        <section className="pt-32 pb-20 bg-cream">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/doctor" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark">
              ← Back to doctors
            </Link>

            {loading ? (
              <p className="mt-8 text-brand-gray">Loading profile...</p>
            ) : error || !doctor ? (
              <p className="mt-8 text-brand-gray">{error || "Doctor not found"}</p>
            ) : (
              <div className="mt-8 grid lg:grid-cols-[.85fr_1.15fr] gap-10 lg:gap-16 items-center">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-2xl bg-[#E2F6DD] -rotate-3" />
                  <img
                    src={doctor.image || "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=1000&fit=crop&crop=face&auto=format&q=85"}
                    alt={doctor.name}
                    className="relative h-[420px] w-full object-cover rounded-2xl shadow-md"
                  />
                </div>
                <div>
                  <p className="profile-eyebrow text-brand-green text-sm mb-3">| {doctor.specialty}</p>
                  <h1 className="text-4xl sm:text-5xl font-heading text-brand-navy leading-tight">{doctor.name}</h1>
                  <p className="mt-2 text-sm font-semibold text-brand-green">
                    {doctor.qualifications} {doctor.experience ? `· ${doctor.experience}` : ""}
                  </p>
                  <p className="mt-6 text-brand-gray leading-relaxed">{doctor.shortBio}</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm">Accepting new patients</span>
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm">In-clinic consultations</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {doctor && (
          <>
            <section className="py-20 bg-white">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.15fr_.85fr] gap-12">
                <div>
                  <p className="profile-eyebrow text-brand-green text-sm mb-3">| About the doctor</p>
                  <h2 className="text-3xl sm:text-4xl font-heading text-brand-navy">A thoughtful approach to care</h2>
                  <p className="mt-5 max-w-2xl text-brand-gray leading-relaxed whitespace-pre-wrap">{doctor.biography}</p>
                  {doctor.availability && (
                    <div className="mt-8">
                      <p className="profile-eyebrow text-brand-green text-sm mb-3">| Availability</p>
                      <p className="text-brand-gray">{doctor.availability}</p>
                    </div>
                  )}
                  {doctor.contact && (
                    <div className="mt-8">
                      <p className="profile-eyebrow text-brand-green text-sm mb-3">| Contact</p>
                      <p className="text-brand-gray">{doctor.contact}</p>
                    </div>
                  )}
                </div>
                <aside className="rounded-2xl bg-[#1a331b] p-8">
                  <p className="profile-eyebrow text-[#A6CE39] text-sm">| Qualifications</p>
                  <h2 className="mt-3 text-3xl font-heading text-white">Credentials</h2>
                  <p className="mt-5 text-white/80 leading-relaxed">{doctor.qualifications}</p>
                  {doctor.experience && (
                    <>
                      <p className="profile-eyebrow text-[#A6CE39] text-sm mt-8">| Experience</p>
                      <p className="mt-3 text-white/80">{doctor.experience}</p>
                    </>
                  )}
                </aside>
              </div>
            </section>

            <section className="py-16" style={{ backgroundColor: "#E2F6DD" }}>
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="profile-eyebrow text-brand-green text-sm mb-2">| MedCare specialists</p>
                  <h2 className="text-3xl font-heading text-brand-navy">Looking for another specialty?</h2>
                </div>
                <Link to="/doctor" className="bg-brand-green hover:bg-brand-green-dark transition-colors text-white text-sm font-semibold px-7 py-4 rounded-xl">
                  Explore all doctors
                </Link>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
