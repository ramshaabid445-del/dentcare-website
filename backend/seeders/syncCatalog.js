import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Doctor from "../models/Doctor.js";
import Service from "../models/Service.js";
import { doctors } from "../../frontend/src/pages/doctors/doctorData.js";
import { serviceDetails } from "../../frontend/src/pages/ServiceData.js";

dotenv.config();

try {
  await connectDB();
  await Doctor.bulkWrite(doctors.map((doctor) => ({ updateOne: { filter: { slug: doctor.slug }, update: { $set: { name: doctor.name, slug: doctor.slug, image: doctor.image, specialty: doctor.specialty, shortBio: doctor.bio, biography: doctor.about, qualifications: doctor.degree, experience: doctor.experience, details: doctor.focus, showOnHome: true, status: "active" } }, upsert: true } })));
  await Service.bulkWrite(serviceDetails.map((service) => ({ updateOne: { filter: { slug: service.slug }, update: { $set: { name: service.title, slug: service.slug, image: service.image, shortDescription: service.tagline, fullDescription: service.about, details: service.services, showOnHome: true, status: "active" } }, upsert: true } })));
  console.log(`Synced ${doctors.length} doctors and ${serviceDetails.length} services to Atlas.`);
  process.exit(0);
} catch (error) { console.error(error.message); process.exit(1); }
