import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { api } from "../../api";
import { doctors as localDoctors } from "./doctorData";

const specialtyGroups = {
  General: [
    "General Physician",
    "General Medicine",
    "Internal Medicine",
    "Family Medicine",
    "Cardiologist",
    "Neurologist",
    "Dermatologist",
    "Orthopedic Specialist",
    "Oncologist",
  ],
  Paediatric: ["Pediatrician"],
  Dentist: ["Dental Surgeon"],
  "ENT Specialist": ["ENT Specialist"],
};

export default function DoctorsPage() {
  const [searchParams] = useSearchParams();
  const specialty = searchParams.get("specialty");
  const query = searchParams.get("query")?.toLowerCase() || "";
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.cmsPublic("doctors").getAll();
        const remoteDoctors = data.items || [];
        const merged = [...remoteDoctors];
        localDoctors.forEach((localDoctor) => {
          const index = merged.findIndex((doctor) => doctor.slug === localDoctor.slug);
          if (index >= 0) merged[index] = { ...localDoctor, ...merged[index], shortBio: merged[index].shortBio || localDoctor.bio, biography: merged[index].biography || localDoctor.about, qualifications: merged[index].qualifications || localDoctor.degree };
          else merged.push({ ...localDoctor, _id: localDoctor.slug, shortBio: localDoctor.bio, biography: localDoctor.about, qualifications: localDoctor.degree });
        });
        setDoctors(merged);
      } catch (error) {
        console.warn("Failed to load doctors", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  let filtered = doctors;
  if (specialty && specialtyGroups[specialty]) {
    filtered = filtered.filter((d) => specialtyGroups[specialty].includes(d.specialty));
  }
  if (query) {
    filtered = filtered.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        d.specialty.toLowerCase().includes(query)
    );
  }

  const displayDoctors = filtered.length ? filtered : doctors;

  return (
    <div className="doctor-page w-full overflow-x-hidden">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600&family=DM+Serif+Display&display=swap');
        .doctor-page h1,.doctor-page h2,.doctor-page h3 {
          font-family:'DM Serif Display',serif;
          font-weight:400;
        }
        .doctor-page .doctor-eyebrow {
          font-family:'DM Sans',sans-serif;
          font-weight:500;
          text-transform:uppercase;
          letter-spacing:.08em;
        }`}</style>
      <Navbar />
      <main>
        <section className="pt-32 pb-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
            <div>
              <p className="doctor-eyebrow text-brand-green text-sm mb-3">| Our people</p>
              <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-brand-navy leading-tight">
                Meet the minds behind your care
              </h1>
              <p className="mt-5 max-w-xl text-brand-gray leading-relaxed">
                A team of experienced specialists, united by a simple belief: great healthcare begins with listening.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm">Our trusted doctors</span>
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm">Patient-first care</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl bg-[#E2F6DD] rotate-3" />
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1100&h=760&fit=crop&auto=format&q=85"
                alt="MedCare doctors in consultation"
                className="relative h-[310px] sm:h-[400px] w-full object-cover rounded-2xl shadow-md"
              />
              <div className="absolute bottom-5 left-5 rounded-xl bg-white px-5 py-4 shadow-md">
                <p className="text-2xl font-heading text-brand-green">Our</p>
                <p className="text-xs font-semibold text-brand-navy">Specialist profiles</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
              <div>
                <p className="doctor-eyebrow text-brand-green text-sm mb-3">| Choose your specialist</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy">Care with a familiar face</h2>
              </div>
              {specialty && (
                <Link to="/doctor" className="text-sm font-semibold text-brand-green hover:text-brand-green-dark">
                  ← Show all doctors
                </Link>
              )}
            </div>
            <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-14">
              {loading ? (
                <p className="text-brand-gray col-span-full text-center">Loading doctors...</p>
              ) : displayDoctors.length === 0 ? (
                <p className="text-brand-gray col-span-full text-center">No doctors found.</p>
              ) : (
                displayDoctors.map((doctor, index) => (
                  <article
                    key={doctor._id}
                    className="group relative rounded-2xl bg-[#f8faf7] px-4 pb-5 pt-0 shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative -mt-7 h-64 overflow-hidden rounded-2xl shadow-md">
                      <img
                        src={doctor.image || "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=faces&auto=format&q=80"}
                        alt={doctor.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 rounded-full bg-brand-navy/90 px-3 py-1.5 text-xs font-semibold text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="pt-5">
                      <p className="text-xs font-semibold text-brand-green">{doctor.specialty}</p>
                      <h3 className="mt-1 text-xl font-heading text-brand-navy">{doctor.name}</h3>
                      <p className="mt-1 text-sm text-brand-gray">{doctor.experience}</p>
                      <Link
                        to={`/doctor/${doctor.slug}`}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-green transition-colors"
                      >
                        View profile
                        <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-brand-green shadow-sm">→</span>
                      </Link>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="py-20" style={{ backgroundColor: "#E2F6DD" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="doctor-eyebrow text-brand-green text-sm mb-3">| The MedCare difference</p>
              <h2 className="text-3xl sm:text-4xl font-heading text-brand-navy">More than a consultation</h2>
              <p className="mt-4 text-brand-gray leading-relaxed">
                A calm space, clear guidance, and people who stay with you through every next step.
              </p>
            </div>
            <div className="mt-12 grid md:grid-cols-[1.1fr_.9fr] gap-6">
              <div className="relative overflow-hidden rounded-2xl shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1000&h=650&fit=crop&auto=format&q=85"
                  alt="Friendly clinic reception"
                  className="w-full h-72 md:h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-7 bg-gradient-to-t from-brand-navy/90 to-transparent">
                  <p className="text-[#A6CE39] text-sm font-semibold">A warm welcome</p>
                  <h3 className="mt-1 text-2xl font-heading text-white">Care starts with a conversation</h3>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="relative overflow-hidden rounded-2xl shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=360&fit=crop&auto=format&q=85"
                    alt="Doctor listening to a patient"
                    className="w-full h-44 object-cover"
                  />
                  <div className="absolute inset-0 bg-brand-navy/25" />
                  <p className="absolute bottom-5 left-5 text-lg font-heading text-white">Listen first, always</p>
                </div>
                <div className="rounded-2xl bg-[#1a331b] p-7">
                  <p className="text-[#A6CE39] text-sm font-semibold">Connected care</p>
                  <h3 className="mt-2 text-2xl font-heading text-white">Clear plans, thoughtful follow-up</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    Your doctor and our team make sure the path forward is easy to understand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
