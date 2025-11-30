import "reflect-metadata";
import "dotenv/config";
import { AppDataSource } from "../config/db";
import { User, UserRole } from "../entities/User";
import * as readline from "readline-sync";

const createAdmin = async () => {
  try {
    await AppDataSource.initialize();
    console.log("\n✅ Conectado a la base de datos\n");

    const userRepository = AppDataSource.getRepository(User);

    console.log("🔹 CREACIÓN DE NUEVO USUARIO ADMIN 🔹\n");

    const email = readline.questionEMail("Email: ");
    const name = readline.question("Name: ");
    const password = readline.question("Password (minimo 8 caracteres): ", {
      hideEchoBack: true,
    });

    console.log("\nSelecciona rol:");
    console.log("0 → Usuario");
    console.log("1 → Admin");
    console.log("2 → Comité");

    const roleInput = readline.question("\nRol (1/0/2) [default: 1]: ");

    const role =
      roleInput === "0"
        ? UserRole.user
        : roleInput === "2"
        ? UserRole.comite
        : UserRole.admin;

    const exists = await userRepository.findOne({
      where: { email },
    });

    if (exists) {
      console.log(`\n⚠️ Ya existe un usuario con el email: ${email}`);
      process.exit(0);
    }

    const user = new User();
    user.email = email;
    user.name = name;
    user.password = password; // se encripta automático
    user.role = role;

    await userRepository.save(user);

    console.log("\n✅ Usuario creado con éxito");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`📧 Email: ${email}`);
    console.log(`👤 Nombre: ${name}`);
    console.log(`🛡 Rol: ${role}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error al crear usuario:", error);
    process.exit(1);
  }
};

createAdmin();