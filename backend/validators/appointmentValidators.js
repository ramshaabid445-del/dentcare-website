import { body } from "express-validator";

export const appointmentValidator = [
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),
  body("department")
    .trim()
    .notEmpty()
    .withMessage("Department is required")
    .isIn([
      "General Dentistry",
      "Cosmetic Dentistry",
      "Orthodontics",
      "Oral Surgery",
      "Pediatric Dentistry",
      "Periodontics",
      "Cardiology",
      "General Medicine",
      "Emergency Care",
    ])
    .withMessage("Invalid department selected"),
  body("date")
    .trim()
    .notEmpty()
    .withMessage("Appointment date is required")
    .isISO8601()
    .withMessage("Invalid date format")
    .custom((value) => {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        throw new Error("Appointment date cannot be in the past");
      }
      return true;
    }),
  body("time")
    .trim()
    .notEmpty()
    .withMessage("Preferred time is required")
    .isIn([
      "Morning (9am - 12pm)",
      "Afternoon (12pm - 4pm)",
      "Evening (4pm - 7pm)",
      "Afternoon (1pm - 4pm)",
      "Evening (5pm - 8pm)",
    ])
    .withMessage("Invalid time slot selected"),
  body("message")
    .trim()
    .optional()
    .isLength({ max: 500 })
    .withMessage("Message cannot exceed 500 characters"),
];
