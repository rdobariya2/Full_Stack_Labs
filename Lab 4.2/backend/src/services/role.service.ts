import type { Role } from "../models/role.model";
import { RoleRepository } from "../repositories/role.repository";
import { ApiError } from "../utils/ApiError";

/** Service — business logic only. No Express objects, no direct data access. */
export class RoleService {
  constructor(private readonly roles = new RoleRepository()) {}

  async list(): Promise<Role[]> {
    return this.roles.findAll();
  }

  async getById(id: string): Promise<Role> {
    const role = await this.roles.findById(id);
    if (!role) throw ApiError.notFound(`Role not found: ${id}.`);
    return role;
  }
}
