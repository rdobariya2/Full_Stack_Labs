import type { NextFunction, Request, Response } from "express";
import { RoleService } from "../services/role.service";
import { parseCreateRole, parseListRolesQuery, parseRoleId } from "../validation/role.validation";

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

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const input = parseCreateRole(req.body);
      const data = await this.service.create(input);
      res.status(201).json({ data });
    } catch (err) {
      next(err);
    }
  };
}
