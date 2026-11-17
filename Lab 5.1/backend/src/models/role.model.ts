export type RoleCategory = "Executive" | "Management" | "ITS & Security";

export interface Role {
  id: string;
  title: string;
  description: string;
  category: RoleCategory;
}
