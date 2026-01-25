import { User } from "lucide-react";

export const UserRole = {
  user: "0",
  admin: "1"
} as const;

export type RoleType = typeof UserRole[keyof typeof UserRole];
export const AVAILABLE_ROLES = Object.values(UserRole);

export const ROLE_LABELS: Record<RoleType, string> = {
  [UserRole.user]: "Usuario",
  [UserRole.admin]: "Administrador",
} as const;

export interface User {
  id: number;
  email: string;
  name: string;
  lastName: string;
  role: RoleType;
  createdAt?: string;
  uptatedAt?: string;
  deletedAt?: string | null;
}

export interface AuthState {
  token: string | null;
  user: User | null;
}
