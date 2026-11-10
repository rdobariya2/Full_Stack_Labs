import { z } from "zod";
import { ApiError } from "../utils/ApiError";

/** GET /api/roles takes no query parameters. */
export const listRolesQuerySchema = z.object({}).strict();

export const roleIdSchema = z
  .string()
  .regex(/^role-[a-z0-9-]+$/, "Role id must look like 'role-ceo'.");

export function parseListRolesQuery(query: unknown): void {
  const result = listRolesQuerySchema.safeParse(query);
  if (!result.success) {
    throw ApiError.badRequest("This endpoint takes no query parameters.", result.error.flatten().fieldErrors);
  }
}

export function parseRoleId(id: unknown): string {
  const result = roleIdSchema.safeParse(id);
  if (!result.success) {
    throw ApiError.badRequest("Invalid role id.", result.error.issues.map((i) => i.message));
  }
  return result.data;
}
