import type { NextFunction, Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";

// Only signed-in users may create entries. GET routes stay open
// so anyone can still view the directory.
export function requireSignedIn(req: Request, _res: Response, next: NextFunction): void {
  if (!env.clerkSecretKey) {
    next(ApiError.unauthorized("Sign-in is not set up yet. Add CLERK_SECRET_KEY to backend/.env."));
    return;
  }
  const auth = getAuth(req);
  if (!auth.isAuthenticated) {
    next(ApiError.unauthorized("Log in to add an entry."));
    return;
  }
  next();
}
