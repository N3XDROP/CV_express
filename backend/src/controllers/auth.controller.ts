import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { User, UserRole } from "../entities/User";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña requeridos" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no está definido");
    }

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al loguearse" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, lastName } = req.body;

    if (!email || !password || !name || !lastName) {
      return res.status(400).json({ message: "¡Hay campos sin llenar!" });
    }

    const userRepo = AppDataSource.getRepository(User);
    const emailExists = await userRepo.findOne({ where: { email } });
    if (emailExists) {
      return res.status(409).json({ message: "El email ya está en uso" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "La contraseña debe tener al menos 8 caracteres {Backend}",
      });
    }

    const user = new User();
    user.email = email;
    user.password = password;
    user.name = name;
    user.lastName = lastName;
    user.role = UserRole.user;

    await userRepo.save(user);
    res.status(201).json({ message: "Usuario registrado con éxito {backend}" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrarse" });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name, lastName, role } = req.body;

    if (!email || !password || !name || !lastName) {
      return res.status(400).json({ message: "¡Hay campos sin llenar!" });
    }

    const userRepo = AppDataSource.getRepository(User);
    const emailExists = await userRepo.findOne({ where: { email } });
    if (emailExists) {
      return res.status(409).json({ message: "El email ya está en uso" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "La contraseña debe tener al menos 8 caracteres {Backend}",
      });
    }

    if (!Object.values(UserRole).includes(role)) {
      return res.status(400).json({ message: "Rol inválido" });
    }
    const finalRole: UserRole = role;

    const user = new User();
    user.email = email;
    user.password = password;
    user.name = name;
    user.lastName = lastName;
    user.role = finalRole;

    await userRepo.save(user);
    res.status(201).json({ message: "Usuario registrado con éxito {backend}" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar Usuario" });
  }
};

export const listarUsuarios = async (req: Request, res: Response) => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const users = await userRepo.find();

    if (users.length === 0) {
      return res.status(404).json({ message: "No hay usuarios registrados" });
    }

    res.json({
      message: "Usuarios obtenidos con éxito",
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        deletedAt: user.deletedAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};
