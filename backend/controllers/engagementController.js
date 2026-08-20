import Appointment from "../models/Appointment.js";
import ContactMessage from "../models/ContactMessage.js";
import Comment from "../models/Comment.js";
import Subscriber from "../models/Subscriber.js";
import { sendAppointmentNotification, sendAppointmentConfirmation } from "../utils/emailService.js";

export const createAppointment = async (req, res) => {
  try {
    console.log("📅 Creating appointment for user:", req.user.name);
    
    const appointment = await Appointment.create({
      ...req.body,
      user: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });

    console.log("✓ Appointment created with ID:", appointment._id);

    // Send email notification to admin (async, don't wait)
    console.log("📧 Triggering email notification...");
    sendAppointmentNotification(appointment).then((result) => {
      if (!result.success) {
        console.warn(`⚠️  Email notification failed for appointment ${appointment._id}: ${result.reason}`);
        // Appointment is still saved, just log the email issue
      } else {
        console.log("✅ Email notification sent successfully");
      }
    }).catch((err) => {
      console.error("❌ Error in email notification:", err);
    });

    res.status(201).json({ message: "Appointment request submitted successfully", appointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(400).json({ message: error.message || "Failed to book appointment" });
  }
};

export const getMyAppointments = async (req, res) => {
  const appointments = await Appointment.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ appointments });
};

export const getMyAppointmentStats = async (req, res) => {
  const [total, upcoming, completed] = await Promise.all([
    Appointment.countDocuments({ user: req.user._id }),
    Appointment.countDocuments({ user: req.user._id, status: { $in: ["pending", "confirmed"] } }),
    Appointment.countDocuments({ user: req.user._id, status: "completed" }),
  ]);
  res.json({ stats: { total, upcoming, completed } });
};

export const getNotifications = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const [appointments, subscribers, comments] = await Promise.all([
        Appointment.find().sort({ createdAt: -1 }).limit(10).lean(),
        Subscriber.find().sort({ createdAt: -1 }).limit(10).lean(),
        Comment.find({ status: "pending" }).sort({ createdAt: -1 }).limit(10).lean(),
      ]);
      const notifications = [
        ...appointments.map((appointment) => ({
          id: `appointment-${appointment._id}`,
          title: "New appointment activity",
          message: `${appointment.name} has a ${appointment.status} appointment for ${appointment.department}.`,
          createdAt: appointment.createdAt,
        })),
        ...subscribers.map((subscriber) => ({
          id: `subscriber-${subscriber._id}`,
          title: "New newsletter subscriber",
          message: `${subscriber.email} subscribed to the newsletter.`,
          createdAt: subscriber.createdAt || subscriber.subscribedAt,
        })),
        ...comments.map((comment) => ({
          id: `comment-${comment._id}`,
          title: "Comment awaiting approval",
          message: `${comment.name} submitted a comment for review.`,
          createdAt: comment.createdAt,
        })),
      ]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 20);
      return res.json({ notifications });
    }

    const [appointments, comments] = await Promise.all([
      Appointment.find({ user: req.user._id }).sort({ updatedAt: -1 }).limit(10).lean(),
      Comment.find({ user: req.user._id }).sort({ updatedAt: -1 }).limit(10).lean(),
    ]);
    const notifications = [
      ...appointments.map((appointment) => ({
        id: `appointment-${appointment._id}`,
        title: "Appointment update",
        message: `Your ${appointment.department} appointment is ${appointment.status}.`,
        createdAt: appointment.updatedAt || appointment.createdAt,
      })),
      ...comments.map((comment) => ({
        id: `comment-${comment._id}`,
        title: "Comment update",
        message: `Your comment was ${comment.status}.`,
        createdAt: comment.updatedAt || comment.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 20);
    res.json({ notifications });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to load notifications" });
  }
};

export const createContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.create(req.body);
    res.status(201).json({ message: "Your message has been sent", contactMessage: message });
  } catch (error) { res.status(400).json({ message: error.message || "Failed to send message" }); }
};

export const createComment = async (req, res) => {
  try {
    const comment = await Comment.create({ user: req.user._id, name: req.user.name, profileImage: req.user.profileImage, message: req.body.message });
    res.status(201).json({ message: "Comment sent for admin approval", comment });
  } catch (error) { res.status(400).json({ message: error.message || "Failed to submit comment" }); }
};

export const getAdminAppointments = async (req, res) => res.json({ appointments: await Appointment.find().sort({ createdAt: -1 }) });

export const deleteAdminAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to delete appointment" });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // Validate status
    if (!["pending", "confirmed", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid appointment status" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Send confirmation email to patient (async, non-blocking)
    sendAppointmentConfirmation(appointment, status).catch((err) => {
      console.error("Failed to send appointment status email:", err);
    });

    res.json({ message: "Appointment status updated successfully", appointment });
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to update appointment" });
  }
};

export const getAdminContacts = async (req, res) => res.json({ contacts: await ContactMessage.find().sort({ createdAt: -1 }) });
export const getAdminComments = async (req, res) => res.json({ comments: await Comment.find().sort({ createdAt: -1 }) });
export const updateCommentStatus = async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
  if (!comment) return res.status(404).json({ message: "Comment not found" });
  res.json({ comment });
};
export const deleteComment = async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);
  if (!comment) return res.status(404).json({ message: "Comment not found" });
  res.json({ message: "Comment deleted successfully" });
};
export const getApprovedComments = async (req, res) => res.json({ comments: await Comment.find({ status: "approved" }).sort({ updatedAt: -1 }).limit(3) });

// ===== Subscriber (Newsletter) routes =====

export const subscribeToNewsletter = async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if already subscribed
    const existing = await Subscriber.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(200).json({ message: "You are already subscribed to our newsletter!", alreadySubscribed: true });
    }

    const subscriber = await Subscriber.create({ email, name: name || "" });
    res.status(201).json({ message: "Successfully subscribed to our newsletter!", subscriber });
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to subscribe" });
  }
};

export const getAdminSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json({ subscribers });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch subscribers" });
  }
};

export const deleteAdminSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }
    res.json({ message: "Subscriber removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to delete subscriber" });
  }
};

export const getSubscriberStats = async (req, res) => {
  try {
    const totalSubscribers = await Subscriber.countDocuments();
    res.json({ stats: { totalSubscribers } });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch subscriber stats" });
  }
};
