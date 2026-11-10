import type { Employee, EmployeeWithRole } from "../models/employee.model";
import { EmployeeRepository } from "../repositories/employee.repository";
import { RoleRepository } from "../repositories/role.repository";
import { ApiError } from "../utils/ApiError";
import type { ListEmployeesQuery } from "../validation/employee.validation";

/**
 * Service — business logic only. No Express objects (req/res) here,
 * and no direct data access: it asks the repositories.
 * Lab 4.2: methods are now async because the repositories read
 * from PostgreSQL via Prisma.
 */
export class EmployeeService {
  constructor(
    private readonly employees = new EmployeeRepository(),
    private readonly roles = new RoleRepository(),
  ) {}

  async list(query: ListEmployeesQuery): Promise<EmployeeWithRole[]> {
    // If a roleId filter was given, it must name a real role —
    // otherwise the caller gets a clear 400, not an empty list.
    if (query.roleId && !(await this.roles.findById(query.roleId))) {
      throw ApiError.badRequest(`Unknown roleId: ${query.roleId}.`);
    }
    const list = await this.employees.findAll(query);
    return Promise.all(list.map((e) => this.withRole(e)));
  }

  async getById(id: string): Promise<EmployeeWithRole> {
    const employee = await this.employees.findById(id);
    if (!employee) throw ApiError.notFound(`Employee not found: ${id}.`);
    return this.withRole(employee);
  }

  private async withRole(e: Employee): Promise<EmployeeWithRole> {
    const role = await this.roles.findById(e.roleId);
    return {
      ...e,
      fullName: `${e.firstName} ${e.lastName}`,
      roleTitle: role?.title ?? "Unknown role",
    };
  }
}
