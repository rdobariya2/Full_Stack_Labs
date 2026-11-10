import type { Role } from "../models/role.model";
import { RoleRepository } from "../repositories/role.repository";
import { ApiError } from "../utils/ApiError";

/** Service — business logic only. No Express objects, no direct data access. */
export class RoleService {
  constructor(private readonly roles = new RoleRepository()) {}

  list(): Role[] {
    return this.roles.findAll();
  }

  getById(id: string): Role {
    const role = this.roles.findById(id);
    if (!role) throw ApiError.notFound(`Role not found: ${id}.`);
    return role;
  }
}
