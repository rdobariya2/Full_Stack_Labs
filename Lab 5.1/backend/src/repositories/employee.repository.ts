import type { PrismaClient } from "@prisma/client";
import { prisma as defaultPrisma } from "../lib/prisma";
import type { Employee } from "../models/employee.model";

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

  async findDepartmentIdByName(name: string): Promise<string | undefined> {
    const d = await this.db.department.findFirst({ where: { name } });
    return d?.id;
  }

  async listDepartments(): Promise<{ id: string; name: string }[]> {
    return this.db.department.findMany({ orderBy: { name: "asc" } });
  }

  async nextId(): Promise<string> {
    const last = await this.db.employee.findFirst({ orderBy: { id: "desc" } });
    const n = last ? Number(last.id.replace("emp-", "")) + 1 : 1;
    return `emp-${String(n).padStart(2, "0")}`;
  }

  async create(input: { id: string; firstName: string; lastName: string; departmentId: string; roleId: string }): Promise<Employee> {
    const r = await this.db.employee.create({
      data: input,
      include: { department: true, role: true },
    });
    return {
      id: r.id,
      firstName: r.firstName,
      lastName: r.lastName,
      department: r.department.name,
      roleId: r.roleId,
    };
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
