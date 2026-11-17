import express, { type Express } from "express";
import helmet from "helmet";
import { clerkMiddleware } from "@clerk/express";
import { env } from "./config/env";
import { corsMiddleware } from "./middleware/cors";
import { apiNotFound, errorHandler } from "./middleware/errorHandler";
import { employeeRoutes } from "./routes/employee.routes";
import { roleRoutes } from "./routes/role.routes";

export function createApp(): Express {
  const app = express();

  app.use(helmet());
  app.use(corsMiddleware);
  app.use(express.json());

  // Clerk checks the session token on each request. Only used when
  // the keys are set in backend/.env, otherwise auth stays off and
  // POST routes answer 401 in the auth middleware.
  if (env.clerkSecretKey) {
    app.use(clerkMiddleware());
  }

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/employees", employeeRoutes());
  app.use("/api/roles", roleRoutes());

  app.use("/api", apiNotFound);
  app.use(errorHandler);
  return app;
}
