import { Router } from "express";
import { getHomeContent } from "../controllers/homeContentController.js";

const router = Router();

// Public route - get home content
router.get("/", getHomeContent);

export default router;