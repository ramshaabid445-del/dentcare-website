import AdminCrud from "../../../components/AdminCrud";

const fields = [
  { key: "name", label: "Patient Name" },
  { key: "role", label: "Role" },
  { key: "quote", label: "Testimonial Text", type: "textarea" },
  { key: "image", label: "Profile Image", type: "image" },
  { key: "rating", label: "Rating (1-5)" },
  { key: "status", label: "Status", type: "select", options: ["active", "inactive"] },
  { key: "showOnHome", label: "Show on Home", type: "checkbox" },
];

const columns = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  {
    key: "rating",
    label: "Rating",
    render: (item) => "★".repeat(item.rating || 0) + "☆".repeat(5 - (item.rating || 0)),
  },
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

export default function AdminTestimonials() {
  return <AdminCrud resource="testimonials" title="Testimonials" fields={fields} columns={columns} />;
}