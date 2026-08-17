import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import homeContentRoutes from "./routes/homeContentRoutes.js";
import { createCmsRoutes } from "./routes/cmsRoutes.js";
import Blog from "./models/Blog.js";
import BlogCategory from "./models/BlogCategory.js";
import Doctor from "./models/Doctor.js";
import Service from "./models/Service.js";
import PricingPlan from "./models/PricingPlan.js";
import Testimonial from "./models/Testimonial.js";
import engagementRoutes from "./routes/engagementRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin not allowed by CORS"));
  },
}));
app.use(express.json());

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", engagementRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/home-content", homeContentRoutes);

// CMS public routes
const blogRoutes = createCmsRoutes(Blog);
const blogCategoryRoutes = createCmsRoutes(BlogCategory);
const doctorRoutes = createCmsRoutes(Doctor);
const serviceRoutes = createCmsRoutes(Service);
const pricingRoutes = createCmsRoutes(PricingPlan);
const testimonialRoutes = createCmsRoutes(Testimonial);

app.use("/api/blogs", blogRoutes.publicRouter);
app.use("/api/blog-categories", blogCategoryRoutes.publicRouter);
app.use("/api/doctors", doctorRoutes.publicRouter);
app.use("/api/services", serviceRoutes.publicRouter);
app.use("/api/pricing", pricingRoutes.publicRouter);
app.use("/api/testimonials", testimonialRoutes.publicRouter);

// CMS admin routes
app.use("/api/admin/blogs", blogRoutes.adminRouter);
app.use("/api/admin/blog-categories", blogCategoryRoutes.adminRouter);
app.use("/api/admin/doctors", doctorRoutes.adminRouter);
app.use("/api/admin/services", serviceRoutes.adminRouter);
app.use("/api/admin/pricing", pricingRoutes.adminRouter);
app.use("/api/admin/testimonials", testimonialRoutes.adminRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "MedCare API is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});