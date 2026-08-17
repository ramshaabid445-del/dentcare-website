import { useEffect, useState } from "react";
import { api } from "../../../api";
import AppointmentForm from "../../../components/AppointmentForm";

export default function UserAppointments() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(false);

  const load = () => api.getMyAppointments().then((d) => setItems(d.appointments));

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading text-brand-navy">My Appointments</h2>
          <p className="mt-1 text-sm text-brand-gray">Manage your upcoming and past appointments</p>
        </div>
        <button
          onClick={() => setForm(!form)}
          className="bg-brand-green text-white px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap self-start sm:self-auto"
        >
          {form ? "Close form" : "+ Book appointment"}
        </button>
      </div>

      {form && (
        <section className="mb-7 rounded-2xl bg-white shadow-md p-4 sm:p-8">
          <h3 className="text-xl font-heading text-brand-navy">Request an appointment</h3>
          <p className="mt-1 mb-6 text-sm text-brand-gray">Choose a preferred date and our team will confirm your visit.</p>
          <AppointmentForm onSuccess={() => { setForm(false); load(); }} />
        </section>
      )}

      <div className="space-y-3">
        {items.length ? (
          items.map((a) => (
            <div key={a._id} className="rounded-xl bg-white shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <b className="text-brand-navy">{a.department}</b>
                <p className="text-sm text-brand-gray">{new Date(a.date).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })} · {a.time}</p>
                {a.message && <p className="mt-1 text-sm text-brand-gray">{a.message}</p>}
              </div>
              <span className={`capitalize text-sm font-semibold px-3 py-1 rounded-full inline-block self-start sm:self-auto ${a.status === "confirmed" ? "bg-green-100 text-green-800" : a.status === "completed" ? "bg-blue-100 text-blue-800" : a.status === "cancelled" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
                {a.status}
              </span>
            </div>
          ))
        ) : (
          <p className="rounded-2xl bg-white shadow-md p-8 text-center text-brand-gray">No appointments yet.</p>
        )}
      </div>
    </div>
  );
}