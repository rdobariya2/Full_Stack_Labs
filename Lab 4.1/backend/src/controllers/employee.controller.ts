import type { NextFunction, Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";
import { parseEmployeeId, parseListEmployeesQuery } from "../validation/employee.validation";

/**
 * Controller — the ONLY layer that touches req/res.
 * It validates input, calls the service, and shapes the response.
 * It contains no business logic and no data access.
 */
export class EmployeeController {
  constructor(private readonly service = new EmployeeService()) {}

  list = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const query = parseListEmployeesQuery(req.query);
      const data = this.service.list(query);
      res.json({ data, count: data.length });
    } catch (err) {
      next(err);
    }
  };

  getById = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const id = parseEmployeeId(req.params.id);
      res.json({ data: this.service.getById(id) });
    } catch (err) {
      next(err);
    }
  };
}
