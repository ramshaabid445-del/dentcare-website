import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function BlogLayout({ blog }) {
  return (
    <div className="blog-page w-full overflow-x-hidden">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600&family=DM+Serif+Display&display=swap');
        .blog-page h1, .blog-page h2, .blog-page h3, .blog-page h4 {
          font-family: 'DM Serif Display', serif;
          font-weight: 400;
        }
        .blog-page .eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }`}</style>
      <Navbar />

      {/* ---------- HERO ---------- */}
      <section className="pt-32 pb-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow text-brand-green text-sm mb-3">| {blog.category}</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-brand-navy leading-tight">
            {blog.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-brand-gray">
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5DA15C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              {blog.date}
            </span>
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5DA15C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
              </svg>
              {blog.comments} Comments
            </span>
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5DA15C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21v-1a8 8 0 0 1 16 0v1" />
              </svg>
              {blog.author}
            </span>
          </div>
        </div>
      </section>

      {/* ---------- FEATURED IMAGE ---------- */}
      <section className="pb-16 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute -inset-3 rounded-2xl bg-[#E2F6DD] rotate-1" />
            <img
              src={blog.images[0]}
              alt={blog.title}
              className="relative w-full h-[380px] sm:h-[480px] object-cover rounded-2xl shadow-md"
            />
          </div>
        </div>
      </section>

      {/* ---------- CONTENT ---------- */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-brand-gray first-letter:text-4xl first-letter:font-heading first-letter:text-brand-green first-letter:float-left first-letter:mr-3 first-letter:leading-none">
            {blog.intro}
          </p>

          {blog.sections.map((section, idx) => (
            <div key={idx} className="mt-12">
              <h2 className="text-2xl sm:text-3xl font-heading text-brand-navy mb-4">{section.heading}</h2>
              <p className="text-base leading-relaxed text-brand-gray">{section.content}</p>
              {section.paragraph2 && (
                <p className="mt-4 text-base leading-relaxed text-brand-gray">{section.paragraph2}</p>
              )}

              {section.image && (
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-xl bg-[#E2F6DD] -rotate-1" />
                    <img
                      src={section.image}
                      alt={section.heading}
                      className="relative w-full h-72 object-cover rounded-xl shadow-md"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* ---------- Additional Images ---------- */}
          {blog.images.length > 1 && (
            <div className="mt-14">
              <div className="grid sm:grid-cols-2 gap-6">
                {blog.images.slice(1).map((img, idx) => (
                  <div key={idx} className="relative overflow-hidden rounded-2xl shadow-md">
                    <img src={img} alt={`${blog.title} image ${idx + 2}`} className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------- CONCLUSION ---------- */}
          <div className="mt-14 rounded-2xl bg-[#f8faf7] p-8">
            <p className="eyebrow text-brand-green text-sm mb-3">| Key Takeaways</p>
            <p className="text-base leading-relaxed text-brand-gray">{blog.conclusion}</p>
          </div>

          {/* ---------- CTA ---------- */}
          <div className="mt-12 text-center rounded-2xl p-8" style={{ backgroundColor: "#E2F6DD" }}>
            <h3 className="text-2xl font-heading text-brand-navy">Ready to Book Your Visit?</h3>
            <p className="mt-3 text-sm text-brand-gray">
              Schedule an appointment with our experienced specialists today.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark transition-colors text-white text-sm font-semibold px-7 py-3.5 rounded-xl"
            >
              Book Appointment
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}