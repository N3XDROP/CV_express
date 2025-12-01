import { Request } from "express";

export interface AuthUser {
  id: number;
  role: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}