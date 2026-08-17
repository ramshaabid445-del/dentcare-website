import { Router } from "express";
import { signup, login, getMe, logout, updateMyProfile } from "../controllers/authController.js";
import { signupValidator, loginValidator } from "../validators/authValidators.js";
import { validationResult } from "express-validator";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

// Validation result handler
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};

// Public routes
router.post("/signup", signupValidator, handleValidation, signup);
router.post("/login", loginValidator, handleValidation, login);

// Private routes
router.get("/me", requireAuth, getMe);
router.post("/logout", requireAuth, logout);
router.put("/profile", requireAuth, updateMyProfile);

export default router;
