import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PlanSelectionModal from "../components/PlanSelectionModal";
import PricingIcon from "../components/PricingIcon";
import { api } from "../api";

const faqs = [
  { question: "Can I upgrade or downgrade my plan at any time?", answer: "Absolutely! You can change your plan whenever you need. Simply contact our team and we'll adjust your plan immediately, prorating any costs for the remainder of your billing cycle." },
  { question: "Do you offer discounts for family plans?", answer: "Yes, we offer special family packages that provide comprehensive coverage for all family members at a discounted rate. Contact our support team to learn more about our family discounts." },
  { question: "What payment methods do you accept?", answer: "We accept all major credit cards, debit cards, bank transfers, and digital wallets. All payments are securely processed and you can manage your billing preferences from your account." },
  { question: "Is there a free trial available?", answer: "We offer a 7-day free trial on our Pro Business plan so you can experience all the features before committing. No credit card required to start your trial." },
];

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.cmsPublic("pricing").getAll();
        setPlans(data.items);
      } catch (error) {
        console.warn("Failed to load pricing plans", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="pricing-page w-full overflow-x-hidden">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600&family=DM+Serif+Display&display=swap');
        .pricing-page h1, .pricing-page h2, .pricing-page h3, .pricing-page h4 {
          font-family: 'DM Serif Display', serif;
          font-weight: 400;
        }
        .pricing-page .eyebrow {
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
            <p className="eyebrow text-brand-green text-sm mb-3">| Pricing Plans</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-brand-navy leading-tight">
              Simple, Transparent <span className="text-brand-green">Pricing</span> for Every Need
            </h1>
            <p className="mt-5 max-w-xl text-brand-gray leading-relaxed">
              Choose the plan that fits your lifestyle. No hidden fees, no surprises — just
              quality dental care at a price you'll love.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm">Flexible Billing</span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm">Cancel Anytime</span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm">7-Day Free Trial</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 rounded-2xl bg-[#E2F6DD] rotate-3" />
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1100&h=760&fit=crop&auto=format&q=85"
              alt="Pricing plans illustration"
              className="relative h-[310px] sm:h-[400px] w-full object-cover rounded-2xl shadow-md"
            />
            <div className="absolute bottom-5 left-5 rounded-xl bg-white px-5 py-4 shadow-md">
              <p className="text-2xl font-heading text-brand-green">100%</p>
              <p className="text-xs font-semibold text-brand-navy">Satisfaction Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PRICING PLANS ---------- */}
      <section className="py-20" style={{ backgroundColor: "#f8faf7" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow text-brand-green text-sm mb-3">| Our Plans</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy">
            Choose Your Perfect Plan
          </h2>
          <p className="mt-4 text-brand-gray leading-relaxed max-w-2xl mx-auto">
            All plans include access to our experienced specialists and modern facilities.
            Upgrade, downgrade, or cancel anytime.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {loading ? (
              <p className="text-brand-gray col-span-full text-center">Loading plans...</p>
            ) : plans.length === 0 ? (
              <p className="text-brand-gray col-span-full text-center">No pricing plans available.</p>
            ) : (
              plans.map((plan) => (
                <div
                  key={plan._id}
                  className={`relative rounded-2xl bg-white shadow-md hover:shadow-xl border p-8 text-left transition-all duration-300 hover:-translate-y-1 ${plan.featured ? "border-brand-green" : "border-gray-100"}`}
                >
                  {plan.featured && (
                    <span className="absolute top-4 right-4 rounded-full bg-brand-green text-white text-xs font-semibold px-3 py-1">Recommended</span>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#E2F6DD] flex items-center justify-center shrink-0 text-brand-green">
                      <PricingIcon type={plan.iconType || "standard"} size={28} />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading text-brand-navy">{plan.name}</h3>
                      <p className="text-sm text-brand-gray">{plan.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-4xl font-extrabold font-heading text-brand-navy">
                      {plan.price}
                      <span className="text-sm font-medium text-brand-gray">{plan.billingPeriod}</span>
                    </p>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {(plan.features || []).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-brand-navy">
                        <span className="w-5 h-5 rounded-full bg-[#A6CE39] flex items-center justify-center shrink-0">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedPlan(plan)}
                    className="mt-8 w-full block text-center bg-brand-green hover:bg-brand-green-dark transition-colors text-white text-sm font-semibold px-6 py-3.5 rounded-xl cursor-pointer"
                  >
                    {plan.ctaText || "Get Started"}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ---------- COMPARISON TABLE ---------- */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow text-brand-green text-sm mb-3">| Compare Plans</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy">
              Everything You Get
            </h2>
          </div>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="py-4 px-4 text-sm font-semibold text-brand-gray">Features</th>
                  {plans.map((plan) => (
                    <th key={plan._id} className="py-4 px-4 text-center text-sm font-heading text-brand-navy">{plan.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {["Full General Service", "Clinic Hours", "Book Appointments", "Orthopaedic Scans", "Cosmetic Consultation", "Priority Support", "Dedicated Care Manager"].map((feature, idx) => (
                  <tr key={feature} className={`border-b border-gray-50 ${idx % 2 === 0 ? "bg-[#fafcf2]" : "bg-white"}`}>
                    <td className="py-4 px-4 text-sm font-semibold text-brand-navy">{feature}</td>
                    {plans.map((plan) => (
                      <td key={plan._id} className="py-4 px-4 text-center text-sm text-brand-gray">
                        {(plan.features || []).includes(feature) ? "✓" : "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="py-20" style={{ backgroundColor: "#f8faf7" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow text-brand-green text-sm mb-3">| FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group rounded-xl bg-white border border-gray-100 px-6 py-5 cursor-pointer">
                <summary className="flex items-center justify-between gap-4 text-base font-heading text-brand-navy list-none">
                  {faq.question}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-brand-green transition-transform group-open:rotate-180">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-brand-gray leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="py-20" style={{ backgroundColor: "#E2F6DD" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow text-brand-green text-sm mb-3">| Get Started Today</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy">
            Not Sure Which Plan is Right for You?
          </h2>
          <p className="mt-4 text-brand-gray leading-relaxed max-w-xl mx-auto">
            Talk to our team and we'll help you find the perfect plan for your needs.
            No pressure, just honest advice.
          </p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark transition-colors text-white text-sm font-semibold px-8 py-4 rounded-xl">
            Contact Us
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />

      {selectedPlan && (
        <PlanSelectionModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
}