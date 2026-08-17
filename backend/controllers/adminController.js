import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Doctor from "../models/Doctor.js";
import Service from "../models/Service.js";
import Blog from "../models/Blog.js";
import PricingPlan from "../models/PricingPlan.js";
import Testimonial from "../models/Testimonial.js";
import Appointment from "../models/Appointment.js";
import ContactMessage from "../models/ContactMessage.js";
import Comment from "../models/Comment.js";
import Subscriber from "../models/Subscriber.js";

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    const [totalDoctors, totalServices, totalBlogs, totalPricingPlans, totalTestimonials, totalAppointments, totalContacts, pendingComments, totalSubscribers] = await Promise.all([
      Doctor.countDocuments(), Service.countDocuments(), Blog.countDocuments(), PricingPlan.countDocuments(), Testimonial.countDocuments(),
      Appointment.countDocuments(), ContactMessage.countDocuments(), Comment.countDocuments({ status: "pending" }), Subscriber.countDocuments(),
    ]);

    res.json({
      stats: {
        totalUsers,
        totalAdmins,
        totalDoctors,
        totalServices,
        totalBlogs,
        totalPricingPlans,
        totalTestimonials,
        totalAppointments,
        totalContacts,
        pendingComments,
        totalSubscribers,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error fetching stats" });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error fetching users" });
  }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "admin") {
      return res.status(400).json({ message: "Cannot delete an admin account" });
    }
    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error deleting user" });
  }
};

// @desc    Update the signed-in admin's profile
// @route   PUT /api/admin/profile
// @access  Private/Admin
export const updateProfile = async (req, res) => {
  const { name, email, currentPassword, newPassword } = req.body;

  try {
    const admin = await User.findById(req.user._id).select("+password");
    if (!admin) return res.status(404).json({ message: "Admin account not found" });

    if (!currentPassword) {
      return res.status(400).json({ message: "Enter your current password to save changes" });
    }

    const passwordMatches = await bcrypt.compare(currentPassword, admin.password);
    if (!passwordMatches) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    if (email && email.toLowerCase() !== admin.email) {
      const emailInUse = await User.findOne({ email: email.toLowerCase(), _id: { $ne: admin._id } });
      if (emailInUse) return res.status(400).json({ message: "That email is already in use" });
      admin.email = email.toLowerCase().trim();
    }
    if (name?.trim()) admin.name = name.trim();
    if (newPassword) {
      if (newPassword.length < 6) return res.status(400).json({ message: "New password must be at least 6 characters" });
      admin.password = newPassword;
    }

    await admin.save();
    res.json({
      message: "Profile updated successfully",
      user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role, profileImage: admin.profileImage },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to update profile" });
  }
};
