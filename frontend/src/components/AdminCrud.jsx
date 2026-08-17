import { useEffect, useState } from "react";
import { api } from "../api";
import ImageInput from "./ImageInput";

export default function AdminCrud({ resource, title, fields, columns, initialForm = {} }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null); // null = list, {} = new, object = edit
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const cms = api.cmsAdmin(resource);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await cms.getAll();
      setItems(data.items);
    } catch (err) {
      setError(err.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = items.filter((item) =>
    columns.some((col) => String(item[col.key] || "").toLowerCase().includes(search.toLowerCase()))
  );

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      if (editing && editing._id) {
        await cms.update(editing._id, form);
        setSuccess("Updated successfully!");
      } else {
        await cms.create(form);
        setSuccess("Created successfully!");
      }
      setEditing(null);
      setForm({});
      load();
    } catch (err) {
      setError(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    setError("");
    setSuccess("");
    try {
      await cms.remove(id);
      setSuccess("Deleted successfully!");
      load();
    } catch (err) {
      setError(err.message || "Failed to delete");
    }
  };

  const startEdit = (item) => {
    setEditing(item);
    setForm({ ...item });
    setError("");
    setSuccess("");
  };

  const startNew = () => {
    setEditing({});
    setForm(initialForm);
    setError("");
    setSuccess("");
  };

  // Render form
  if (editing !== null) {
    return (
      <div>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading text-brand-navy">
              {editing._id ? `Edit ${title.slice(0, -1)}` : `Add ${title.slice(0, -1)}`}
            </h2>
          </div>
          <button
            onClick={() => { setEditing(null); setForm({}); }}
            className="text-sm font-semibold text-brand-gray hover:text-brand-green"
          >
            ← Back to list
          </button>
        </div>

        {error && <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">{error}</div>}
        {success && <div className="mb-5 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600">{success}</div>}

        <form onSubmit={handleSave} className="rounded-2xl bg-white shadow-md p-6 space-y-5">
          {fields.map((field) => {
            if (field.type === "image") {
              return (
                <ImageInput
                  key={field.key}
                  label={field.label}
                  value={form[field.key] || ""}
                  onChange={(val) => handleChange(field.key, val)}
                />
              );
            }
            if (field.type === "textarea") {
              return (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-brand-navy mb-1.5">{field.label}</label>
                  <textarea
                    value={form[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green resize-none min-h-[100px]"
                  />
                </div>
              );
            }
            if (field.type === "checkbox") {
              return (
                <div key={field.key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={!!form[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.checked)}
                    className="w-5 h-5 accent-brand-green"
                  />
                  <label className="text-sm font-semibold text-brand-navy">{field.label}</label>
                </div>
              );
            }
            if (field.type === "select") {
              return (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-brand-navy mb-1.5">{field.label}</label>
                  <select
                    value={form[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                  >
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              );
            }
            return (
              <div key={field.key}>
                <label className="block text-xs font-semibold text-brand-navy mb-1.5">{field.label}</label>
                <input
                  type="text"
                  value={form[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
              </div>
            );
          })}

          <button
            type="submit"
            disabled={saving}
            className="bg-brand-green hover:bg-brand-green-dark transition-colors text-white text-sm font-semibold px-6 py-3 rounded-xl disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    );
  }

  // Render list
  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading text-brand-navy">{title}</h2>
          <p className="mt-1 text-sm text-brand-gray">Manage {title.toLowerCase()}</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="flex-1 sm:flex-none sm:w-48 rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
          />
          <button
            onClick={startNew}
            className="bg-brand-green hover:bg-brand-green-dark transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-xl whitespace-nowrap shrink-0"
          >
            + Add
          </button>
        </div>
      </div>

      {error && <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">{error}</div>}
      {success && <div className="mb-5 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600">{success}</div>}

      {loading ? (
        <p className="text-brand-gray">Loading...</p>
      ) : (
        <div className="rounded-2xl bg-white shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-100 bg-[#f8faf7]">
                  {columns.map((col) => (
                    <th key={col.key} className="py-4 px-6 text-xs font-semibold text-brand-gray uppercase">{col.label}</th>
                  ))}
                  <th className="py-4 px-6 text-xs font-semibold text-brand-gray uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + 1} className="py-8 text-center text-sm text-brand-gray">No items found</td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item._id} className="border-b border-gray-50">
                      {columns.map((col) => (
                        <td key={col.key} className="py-4 px-6 text-sm text-brand-navy">
                          {col.render ? col.render(item) : String(item[col.key] || "-")}
                        </td>
                      ))}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <button onClick={() => startEdit(item)} className="text-sm font-semibold text-brand-green hover:text-brand-green-dark">Edit</button>
                          <button onClick={() => handleDelete(item._id)} className="text-sm font-semibold text-red-500 hover:text-red-700">Delete</button>
                        </div>
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
