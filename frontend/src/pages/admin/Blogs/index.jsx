import AdminCrud from "../../../components/AdminCrud";

const fields = [
  { key: "title", label: "Title" },
  { key: "slug", label: "Slug" },
  { key: "excerpt", label: "Excerpt", type: "textarea" },
  { key: "content", label: "Full Content", type: "textarea" },
  { key: "image", label: "Featured Image", type: "image" },
  { key: "author", label: "Author" },
  { key: "category", label: "Category" },
  { key: "tags", label: "Tags (comma separated)" },
  { key: "status", label: "Status", type: "select", options: ["draft", "published"] },
  { key: "showOnHome", label: "Show on Home", type: "checkbox" },
];

const columns = [
  { key: "title", label: "Title" },
  { key: "category", label: "Category" },
  { key: "author", label: "Author" },
  {
    key: "status",
    label: "Status",
    render: (item) => (
      <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${item.status === "published" ? "bg-brand-green/10 text-brand-green" : "bg-gray-100 text-brand-gray"}`}>
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

export default function AdminBlogs() {
  return (
    <AdminCrud
      resource="blogs"
      title="Blogs"
      fields={fields}
      columns={columns}
      initialForm={{ status: "published", showOnHome: true }}
    />
  );
}
