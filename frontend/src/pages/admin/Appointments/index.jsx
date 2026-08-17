import { useEffect, useState } from "react";
import { api } from "../../../api";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await api.getAdminAppointments();
      setAppointments(data.appointments || []);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      setUpdating(appointmentId);
      await api.updateAppointmentStatus(appointmentId, { status: newStatus });
      // Reload appointments
      await loadAppointments();
    } catch (err) {
      setError(err.message || "Failed to update appointment");
    } finally {
      setUpdating(null);
    }
  };

  const filteredAppointments =
    statusFilter === "all"
      ? appointments
      : appointments.filter((apt) => apt.status === statusFilter);

  const appointmentDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading text-brand-navy">Appointments</h2>
        <p className="mt-1 text-sm text-brand-gray">Manage all patient appointments</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            statusFilter === "all"
              ? "bg-brand-green text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All
        </button>
        {["pending", "confirmed", "completed", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
              statusFilter === status
                ? "bg-brand-green text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-8 text-brand-gray">Loading appointments...</div>
      ) : filteredAppointments.length === 0 ? (
        <div className="rounded-lg bg-white shadow-sm p-8 text-center text-brand-gray">
          No appointments found.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((apt) => (
            <div
              key={apt._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-200 p-6"
            >
              <div className="grid md:grid-cols-[1fr_1fr_1fr_auto] gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Patient</p>
                  <p className="font-semibold text-brand-navy">{apt.name}</p>
                  <p className="text-sm text-gray-600">{apt.email}</p>
                  <p className="text-sm text-gray-600">{apt.phone}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Appointment</p>
                  <p className="font-semibold text-brand-navy">{apt.department}</p>
                  <p className="text-sm text-gray-600">{appointmentDate(apt.date)}</p>
                  <p className="text-sm text-gray-600">{apt.time}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Booked</p>
                  <p className="text-sm text-gray-700">
                    {new Date(apt.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      apt.status
                    )}`}
                  >
                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                  </span>
                </div>

                <div className="flex flex-col gap-2 justify-end">
                  <select
                    value={apt.status}
                    onChange={(e) => handleStatusUpdate(apt._id, e.target.value)}
                    disabled={updating === apt._id}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white disabled:opacity-60 cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {apt.message && (
                <div className="bg-gray-50 rounded p-3 mt-4 border-l-4 border-brand-green">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                    Patient Message
                  </p>
                  <p className="text-sm text-gray-700">{apt.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
