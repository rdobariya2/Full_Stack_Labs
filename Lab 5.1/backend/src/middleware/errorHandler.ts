import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof Error && err.message.startsWith("Origin not allowed")) {
    res.status(403).json({ error: { message: "Forbidden: this API only accepts requests from the Pixell River front-end." } });
    return;
  }
  if (err instanceof ApiError) {
    res.status(err.status).json({
      error: { message: err.message, ...(err.details ? { details: err.details } : {}) },
    });
    return;
  }
  console.error(err);
  res.status(500).json({ error: { message: "Internal server error." } });
}

export function apiNotFound(_req: Request, res: Response): void {
  res.status(404).json({ error: { message: "Route not found." } });
}
