import { useEffect, useState } from "react";
import { api } from "../../../api";
import ImageInput from "../../../components/ImageInput";

export default function AdminHomeContent() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getHomeContent();
        setContent(data.content);
      } catch (err) {
        setError(err.message || "Failed to load home content");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateImage = (field, value) => {
    setContent((previous) => ({ ...previous, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await api.updateHomeContent({
        hero: { image: content.hero?.image || "" },
        aboutDoctorImage: content.aboutDoctorImage || "",
        whyChooseUs: { image: content.whyChooseUs?.image || "" },
        faqImage: content.faqImage || "",
        // Search-bar location + appointment date (now editable from the dashboard)
        location: content.location || "",
        appointmentDate: content.appointmentDate || "",
      });
      setSuccess("Homepage content saved successfully!");
    } catch (err) {
      setError(err.message || "Failed to save homepage content");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-brand-gray">Loading homepage content...</p>;
  if (!content) return <p className="text-brand-gray">No content available</p>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading text-brand-navy">Home Page Content</h2>
          <p className="mt-1 text-sm text-brand-gray">
            Manage homepage images, plus the search-bar location and appointment date.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-brand-green hover:bg-brand-green-dark transition-colors text-white text-sm font-semibold px-6 py-3 rounded-xl disabled:opacity-60 shrink-0"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {error && <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">{error}</div>}
      {success && <div className="mb-5 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600">{success}</div>}

      <div className="space-y-6">
        {/* Location & Appointment Date — shown on the home page hero search bar */}
        <div className="rounded-2xl bg-white shadow-md p-6">
          <h3 className="text-lg font-heading text-brand-navy mb-1">Search Bar – Location & Appointment</h3>
          <p className="mb-4 text-sm text-brand-gray">
            These values appear on the home page hero search bar next to "Location" and
            "Appointment Date". Updating them here is reflected immediately on the live site.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1.5">Location</label>
              <input
                type="text"
                value={content.location || ""}
                onChange={(e) => setContent((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="e.g. Yogyakarta, Indonesia"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1.5">Appointment Date</label>
              <input
                type="text"
                value={content.appointmentDate || ""}
                onChange={(e) => setContent((prev) => ({ ...prev, appointmentDate: e.target.value }))}
                placeholder="e.g. 04 August 2022"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-md p-6">
          <h3 className="text-lg font-heading text-brand-navy mb-4">Hero Section Image</h3>
          <ImageInput label="Hero Image" value={content.hero?.image || ""} onChange={(value) => setContent((previous) => ({ ...previous, hero: { ...previous.hero, image: value } }))} />
        </div>

        <div className="rounded-2xl bg-white shadow-md p-6">
          <h3 className="text-lg font-heading text-brand-navy mb-1">About Section Doctor Image</h3>
          <p className="mb-4 text-sm text-brand-gray">This changes the large doctor image only. The small About image stays static.</p>
          <ImageInput label="Doctor Image" value={content.aboutDoctorImage || "/images/home2.jpeg"} onChange={(value) => updateImage("aboutDoctorImage", value)} />
        </div>

        <div className="rounded-2xl bg-white shadow-md p-6">
          <h3 className="text-lg font-heading text-brand-navy mb-4">Why Choose Us Image</h3>
          <ImageInput label="Why Choose Us Image" value={content.whyChooseUs?.image || ""} onChange={(value) => setContent((previous) => ({ ...previous, whyChooseUs: { ...previous.whyChooseUs, image: value } }))} />
        </div>

        <div className="rounded-2xl bg-white shadow-md p-6">
          <h3 className="text-lg font-heading text-brand-navy mb-4">FAQ Section Image</h3>
          <ImageInput label="FAQ Image" value={content.faqImage || ""} onChange={(value) => updateImage("faqImage", value)} />
        </div>
      </div>
    </div>
  );
}
