/**
 * Employee.
 *
 * The 16 people, and their 5 departments, are exactly the temporary
 * data from employees_dept.json (Labs 1.1–3.2). The only additions
 * are a stable `id` and a `roleId` linking each employee to a Role
 * from the case study (Appendix B) — the front-end previously had
 * no Role data at all, so Lab 4.1 introduces it here, in the
 * back-end, rather than inventing it in the front-end.
 */
export interface Employee {
  /** e.g. "emp-01" */
  id: string;
  firstName: string;
  lastName: string;
  /** Department name, exactly as in employees_dept.json. */
  department: string;
  /** Foreign key into Role.id, e.g. "role-ceo". */
  roleId: string;
}

/** Employee as returned by the API: role title resolved for display. */
export interface EmployeeWithRole extends Employee {
  fullName: string;
  roleTitle: string;
}
