import { useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import AppointmentSuccessModal from "./AppointmentSuccessModal";

export default function AppointmentForm({ onSuccess }) {
  const { user } = useAuth();
  const [form, setForm] = useState({ phone: "", department: "General Dentistry", date: "", time: "Morning (9am - 12pm)", message: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const result = await api.createAppointment(form);
      setSuccessData(result.appointment);
      setShowSuccessModal(true);
      setForm({ phone: "", department: "General Dentistry", date: "", time: "Morning (9am - 12pm)", message: "" });
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <form onSubmit={submit} className="space-y-4">
        {error && <p className="text-sm text-red-600">{error}</p>}
        <p className="text-sm text-brand-gray">
          Booking for <b>{user?.name}</b> ({user?.email})
        </p>
        <input
          required
          placeholder="Phone number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
        />
        <select
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
        >
          <option>General Dentistry</option>
          <option>Cosmetic Dentistry</option>
          <option>Orthodontics</option>
          <option>Oral Surgery</option>
          <option>Pediatric Dentistry</option>
          <option>Periodontics</option>
          <option>Cardiology</option>
          <option>General Medicine</option>
          <option>Emergency Care</option>
        </select>
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            required
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm"
          />
          <select
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm"
          >
            <option>Morning (9am - 12pm)</option>
            <option>Afternoon (1pm - 4pm)</option>
            <option>Evening (5pm - 8pm)</option>
          </select>
        </div>
        <textarea
          placeholder="Message (optional)"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm min-h-24"
        />
        <button
          disabled={saving}
          className="bg-brand-green text-white px-6 py-3 rounded-xl text-sm font-semibold disabled:opacity-60"
        >
          {saving ? "Submitting..." : "Confirm Appointment"}
        </button>
      </form>

      <AppointmentSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        appointmentData={successData}
      />
    </>
  );
}
