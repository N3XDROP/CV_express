import { Router } from "express";
import { listarUsuarios, login } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";

const router = Router();

router.post("/login", login);
router.get("/users", authMiddleware, isAdmin, listarUsuarios);

export default router;
