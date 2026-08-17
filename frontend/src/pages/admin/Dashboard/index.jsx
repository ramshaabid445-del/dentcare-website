import { useEffect, useState } from "react";
import { api } from "../../../api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await api.getAdminStats();
        setStats(data.stats);
      } catch (err) {
        setError(err.message || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const statCards = stats
    ? [
        { label: "Total Users", value: stats.totalUsers, icon: "👥" },
        { label: "Subscribers", value: stats.totalSubscribers ?? 0, icon: "📧" },
        { label: "Total Doctors", value: stats.totalDoctors, icon: "🩺" },
        { label: "Total Services", value: stats.totalServices, icon: "🦷" },
        { label: "Total Blogs", value: stats.totalBlogs, icon: "📝" },
        { label: "Pricing Plans", value: stats.totalPricingPlans, icon: "💰" },
        { label: "Testimonials", value: stats.totalTestimonials, icon: "⭐" },
        { label: "Appointments", value: stats.totalAppointments, icon: "📅" },
      ]
    : [];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-heading text-brand-navy">Overview</h2>
        <p className="mt-1 text-sm text-brand-gray">Welcome to the MedCare admin panel</p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-brand-gray">Loading statistics...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statCards.map((card) => (
            <div key={card.label} className="rounded-2xl bg-white shadow-md p-6">
              <div className="text-2xl">{card.icon}</div>
              <p className="mt-3 text-3xl font-heading text-brand-navy">{card.value}</p>
              <p className="mt-1 text-sm text-brand-gray">{card.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}