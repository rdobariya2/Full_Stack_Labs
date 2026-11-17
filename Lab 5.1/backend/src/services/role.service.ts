import type { Role } from "../models/role.model";
import { RoleRepository } from "../repositories/role.repository";
import { ApiError } from "../utils/ApiError";

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

  async create(input: { title: string; description: string; category: "Executive" | "Management" | "ITS & Security" }): Promise<Role> {
    const existing = await this.roles.findByTitle(input.title);
    if (existing) throw ApiError.badRequest(`A role with this title already exists: ${input.title}.`);
    const id = "role-" + input.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const category = input.category === "ITS & Security" ? "ITS_Security" : input.category;
    return this.roles.create({ id, title: input.title, description: input.description, category });
  }
}
