import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const departments = [
  { name: "Cardiology", description: "Thoughtful heart care, from routine screening to specialist review.", icon: "heart", slug: "cardiology", image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=700&h=520&fit=crop&auto=format&q=80" },
  { name: "Dental Care", description: "Comfort-focused preventive, restorative, and cosmetic dentistry.", icon: "tooth", slug: "dental-care", image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=700&h=520&fit=crop&auto=format&q=80" },
  { name: "Pediatrics", description: "Gentle care that helps children feel confident at every visit.", icon: "child", slug: "pediatrics", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=700&h=520&fit=crop&auto=format&q=80" },
  { name: "Orthopedics", description: "Personalized support for bones, joints, mobility, and recovery.", icon: "bone", slug: "orthopedics", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&h=520&fit=crop&auto=format&q=80" },
  { name: "Neurology", description: "Clear guidance for conditions affecting the brain and nervous system.", icon: "brain", slug: "neurology", image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=700&h=520&fit=crop&auto=format&q=80" },
  { name: "Dermatology", description: "Evidence-led care for healthy skin, hair, and nails.", icon: "skin", slug: "dermatology", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&h=520&fit=crop&auto=format&q=80" },
  { name: "ENT Care", description: "Specialist treatment for ear, nose, throat, and hearing concerns.", icon: "ear", slug: "ent-care", image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=700&h=520&fit=crop&auto=format&q=80" },
  { name: "General Medicine", description: "A trusted first point of care for everyday health needs.", icon: "cross", slug: "general-medicine", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=700&h=520&fit=crop&auto=format&q=80" },
];

function DepartmentIcon({ type }) {
  const shared = { width: 25, height: 25, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    heart: <><path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" /><path d="M4.5 12h3l1.4-3.1 2.3 6.1 1.7-3h2.3" /></>,
    tooth: <><path d="M7 3.6c1.6 0 2.7.8 5 .8s3.4-.8 5-.8c2.5 0 4 2.2 4 5 0 4.5-2.6 6.1-3.3 9.5-.3 1.5-1 2.3-1.9 2.3-1.2 0-1.2-2.8-3.8-2.8s-2.6 2.8-3.8 2.8c-.9 0-1.6-.8-1.9-2.3C5.6 14.7 3 13.1 3 8.6c0-2.8 1.5-5 4-5Z" /><path d="M9 7.5c.7.6 1.7.9 3 .9" /></>,
    child: <><circle cx="12" cy="6.5" r="3" /><path d="M5 21v-1.6a5.4 5.4 0 0 1 5.4-5.4h3.2a5.4 5.4 0 0 1 5.4 5.4V21" /><path d="M7 16.5 4 18M17 16.5l3 1.5" /></>,
    bone: <path d="M7.2 8.2a3 3 0 1 1 4.2-4.2l1.1 1.1 1.1-1.1a3 3 0 1 1 4.2 4.2l-1.1 1.1 1.1 1.1a3 3 0 1 1-4.2 4.2l-1.1-1.1-1.1 1.1a3 3 0 1 1-4.2-4.2l1.1-1.1-1.1-1.1Z" />,
    brain: <><path d="M9.5 4.2a3.3 3.3 0 0 1 5.4 1.1 3.4 3.4 0 0 1 3.2 5.4 3.4 3.4 0 0 1-1 6.4A3.5 3.5 0 0 1 12 19.4a3.5 3.5 0 0 1-5.1-2.3 3.4 3.4 0 0 1-1-6.4 3.4 3.4 0 0 1 3.2-5.4 3.3 3.3 0 0 1 .4-1.1Z" /><path d="M12 5v14M8.3 9.2c1.5 0 2.2.8 2.2 2.2M15.7 9.2c-1.5 0-2.2.8-2.2 2.2" /></>,
    skin: <><path d="M12 3c3.8 4.1 6 7.1 6 10.4A6 6 0 1 1 6 13.4C6 10.1 8.2 7.1 12 3Z" /><path d="M9 15.2c.8.8 1.8 1.2 3 1.2s2.2-.4 3-1.2" /></>,
    ear: <><path d="M8.2 16.8c0-2.7 3.6-2.6 3.6-6.4a2.8 2.8 0 1 0-5.6 0" /><path d="M11.8 10.4c0 3.8-3.6 3.7-3.6 6.4a3.8 3.8 0 0 0 7.6 0" /><path d="M12 21.1v.1" /></>,
    cross: <><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" /><path d="M12 8v8M8 12h8" /></>,
  };
  return <svg {...shared}>{paths[type]}</svg>;
}

export default function Department() {
  return (
    <div className="department-page w-full overflow-x-hidden">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');
        .department-page h1, .department-page h2, .department-page h3, .department-page h4 {
          font-family: 'DM Serif Display', serif;
          font-weight: 400;
        }`}</style>
      <Navbar />

      <main>
        <section className="pt-32 pb-16 sm:pb-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-brand-green font-semibold text-sm tracking-wide mb-3">| SPECIALIST CARE</p>
              <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-brand-navy leading-tight">Our Departments</h1>
              <p className="mt-5 text-brand-gray leading-relaxed max-w-xl">One clinic, a coordinated team, and the right expertise for every stage of your health. Explore care designed around your needs, close to home.</p>
              <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold text-brand-navy">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#A6CE39]" />Same-week consultations</span>
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#A6CE39]" />Connected care plans</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-3 sm:-inset-5 rounded-2xl bg-[#E2F6DD] -rotate-3" />
              <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1100&h=760&fit=crop&auto=format&q=85" alt="Team of specialist doctors across departments" className="relative w-full h-[290px] sm:h-[390px] object-cover rounded-2xl shadow-md" />
              <div className="absolute -bottom-5 left-5 sm:left-8 bg-white rounded-xl shadow-md px-5 py-4">
                <p className="text-2xl font-extrabold font-heading text-brand-green">8</p><p className="text-xs font-semibold text-brand-navy">Care departments</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-brand-green font-semibold text-sm tracking-wide mb-3">| FIND YOUR CARE</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy">Expert attention, under one roof</h2>
              <p className="mt-4 text-brand-gray leading-relaxed">Our teams work alongside each other, making your next step simple whether you need a check-up, treatment, or specialist advice.</p>
            </div>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {departments.map((department, index) => (
                <article key={department.name} className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 min-h-72 flex flex-col">
                  <div className="relative h-32 overflow-hidden">
                    <img src={department.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute inset-0 bg-brand-navy/20" />
                  </div>
                  <div className="relative flex-1 px-6 pb-6">
                    <span className="absolute -top-7 left-6 w-14 h-14 rounded-full bg-white flex items-center justify-center text-brand-green shadow-md"><DepartmentIcon type={department.icon} /></span>
                    <span className="block pt-10 text-xs font-bold tracking-[0.18em] text-brand-green">0{index + 1}</span>
                    <h3 className="mt-2 text-xl font-bold font-heading text-brand-navy">{department.name}</h3>
                    <p className="mt-2 text-sm text-brand-gray leading-relaxed">{department.description}</p>
                    <Link to={`/department/${department.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-green">Learn More <span aria-hidden="true">→</span></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20" style={{ backgroundColor: "#E2F6DD" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              {[['15+', 'Years of trusted care'], ['42k', 'Patient visits each year'], ['28', 'Specialist clinicians'], ['8', 'Connected departments']].map(([value, label]) => <div key={label} className="rounded-2xl bg-white p-6 sm:p-8 shadow-md"><p className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-green">{value}</p><p className="mt-2 text-sm leading-relaxed text-brand-navy font-semibold">{label}</p></div>)}
            </div>
            <div>
              <p className="text-brand-green font-semibold text-sm tracking-wide mb-3">| CARE THAT CONNECTS</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy leading-tight">A clearer path from question to treatment</h2>
              <p className="mt-5 text-brand-gray leading-relaxed">You do not have to navigate care alone. Our department teams share the important details, so referrals, results, and follow-ups feel joined up.</p>
              <ul className="mt-7 space-y-4">{['Coordinated specialist referrals', 'Modern diagnostics and treatment planning', 'Friendly guidance before and after your visit'].map((item) => <li key={item} className="flex items-center gap-3 text-sm font-semibold text-brand-navy"><span className="w-6 h-6 rounded-full bg-[#A6CE39] flex items-center justify-center text-white">✓</span>{item}</li>)}</ul>
            </div>
          </div>
        </section>

        <section id="care-experience" className="py-20" style={{ backgroundColor: "#f8faf7" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl bg-[#1a331b] grid lg:grid-cols-[.9fr_1.1fr]">
              <img src="https://images.unsplash.com/photo-1516841273335-e39b37888115?w=900&h=760&fit=crop&auto=format&q=85" alt="Doctor speaking with a patient" className="w-full h-72 lg:h-full object-cover" />
              <div className="p-8 sm:p-12">
                <p className="text-[#A6CE39] font-semibold text-sm tracking-wide mb-3">| YOUR VISIT, MADE SIMPLE</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">Care that feels calm from the start</h2>
                <p className="mt-5 max-w-xl text-white/75 leading-relaxed">From a warm welcome to clear next steps, our departments are designed to make specialist care feel reassuring and easy to understand.</p>
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white/10 border border-white/10 p-5"><p className="text-[#A6CE39] text-sm font-bold">01</p><p className="mt-2 font-semibold text-white">A friendly welcome</p><p className="mt-1 text-sm text-white/65">Our team helps you settle in and answers the practical questions first.</p></div>
                  <div className="rounded-xl bg-white/10 border border-white/10 p-5"><p className="text-[#A6CE39] text-sm font-bold">02</p><p className="mt-2 font-semibold text-white">Clear next steps</p><p className="mt-1 text-sm text-white/65">Leave with a plan that is personal, practical, and easy to follow.</p></div>
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