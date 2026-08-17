import { Router } from "express";
import { validationResult } from "express-validator";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";
import { appointmentValidator } from "../validators/appointmentValidators.js";
import { createAppointment, getMyAppointments, getMyAppointmentStats, createContactMessage, createComment, getAdminAppointments, getAdminContacts, getAdminComments, updateCommentStatus, deleteComment, getApprovedComments, updateAppointmentStatus, subscribeToNewsletter, getAdminSubscribers, deleteAdminSubscriber } from "../controllers/engagementController.js";

const router = Router();

// Validation result handler
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};

// Appointment routes
router.post("/appointments", requireAuth, appointmentValidator, handleValidation, createAppointment);
router.get("/appointments/me", requireAuth, getMyAppointments);
router.get("/appointments/me/stats", requireAuth, getMyAppointmentStats);
router.put("/admin/appointments/:id", requireAuth, requireAdmin, updateAppointmentStatus);

// Contact message routes
router.post("/contact-messages", createContactMessage);

// Comment routes
router.post("/comments", requireAuth, createComment);
router.get("/comments/approved", getApprovedComments);
router.get("/admin/comments", requireAuth, requireAdmin, getAdminComments);
router.put("/admin/comments/:id", requireAuth, requireAdmin, updateCommentStatus);
router.delete("/admin/comments/:id", requireAuth, requireAdmin, deleteComment);

// Admin appointment routes
router.get("/admin/appointments", requireAuth, requireAdmin, getAdminAppointments);

// Admin contact routes
router.get("/admin/contact-messages", requireAuth, requireAdmin, getAdminContacts);

// Newsletter subscriber routes
router.post("/subscribers", subscribeToNewsletter);
router.get("/admin/subscribers", requireAuth, requireAdmin, getAdminSubscribers);
router.delete("/admin/subscribers/:id", requireAuth, requireAdmin, deleteAdminSubscriber);

export default router;
