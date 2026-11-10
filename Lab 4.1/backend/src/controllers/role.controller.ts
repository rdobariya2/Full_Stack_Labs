import type { NextFunction, Request, Response } from "express";
import { RoleService } from "../services/role.service";
import { parseListRolesQuery, parseRoleId } from "../validation/role.validation";

/**
 * Controller — the ONLY layer that touches req/res.
 * It validates input, calls the service, and shapes the response.
 * It contains no business logic and no data access.
 */
export class RoleController {
  constructor(private readonly service = new RoleService()) {}

  list = (req: Request, res: Response, next: NextFunction): void => {
    try {
      parseListRolesQuery(req.query);
      const data = this.service.list();
      res.json({ data, count: data.length });
    } catch (err) {
      next(err);
    }
  };

  getById = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const id = parseRoleId(req.params.id);
      res.json({ data: this.service.getById(id) });
    } catch (err) {
      next(err);
    }
  };
}
