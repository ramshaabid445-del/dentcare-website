import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const seedDemoUser = async () => {
  try {
    await connectDB();

    const email = "demo@medcare.com";
    const existing = await User.findOne({ email });
    if (existing) {
      console.log(`Demo user already exists: ${email}`);
      process.exit(0);
    }

    await User.create({
      name: "Demo User",
      email,
      password: "Demo@12345",
      role: "user",
    });

    console.log(`Demo user created: ${email} / Demo@12345`);
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding demo user: ${error.message}`);
    process.exit(1);
  }
};

seedDemoUser();