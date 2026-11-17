import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller";
import { requireSignedIn } from "../middleware/auth";

export function employeeRoutes(controller = new EmployeeController()): Router {
  const router = Router();
  router.get("/", controller.list);
  router.get("/:id", controller.getById);
  router.post("/", requireSignedIn, controller.create);
  return router;
}
