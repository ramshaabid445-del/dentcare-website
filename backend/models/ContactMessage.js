import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String, default: "", trim: true },
}, { timestamps: true });

export default mongoose.model("ContactMessage", contactMessageSchema);
