import type { Employee, EmployeeWithRole } from "../models/employee.model";
import { EmployeeRepository } from "../repositories/employee.repository";
import { RoleRepository } from "../repositories/role.repository";
import { ApiError } from "../utils/ApiError";
import type { ListEmployeesQuery } from "../validation/employee.validation";

export class EmployeeService {
  constructor(
    private readonly employees = new EmployeeRepository(),
    private readonly roles = new RoleRepository(),
  ) {}

  async list(query: ListEmployeesQuery): Promise<EmployeeWithRole[]> {
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

  async create(input: { firstName: string; lastName: string; department: string; roleId: string }): Promise<EmployeeWithRole> {
    const role = await this.roles.findById(input.roleId);
    if (!role) throw ApiError.badRequest(`Unknown roleId: ${input.roleId}.`);
    const departmentId = await this.employees.findDepartmentIdByName(input.department);
    if (!departmentId) throw ApiError.badRequest(`Unknown department: ${input.department}.`);
    const id = await this.employees.nextId();
    const employee = await this.employees.create({ id, firstName: input.firstName, lastName: input.lastName, departmentId, roleId: input.roleId });
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
