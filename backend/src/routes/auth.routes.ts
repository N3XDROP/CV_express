import { Router } from "express";
import { listarUsuarios, login, register, registerUser } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";
import { UserRole } from "../entities/User";

const router = Router();

router.post("/login", login);
router.get("/users", authMiddleware, requireRole([UserRole.admin]), listarUsuarios);
router.post("/register", register);
router.post("/registerUser", authMiddleware, requireRole([UserRole.admin]), registerUser);

export default router;
