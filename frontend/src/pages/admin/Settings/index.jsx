import { useState } from "react";
import { api } from "../../../api";
import { useAuth } from "../../../context/AuthContext";

export default function AdminProfile() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const data = await api.updateAdminProfile({ name, email, currentPassword, newPassword });
      updateUser(data.user);
      setCurrentPassword("");
      setNewPassword("");
      setSuccess("Profile updated successfully.");
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-heading text-brand-navy">Admin Profile</h2>
        <p className="mt-1 text-sm text-brand-gray">Update your admin name, email, or password.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl bg-white shadow-md p-6 space-y-5">
        {error && <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">{error}</div>}
        {success && <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600">{success}</div>}

        <div>
          <label className="block text-xs font-semibold text-brand-navy mb-1.5">Name</label>
          <input value={name} onChange={(event) => setName(event.target.value)} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-brand-navy mb-1.5">Email</label>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
        </div>

        <div className="border-t border-gray-100 pt-5">
          <h3 className="font-semibold text-brand-navy">Change password</h3>
          <p className="mt-1 text-xs text-brand-gray">Leave New Password blank if you only want to update your name or email.</p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-brand-navy mb-1.5">Current Password</label>
          <input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-brand-navy mb-1.5">New Password</label>
          <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} minLength="6" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
        </div>

        <button disabled={saving} className="bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors disabled:opacity-60">
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
