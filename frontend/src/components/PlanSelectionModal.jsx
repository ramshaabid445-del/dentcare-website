import { useState } from "react";

export default function PlanSelectionModal({ plan, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your ${plan.title} plan request has been received. Our team will contact you shortly.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="bg-brand-green px-8 py-6 flex items-center justify-between sticky top-0 z-10">
          <div>
            <p className="text-xs font-semibold text-white/80 uppercase tracking-wide">Selected Plan</p>
            <h3 className="text-2xl font-heading text-white">{plan.title}</h3>
          </div>
          <div className="text-right mr-4">
            <p className="text-3xl font-extrabold font-heading text-white">{plan.price}</p>
            <p className="text-xs text-white/80">/Month</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors" aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1.5">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1.5">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1.5">Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+1 234 567 890" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1.5">Preferred Start Date</label>
              <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-navy mb-1.5">Additional Notes (Optional)</label>
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us anything we should know..." className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green resize-none min-h-[90px]" />
          </div>

          <div className="rounded-xl bg-[#f8faf7] p-4 text-xs text-brand-gray leading-relaxed">
            <p className="font-semibold text-brand-navy mb-1">What happens next?</p>
            <p>Our team will review your plan request and contact you within 24 hours to confirm your details. No payment is required at this stage.</p>
          </div>

          <button type="submit" className="w-full bg-brand-green hover:bg-brand-green-dark transition-colors text-white text-sm font-semibold px-6 py-4 rounded-xl">
            Submit Plan Request
          </button>
        </form>
      </div>
    </div>
  );
}