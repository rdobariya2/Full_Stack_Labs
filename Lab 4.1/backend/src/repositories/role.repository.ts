import { roles } from "../data/roles";
import type { Role } from "../models/role.model";

/**
 * Repository — the ONLY layer that touches the data source.
 * In Lab 4.1 that source is the temporary in-memory array in
 * data/roles.ts. In the next lab this class is swapped for a
 * database implementation; services and controllers do not change.
 */
export class RoleRepository {
  findAll(): Role[] {
    return roles;
  }

  findById(id: string): Role | undefined {
    return roles.find((r) => r.id === id);
  }
}
