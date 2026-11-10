import type { Employee } from "../models/employee.model";

/**
 * TEMPORARY DATA — Lab 4.1.
 * The same 16 employees in the same 5 departments as
 * employees_dept.json (Labs 1.1–3.2), flattened from
 * department -> employees into one list. No database is used yet
 * (that is Lab 5); this file is the only place Employee data
 * lives, and only the EmployeeRepository reads it.
 *
 * roleId links each person to a Role in data/roles.ts, taken from
 * Appendix B of the case study. The assignments are the lab's
 * own reasonable mapping by department — the case study does not
 * give a role for these 16 names.
 */
export const employees: Employee[] = [
  // Executive & Administration
  { id: "emp-01", firstName: "Eleanor", lastName: "Vance", department: "Executive & Administration", roleId: "role-ceo" },
  { id: "emp-02", firstName: "Thomas", lastName: "Wright", department: "Executive & Administration", roleId: "role-coo" },
  { id: "emp-03", firstName: "Gemma", lastName: "Aria", department: "Executive & Administration", roleId: "role-cfo" },
  // Information Technology
  { id: "emp-04", firstName: "Sarah", lastName: "Jenkins", department: "Information Technology", roleId: "role-director-it" },
  { id: "emp-05", firstName: "Marcus", lastName: "Brody", department: "Information Technology", roleId: "role-network-admin" },
  { id: "emp-06", firstName: "David", lastName: "Chen", department: "Information Technology", roleId: "role-service-desk-analyst" },
  { id: "emp-07", firstName: "Amina", lastName: "Kaur", department: "Information Technology", roleId: "role-infosec-analyst" },
  // Personal & Business Banking
  { id: "emp-08", firstName: "Maria", lastName: "Gonzalez", department: "Personal & Business Banking", roleId: "role-vp-client-services" },
  { id: "emp-09", firstName: "James", lastName: "Wilson", department: "Personal & Business Banking", roleId: "role-manager-sales" },
  { id: "emp-10", firstName: "Aisha", lastName: "Patel", department: "Personal & Business Banking", roleId: "role-manager-customer-experience" },
  { id: "emp-11", firstName: "Lucas", lastName: "Moreau", department: "Personal & Business Banking", roleId: "role-manager-marketing" },
  // Wealth Management & Mortgages
  { id: "emp-12", firstName: "Robert", lastName: "Taylor", department: "Wealth Management & Mortgages", roleId: "role-director-financial-audit" },
  { id: "emp-13", firstName: "Linda", lastName: "Martinez", department: "Wealth Management & Mortgages", roleId: "role-manager-internal-audit" },
  { id: "emp-14", firstName: "Sophia", lastName: "Rossi", department: "Wealth Management & Mortgages", roleId: "role-manager-operational-risk" },
  // Risk & Compliance
  { id: "emp-15", firstName: "Anika", lastName: "Sharma", department: "Risk & Compliance", roleId: "role-manager-risk" },
  { id: "emp-16", firstName: "Alan", lastName: "Turing", department: "Risk & Compliance", roleId: "role-manager-security-architecture" },
];
