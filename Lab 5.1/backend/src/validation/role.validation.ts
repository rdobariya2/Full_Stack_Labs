import { z } from "zod";
import { ApiError } from "../utils/ApiError";

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

export const createRoleSchema = z
  .object({
    title: z.string().trim().min(1).max(100),
    description: z.string().trim().min(1).max(500),
    category: z.enum(["Executive", "Management", "ITS & Security"]),
  })
  .strict();

export type CreateRoleInput = z.infer<typeof createRoleSchema>;

export function parseCreateRole(body: unknown): CreateRoleInput {
  const result = createRoleSchema.safeParse(body);
  if (!result.success) {
    throw ApiError.badRequest("Invalid role.", result.error.flatten().fieldErrors);
  }
  return result.data;
}

export function parseRoleId(id: unknown): string {
  const result = roleIdSchema.safeParse(id);
  if (!result.success) {
    throw ApiError.badRequest("Invalid role id.", result.error.issues.map((i) => i.message));
  }
  return result.data;
}
