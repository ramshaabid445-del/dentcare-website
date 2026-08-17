import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    image: { type: String, default: "" },
    specialty: { type: String, default: "" },
    shortBio: { type: String, default: "" },
    biography: { type: String, default: "" },
    qualifications: { type: String, default: "" },
    experience: { type: String, default: "" },
    contact: { type: String, default: "" },
    availability: { type: String, default: "" },
    socialLinks: [{ type: String }],
    details: [{ type: String }],
    showOnHome: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
