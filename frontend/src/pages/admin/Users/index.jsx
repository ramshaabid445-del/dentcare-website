import { useEffect, useState } from "react";
import { api } from "../../../api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.getAdminUsers();
      setUsers(data.users);
    } catch (err) {
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.deleteAdminUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete user");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-heading text-brand-navy">Users</h2>
        <p className="mt-1 text-sm text-brand-gray">Manage registered users</p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-brand-gray">Loading users...</p>
      ) : (
        <div className="rounded-2xl bg-white shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-100 bg-[#f8faf7]">
                  <th className="py-4 px-6 text-xs font-semibold text-brand-gray uppercase">Name</th>
                  <th className="py-4 px-6 text-xs font-semibold text-brand-gray uppercase">Email</th>
                  <th className="py-4 px-6 text-xs font-semibold text-brand-gray uppercase">Role</th>
                  <th className="py-4 px-6 text-xs font-semibold text-brand-gray uppercase">Joined</th>
                  <th className="py-4 px-6 text-xs font-semibold text-brand-gray uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-sm text-brand-gray">No users found</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="border-b border-gray-50">
                      <td className="py-4 px-6 text-sm font-semibold text-brand-navy">{user.name}</td>
                      <td className="py-4 px-6 text-sm text-brand-gray">{user.email}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${user.role === "admin" ? "bg-brand-green/10 text-brand-green" : "bg-gray-100 text-brand-gray"}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-brand-gray">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
                      </td>
                      <td className="py-4 px-6">
                        {user.role !== "admin" && (
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="text-sm font-semibold text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        )}
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