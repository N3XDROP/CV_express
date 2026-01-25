import { Request } from "express";
import { UserRole } from "../entities/User";

export interface AuthUser {
  id: number;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}