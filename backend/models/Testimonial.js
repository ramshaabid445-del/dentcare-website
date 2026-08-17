import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, default: "Happy Patient" },
    quote: { type: String, default: "" },
    image: { type: String, default: "" },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    showOnHome: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;