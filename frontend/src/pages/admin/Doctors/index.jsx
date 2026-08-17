import AdminCrud from "../../../components/AdminCrud";

const fields = [
  { key: "name", label: "Name" },
  { key: "slug", label: "Slug" },
  { key: "image", label: "Profile Image", type: "image" },
  { key: "specialty", label: "Specialization" },
  { key: "shortBio", label: "Short Bio", type: "textarea" },
  { key: "biography", label: "Full Biography", type: "textarea" },
  { key: "qualifications", label: "Qualifications" },
  { key: "experience", label: "Experience" },
  { key: "contact", label: "Contact" },
  { key: "availability", label: "Availability" },
  { key: "status", label: "Status", type: "select", options: ["active", "inactive"] },
  { key: "showOnHome", label: "Show on Home", type: "checkbox" },
];

const columns = [
  { key: "name", label: "Name" },
  { key: "specialty", label: "Specialization" },
  { key: "experience", label: "Experience" },
  {
    key: "status",
    label: "Status",
    render: (item) => (
      <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${item.status === "active" ? "bg-brand-green/10 text-brand-green" : "bg-gray-100 text-brand-gray"}`}>
        {item.status}
      </span>
    ),
  },
  {
    key: "showOnHome",
    label: "Home",
    render: (item) => (item.showOnHome ? "✓" : "—"),
  },
];

export default function AdminDoctors() {
  return <AdminCrud resource="doctors" title="Doctors" fields={fields} columns={columns} />;
}