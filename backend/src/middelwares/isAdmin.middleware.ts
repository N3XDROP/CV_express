import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth.request";

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autenticado" });
  }

  if (req.user.role !== "1") {
    return res
      .status(403)
      .json({ message: "No tienes permisos de administrador" });
  }

  next();
};
