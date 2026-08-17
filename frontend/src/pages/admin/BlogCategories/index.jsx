import AdminCrud from "../../../components/AdminCrud";

const fields = [
  { key: "name", label: "Category Name" },
  { key: "slug", label: "Slug" },
  { key: "status", label: "Status", type: "select", options: ["active", "inactive"] },
];

const columns = [
  { key: "name", label: "Category" },
  { key: "slug", label: "Slug" },
  { key: "status", label: "Status" },
];

export default function AdminBlogCategories() {
  return <AdminCrud resource="blog-categories" title="Blog Categories" fields={fields} columns={columns} />;
}
