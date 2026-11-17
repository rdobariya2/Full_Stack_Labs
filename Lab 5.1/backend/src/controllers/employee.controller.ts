import type { NextFunction, Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";
import { parseCreateEmployee, parseEmployeeId, parseListEmployeesQuery } from "../validation/employee.validation";

export class EmployeeController {
  constructor(private readonly service = new EmployeeService()) {}

  list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = parseListEmployeesQuery(req.query);
      const data = await this.service.list(query);
      res.json({ data, count: data.length });
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseEmployeeId(req.params.id);
      res.json({ data: await this.service.getById(id) });
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const input = parseCreateEmployee(req.body);
      const data = await this.service.create(input);
      res.status(201).json({ data });
    } catch (err) {
      next(err);
    }
  };
}
