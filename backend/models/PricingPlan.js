import mongoose from "mongoose";

const pricingPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: String, required: true },
    billingPeriod: { type: String, default: "/Month" },
    description: { type: String, default: "" },
    features: [{ type: String }],
    ctaText: { type: String, default: "Get Started" },
    ctaLink: { type: String, default: "/contact" },
    featured: { type: Boolean, default: false },
    showOnHome: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

const PricingPlan = mongoose.model("PricingPlan", pricingPlanSchema);

export default PricingPlan;