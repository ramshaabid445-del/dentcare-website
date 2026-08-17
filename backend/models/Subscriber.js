import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  name: { type: String, trim: true, default: "" },
  subscribedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Subscriber", subscriberSchema);