import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String, default: "", trim: true },
  status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled"], default: "pending" },
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);
