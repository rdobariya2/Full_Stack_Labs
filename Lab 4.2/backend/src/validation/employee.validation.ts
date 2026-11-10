import { z } from "zod";
import { ApiError } from "../utils/ApiError";

/** GET /api/employees — only these query parameters are accepted. */
export const listEmployeesQuerySchema = z
  .object({
    department: z.string().trim().min(1).max(100).optional(),
    roleId: z
      .string()
      .trim()
      .regex(/^role-[a-z0-9-]+$/, "roleId must look like 'role-ceo'.")
      .optional(),
  })
  .strict();

export type ListEmployeesQuery = z.infer<typeof listEmployeesQuerySchema>;

export const employeeIdSchema = z
  .string()
  .regex(/^emp-\d{2}$/, "Employee id must look like 'emp-01'.");

export function parseListEmployeesQuery(query: unknown): ListEmployeesQuery {
  const result = listEmployeesQuerySchema.safeParse(query);
  if (!result.success) {
    throw ApiError.badRequest("Invalid query parameters.", result.error.flatten().fieldErrors);
  }
  return result.data;
}

export function parseEmployeeId(id: unknown): string {
  const result = employeeIdSchema.safeParse(id);
  if (!result.success) {
    throw ApiError.badRequest("Invalid employee id.", result.error.issues.map((i) => i.message));
  }
  return result.data;
}
