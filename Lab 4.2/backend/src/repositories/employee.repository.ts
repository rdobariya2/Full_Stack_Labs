import type { PrismaClient } from "@prisma/client";
import { prisma as defaultPrisma } from "../lib/prisma";
import type { Employee } from "../models/employee.model";

/**
 * Repository — the ONLY layer that touches the database.
 * Lab 4.2: Prisma (PostgreSQL) replaces the Lab 4.1 in-memory
 * arrays. Services and controllers did not need to change their
 * shape — only to await the results.
 *
 * The query returns employees with their department and role
 * joined in, so the service can resolve department names and
 * role titles without a second query per employee.
 */
export class EmployeeRepository {
  constructor(private readonly db: PrismaClient = defaultPrisma) {}

  async findAll(filters?: { department?: string; roleId?: string }): Promise<Employee[]> {
    const rows = await this.db.employee.findMany({
      where: {
        ...(filters?.department ? { department: { name: filters.department } } : {}),
        ...(filters?.roleId ? { roleId: filters.roleId } : {}),
      },
      include: { department: true, role: true },
      orderBy: { id: "asc" },
    });
    return rows.map((r) => ({
      id: r.id,
      firstName: r.firstName,
      lastName: r.lastName,
      department: r.department.name,
      roleId: r.roleId,
    }));
  }

  async findById(id: string): Promise<Employee | undefined> {
    const r = await this.db.employee.findUnique({
      where: { id },
      include: { department: true, role: true },
    });
    if (!r) return undefined;
    return {
      id: r.id,
      firstName: r.firstName,
      lastName: r.lastName,
      department: r.department.name,
      roleId: r.roleId,
    };
  }
}
