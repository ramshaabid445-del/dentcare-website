import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginRequiredModal from "../components/LoginRequiredModal";
import AppointmentSuccessModal from "../components/AppointmentSuccessModal";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

const contactInfo = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.4c.9.4 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
      </svg>
    ),
    title: "Call Us",
    lines: ["+1 123 123 1122", "+1 987 654 3210"],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    ),
    title: "Email Us",
    lines: ["dentcare@gmail.com", "support@dentcare.com"],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
    title: "Visit Us",
    lines: ["9WX2+JM Thornton", "United Kingdom"],
  },
];

export default function ContactUs() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "General Dentistry",
    date: "",
    time: "Morning (9am - 12pm)",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pre-fill form with user data when logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("");

    // Check if user is logged in
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    setLoading(true);
    try {
      const appointmentData = {
        phone: formData.phone,
        department: formData.department,
        date: formData.date,
        time: formData.time,
        message: formData.message,
      };

      const result = await api.createAppointment(appointmentData);
      setSuccessData(result.appointment);
      setShowSuccessModal(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "General Dentistry",
        date: "",
        time: "Morning (9am - 12pm)",
        message: "",
      });
    } catch (error) {
      setFormStatus(error.message || "Could not book your appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />

      {/* ---------- HERO ---------- */}
      <section className="pt-32 pb-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-green font-semibold text-sm tracking-wide mb-3">| CONTACT US</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-brand-navy leading-tight">
            Book Your Appointment Today
          </h1>
          <p className="mt-5 text-brand-gray max-w-2xl mx-auto leading-relaxed">
            We're here to help you smile with confidence. Fill out the form below and our
            friendly team will get back to you within 24 hours to schedule your visit.
          </p>
        </div>
      </section>

      {/* ---------- CONTACT INFO CARDS ---------- */}
      <section className="py-14 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="bg-white rounded-2xl shadow-md p-7 text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green mx-auto">
                  {info.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold font-heading text-brand-navy">{info.title}</h3>
                {info.lines.map((line) => (
                  <p key={line} className="mt-1 text-sm text-brand-gray">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FORM + INFO ---------- */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-stretch">
            {/* Form */}
            <div className="rounded-3xl bg-[#f8faf7] p-8 sm:p-10 shadow-md border border-gray-100 flex flex-col">
              <p className="text-brand-green font-semibold text-sm tracking-wide mb-2">| BOOK APPOINTMENT</p>
              <h2 className="text-3xl font-extrabold font-heading text-brand-navy">Request Your Visit</h2>
              <p className="mt-3 text-sm text-brand-gray">
                Complete the form and our dental care team will confirm your appointment.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5 flex-1 flex flex-col">
                {formStatus && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
                    {formStatus}
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-brand-navy mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-navy mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-brand-navy mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+1 234 567 890"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-navy mb-1.5">Department</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                    >
                      {["General Dentistry", "Cosmetic Dentistry", "Orthodontics", "Oral Surgery", "Pediatric Dentistry", "Periodontics"].map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-brand-navy mb-1.5">Preferred Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-navy mb-1.5">Preferred Time</label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                    >
                      <option>Morning (9am - 12pm)</option>
                      <option>Afternoon (12pm - 4pm)</option>
                      <option>Evening (4pm - 7pm)</option>
                    </select>
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <label className="block text-xs font-semibold text-brand-navy mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your dental needs..."
                    className="w-full flex-1 min-h-[100px] rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-green hover:bg-brand-green-dark disabled:opacity-60 transition-colors text-white text-sm font-semibold px-6 py-4 rounded-xl flex items-center justify-center gap-2"
                >
                  {loading ? "Booking Appointment..." : "Confirm Appointment"}
                  {!loading && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  )}
                </button>
              </form>
            </div>

            {/* Info / Map */}
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl p-8 text-white shadow-md bg-brand-navy">
                <p className="font-semibold text-sm tracking-wide mb-2" style={{ color: "#A6CE39" }}>| OPENING HOURS</p>
                <h3 className="text-2xl font-extrabold font-heading">We're Here For You</h3>
                <div className="mt-6 space-y-4 text-sm">
                  <p className="flex justify-between gap-4 border-b border-white/15 pb-3 text-white/80">
                    <span>Monday – Friday</span>
                    <strong className="text-white">9am – 6pm</strong>
                  </p>
                  <p className="flex justify-between gap-4 border-b border-white/15 pb-3 text-white/80">
                    <span>Saturday</span>
                    <strong className="text-white">10am – 3pm</strong>
                  </p>
                  <p className="flex justify-between gap-4 text-white/80">
                    <span>Sunday</span>
                    <strong className="text-white">Closed</strong>
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-white/15">
                  <p className="text-sm text-white/70 leading-relaxed">
                    Need urgent care? Call us directly and we'll do our best to fit you in same-day.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden shadow-md border border-gray-100 flex-1 min-h-[220px]">
                <iframe
                  title="Clinic Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317716.6063563154!2d-0.10159865000000001!3d51.52864165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  className="w-full h-full"
                  style={{ border: 0, minHeight: "220px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="rounded-3xl p-8 bg-about-bg">
                <h3 className="text-xl font-bold font-heading text-brand-navy">Why Choose MedCare?</h3>
                <ul className="mt-4 space-y-3">
                  {[
                    "Experienced, patient-first specialists",
                    "Modern & comfortable clinic environment",
                    "Flexible scheduling and same-day options",
                    "Transparent & affordable pricing",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-brand-navy">
                      <span className="w-5 h-5 rounded-full bg-brand-green flex items-center justify-center shrink-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={() => {
          setShowLoginModal(false);
          // Form will be ready for submission after login
        }}
      />

      <AppointmentSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        appointmentData={successData}
      />

      <Footer />
    </div>
  );
}
