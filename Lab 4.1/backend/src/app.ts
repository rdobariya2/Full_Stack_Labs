import express, { type Express } from "express";
import helmet from "helmet";
import { corsMiddleware } from "./middleware/cors";
import { apiNotFound, errorHandler } from "./middleware/errorHandler";
import { employeeRoutes } from "./routes/employee.routes";
import { roleRoutes } from "./routes/role.routes";

/** Builds the Express app. server.ts only starts it, so tests can import app without listening. */
export function createApp(): Express {
  const app = express();

  app.use(helmet());
  app.use(corsMiddleware);
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/employees", employeeRoutes());
  app.use("/api/roles", roleRoutes());

  app.use("/api", apiNotFound);
  app.use(errorHandler);
  return app;
}
