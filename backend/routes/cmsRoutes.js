import { Router } from "express";
import { createCrudController } from "../controllers/crudController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

// Create public + admin routes for a CMS model
export const createCmsRoutes = (Model) => {
  const controller = createCrudController(Model);

  const publicRouter = Router();
  publicRouter.get("/", controller.getAllPublic);
  publicRouter.get("/slug/:slug", controller.getBySlug);

  const adminRouter = Router();
  adminRouter.use(requireAuth, requireAdmin);
  adminRouter.get("/", controller.getAllAdmin);
  adminRouter.get("/:id", controller.getById);
  adminRouter.post("/", controller.create);
  adminRouter.put("/:id", controller.update);
  adminRouter.delete("/:id", controller.remove);

  return { publicRouter, adminRouter };
};