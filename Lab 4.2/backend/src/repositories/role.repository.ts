import type { PrismaClient } from "@prisma/client";
import { prisma as defaultPrisma } from "../lib/prisma";
import type { Role } from "../models/role.model";

/**
 * Repository — the ONLY layer that touches the database.
 * Lab 4.2: Prisma (PostgreSQL) replaces the Lab 4.1 in-memory array.
 */
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
