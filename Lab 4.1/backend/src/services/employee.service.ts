import type { Employee, EmployeeWithRole } from "../models/employee.model";
import { EmployeeRepository } from "../repositories/employee.repository";
import { RoleRepository } from "../repositories/role.repository";
import { ApiError } from "../utils/ApiError";
import type { ListEmployeesQuery } from "../validation/employee.validation";

/**
 * Service — business logic only. No Express objects (req/res) here,
 * and no direct data access: it asks the repositories.
 */
export class EmployeeService {
  constructor(
    private readonly employees = new EmployeeRepository(),
    private readonly roles = new RoleRepository(),
  ) {}

  list(query: ListEmployeesQuery): EmployeeWithRole[] {
    // If a roleId filter was given, it must name a real role —
    // otherwise the caller gets a clear 400, not an empty list.
    if (query.roleId && !this.roles.findById(query.roleId)) {
      throw ApiError.badRequest(`Unknown roleId: ${query.roleId}.`);
    }
    return this.employees.findAll(query).map((e) => this.withRole(e));
  }

  getById(id: string): EmployeeWithRole {
    const employee = this.employees.findById(id);
    if (!employee) throw ApiError.notFound(`Employee not found: ${id}.`);
    return this.withRole(employee);
  }

  private withRole(e: Employee): EmployeeWithRole {
    const role = this.roles.findById(e.roleId);
    return {
      ...e,
      fullName: `${e.firstName} ${e.lastName}`,
      roleTitle: role?.title ?? "Unknown role",
    };
  }
}
