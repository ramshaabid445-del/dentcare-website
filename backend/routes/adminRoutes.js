import { Router } from "express";
import { getStats, getUsers, deleteUser, updateProfile } from "../controllers/adminController.js";
import { updateHomeContent, uploadHomeImage } from "../controllers/homeContentController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";

const router = Router();

// All admin routes are protected by requireAuth + requireAdmin
router.use(requireAuth, requireAdmin);

router.get("/stats", getStats);
router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);
router.put("/profile", updateProfile);

// Home content management
router.put("/home-content", updateHomeContent);
router.post("/home-content/upload", uploadImage.single("image"), uploadHomeImage);

export default router;
