import { Router } from "express";
import { RoleController } from "../controllers/role.controller";
import { requireSignedIn } from "../middleware/auth";

export function roleRoutes(controller = new RoleController()): Router {
  const router = Router();
  router.get("/", controller.list);
  router.get("/:id", controller.getById);
  router.post("/", requireSignedIn, controller.create);
  return router;
}
