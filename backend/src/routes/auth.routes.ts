import { Router } from "express";
import { listarUsuarios, login } from "../controllers/auth.controller";
import { authMiddleware } from "../middelwares/auth.middleware";
import { isAdmin } from "../middelwares/isAdmin.middleware";

const router = Router();

router.post("/login", login);
router.get("/users", authMiddleware, isAdmin, listarUsuarios);

export default router;
