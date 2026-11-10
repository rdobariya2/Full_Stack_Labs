/**
 * Role — a job role from Appendix B of the Pixell River Financial
 * case study (Role Job Descriptions / ITS and Security Roles).
 */
export type RoleCategory = "Executive" | "Management" | "ITS & Security";

export interface Role {
  /** e.g. "role-ceo" */
  id: string;
  /** e.g. "CEO/Chair of Board" */
  title: string;
  /** Short description, paraphrased from Appendix B. */
  description: string;
  category: RoleCategory;
}
