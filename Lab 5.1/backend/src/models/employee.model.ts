export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
  roleId: string;
}

export interface EmployeeWithRole extends Employee {
  fullName: string;
  roleTitle: string;
}
