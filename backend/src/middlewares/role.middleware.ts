import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth.request";
import { UserRole } from "../entities/User";

export const requireRole = (roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Permisos insuficientes" });
    }
    next();
  };
};
