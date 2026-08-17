import { useState, useRef } from "react";
import { api } from "../api";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5001/api").replace(/\/api\/?$/, "");

export default function ImageInput({ label, value, onChange }) {
  const [source, setSource] = useState(value && value.startsWith("/uploads") ? "upload" : "url");
  const [url, setUrl] = useState(value && !value.startsWith("/uploads") ? value : "");
  const [preview, setPreview] = useState(value || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const handleUrlChange = (e) => {
    const val = e.target.value;
    setUrl(val);
    setError("");
    if (val.trim()) {
      setPreview(val);
      onChange(val.trim());
    } else {
      setPreview("");
      onChange("");
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setError("Only JPG, JPEG, PNG, and WEBP images are allowed");
      return;
    }
    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    // Show local preview immediately
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    setError("");

    // Upload to backend
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const data = await api.uploadImage(formData);
      setPreview(API_URL + data.url);
      onChange(API_URL + data.url);
    } catch (err) {
      setError(err.message || "Upload failed");
      setPreview(value || "");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-brand-navy mb-1.5">{label}</label>

      {/* Source selector */}
      <div className="flex gap-3 mb-3">
        <button
          type="button"
          onClick={() => { setSource("url"); setError(""); }}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${source === "url" ? "bg-brand-green text-white" : "bg-gray-100 text-brand-gray"}`}
        >
          Image URL
        </button>
        <button
          type="button"
          onClick={() => { setSource("upload"); setError(""); }}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${source === "upload" ? "bg-brand-green text-white" : "bg-gray-100 text-brand-gray"}`}
        >
          Upload Image
        </button>
      </div>

      {source === "url" ? (
        <input
          type="url"
          value={url}
          onChange={handleUrlChange}
          placeholder="https://example.com/image.jpg"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
        />
      ) : (
        <div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="w-full rounded-xl border-2 border-dashed border-gray-300 px-4 py-4 text-sm font-semibold text-brand-gray hover:border-brand-green hover:text-brand-green transition-colors disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Choose Image"}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}

      {error && (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      )}

      {preview && (
        <div className="mt-3">
          <p className="text-xs text-brand-gray mb-1.5">Preview:</p>
          <img
            src={preview}
            alt="Preview"
            className="w-full h-32 object-cover rounded-xl border border-gray-200"
            onError={() => setError("Invalid image URL or image cannot be loaded")}
          />
        </div>
      )}
    </div>
  );
}
