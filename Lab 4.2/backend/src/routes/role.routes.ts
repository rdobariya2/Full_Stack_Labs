import { Router } from "express";
import { RoleController } from "../controllers/role.controller";

/**
 * Routes — URL mapping only. No logic lives here.
 *
 * Only the routes the front-end actually needs are exposed.
 * The front-end is read-only, so there are deliberately NO
 * POST / PUT / PATCH / DELETE routes in Lab 4.1.
 *
 *   GET /api/roles                 — all roles
 *   GET /api/roles/:id            — one role, e.g. /api/roles/role-ceo
 */
export function roleRoutes(controller = new RoleController()): Router {
  const router = Router();
  router.get("/", controller.list);
  router.get("/:id", controller.getById);
  return router;
}
