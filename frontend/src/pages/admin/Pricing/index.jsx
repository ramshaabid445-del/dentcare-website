import AdminCrud from "../../../components/AdminCrud";

const fields = [
  { key: "name", label: "Plan Name" },
  { key: "price", label: "Price" },
  { key: "billingPeriod", label: "Billing Period" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "features", label: "Features (comma separated)" },
  { key: "ctaText", label: "CTA Text" },
  { key: "ctaLink", label: "CTA Link" },
  { key: "featured", label: "Featured/Recommended", type: "checkbox" },
  { key: "status", label: "Status", type: "select", options: ["active", "inactive"] },
  { key: "showOnHome", label: "Show on Home", type: "checkbox" },
];

const columns = [
  { key: "name", label: "Plan" },
  { key: "price", label: "Price" },
  { key: "billingPeriod", label: "Period" },
  {
    key: "featured",
    label: "Featured",
    render: (item) => (item.featured ? "★" : "—"),
  },
  {
    key: "showOnHome",
    label: "Home",
    render: (item) => (item.showOnHome ? "✓" : "—"),
  },
];

export default function AdminPricing() {
  return <AdminCrud resource="pricing" title="Pricing Plans" fields={fields} columns={columns} />;
}