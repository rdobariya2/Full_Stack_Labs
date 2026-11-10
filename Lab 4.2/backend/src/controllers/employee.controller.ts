import type { NextFunction, Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";
import { parseEmployeeId, parseListEmployeesQuery } from "../validation/employee.validation";

/**
 * Controller — the ONLY layer that touches req/res.
 * It validates input, calls the service, and shapes the response.
 * It contains no business logic and no data access.
 * Lab 4.2: handlers are async because the service now reads
 * from PostgreSQL via Prisma.
 */
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
}
