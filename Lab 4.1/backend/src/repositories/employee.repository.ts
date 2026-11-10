import { employees } from "../data/employees";
import type { Employee } from "../models/employee.model";

/**
 * Repository — the ONLY layer that touches the data source.
 * In Lab 4.1 that source is the temporary in-memory array in
 * data/employees.ts. In the next lab this class is swapped for a
 * database implementation; services and controllers do not change.
 */
export class EmployeeRepository {
  findAll(filters?: { department?: string; roleId?: string }): Employee[] {
    return employees.filter((e) => {
      if (filters?.department && e.department !== filters.department) return false;
      if (filters?.roleId && e.roleId !== filters.roleId) return false;
      return true;
    });
  }

  findById(id: string): Employee | undefined {
    return employees.find((e) => e.id === id);
  }
}
