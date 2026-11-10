import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller";

/**
 * Routes — URL mapping only. No logic lives here.
 *
 * Only the routes the front-end actually needs are exposed.
 * The front-end is read-only in Labs 1.1–3.2 (it lists employees
 * grouped by department), so there are deliberately NO
 * POST / PUT / PATCH / DELETE routes in Lab 4.1. They will be
 * added in a later lab if/when the front-end needs them.
 *
 *   GET /api/employees              — all employees (optional ?department=, ?roleId=)
 *   GET /api/employees/:id         — one employee, e.g. /api/employees/emp-01
 */
export function employeeRoutes(controller = new EmployeeController()): Router {
  const router = Router();
  router.get("/", controller.list);
  router.get("/:id", controller.getById);
  return router;
}
