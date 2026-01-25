import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/auth.request";
import { UserRole } from "../entities/User";

interface JwtPayload {
  id: number;
  role: UserRole;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Formato de token inválido" });
    }
    const [, token] = authHeader.split(" ");

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no está definido");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
