import { useEffect, useState } from "react";
import { api } from "../../../api";

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminSubscribers();
      setSubscribers(data.subscribers || []);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this subscriber?")) return;
    setDeleting(id);
    try {
      await api.deleteAdminSubscriber(id);
      setSubscribers((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete subscriber");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-heading text-brand-navy">Newsletter Subscribers</h2>
        <p className="mt-1 text-sm text-brand-gray">
          Total subscribers: <strong className="text-brand-navy">{subscribers.length}</strong>
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-brand-gray">Loading subscribers...</p>
      ) : (
        <div className="rounded-2xl bg-white shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-100 bg-[#f8faf7]">
                  <th className="py-4 px-6 text-xs font-semibold text-brand-gray uppercase">Email</th>
                  <th className="py-4 px-6 text-xs font-semibold text-brand-gray uppercase">Name</th>
                  <th className="py-4 px-6 text-xs font-semibold text-brand-gray uppercase">Subscribed</th>
                  <th className="py-4 px-6 text-xs font-semibold text-brand-gray uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-sm text-brand-gray">
                      No subscribers yet. Share the newsletter form to collect emails!
                    </td>
                  </tr>
                ) : (
                  subscribers.map((sub) => (
                    <tr key={sub._id} className="border-b border-gray-50">
                      <td className="py-4 px-6 text-sm font-semibold text-brand-navy">{sub.email}</td>
                      <td className="py-4 px-6 text-sm text-brand-gray">{sub.name || "-"}</td>
                      <td className="py-4 px-6 text-sm text-brand-gray">
                        {new Date(sub.createdAt || sub.subscribedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleDelete(sub._id)}
                          disabled={deleting === sub._id}
                          className="text-sm font-semibold text-red-500 hover:text-red-700 disabled:opacity-60"
                        >
                          {deleting === sub._id ? "Removing..." : "Remove"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}