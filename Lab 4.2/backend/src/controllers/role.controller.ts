import type { NextFunction, Request, Response } from "express";
import { RoleService } from "../services/role.service";
import { parseListRolesQuery, parseRoleId } from "../validation/role.validation";

/**
 * Controller — the ONLY layer that touches req/res.
 * It validates input, calls the service, and shapes the response.
 * It contains no business logic and no data access.
 * Lab 4.2: handlers are async because the service now reads
 * from PostgreSQL via Prisma.
 */
export class RoleController {
  constructor(private readonly service = new RoleService()) {}

  list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      parseListRolesQuery(req.query);
      const data = await this.service.list();
      res.json({ data, count: data.length });
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseRoleId(req.params.id);
      res.json({ data: await this.service.getById(id) });
    } catch (err) {
      next(err);
    }
  };
}
