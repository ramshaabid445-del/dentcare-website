import AdminCrud from "../../../components/AdminCrud";

const fields = [
  { key: "name", label: "Name" },
  { key: "slug", label: "Slug" },
  { key: "shortDescription", label: "Short Description", type: "textarea" },
  { key: "fullDescription", label: "Full Description", type: "textarea" },
  { key: "image", label: "Image", type: "image" },
  { key: "icon", label: "Icon" },
  { key: "details", label: "Details (comma separated)" },
  { key: "status", label: "Status", type: "select", options: ["active", "inactive"] },
  { key: "showOnHome", label: "Show on Home", type: "checkbox" },
];

const columns = [
  { key: "name", label: "Name" },
  { key: "shortDescription", label: "Description" },
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

export default function AdminServices() {
  return <AdminCrud resource="services" title="Services" fields={fields} columns={columns} />;
}