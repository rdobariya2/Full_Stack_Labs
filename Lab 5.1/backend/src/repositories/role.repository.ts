import type { PrismaClient } from "@prisma/client";
import { prisma as defaultPrisma } from "../lib/prisma";
import type { Role } from "../models/role.model";

export class RoleRepository {
  constructor(private readonly db: PrismaClient = defaultPrisma) {}

  async findAll(): Promise<Role[]> {
    const rows = await this.db.role.findMany({ orderBy: { id: "asc" } });
    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      category: r.category === "ITS_Security" ? "ITS & Security" : r.category,
    }));
  }

  async findByTitle(title: string): Promise<Role | undefined> {
    const r = await this.db.role.findFirst({ where: { title } });
    if (!r) return undefined;
    return {
      id: r.id,
      title: r.title,
      description: r.description,
      category: r.category === "ITS_Security" ? "ITS & Security" : r.category,
    };
  }

  async create(input: { id: string; title: string; description: string; category: "Executive" | "Management" | "ITS_Security" }): Promise<Role> {
    const r = await this.db.role.create({ data: input });
    return {
      id: r.id,
      title: r.title,
      description: r.description,
      category: r.category === "ITS_Security" ? "ITS & Security" : r.category,
    };
  }

  async findById(id: string): Promise<Role | undefined> {
    const r = await this.db.role.findUnique({ where: { id } });
    if (!r) return undefined;
    return {
      id: r.id,
      title: r.title,
      description: r.description,
      category: r.category === "ITS_Security" ? "ITS & Security" : r.category,
    };
  }
}
