import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const { ADMIN_NAME: name, ADMIN_EMAIL: email, ADMIN_PASSWORD: password } = process.env;
    if (!name || !email || !password) {
      throw new Error("ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD must be set in .env before seeding an admin.");
    }

    const existing = await User.findOne({ email });
    if (existing) {
      console.log(`Admin already exists with email: ${email}`);
      process.exit(0);
    }

    await User.create({
      name,
      email,
      password,
      role: "admin",
    });

    console.log(`Admin created successfully: ${email}`);
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding admin: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
