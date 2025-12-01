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
    const lastName = readline.question("LastName: ");
    const password = readline.question("Password (minimo 8 caracteres): ", {
      hideEchoBack: true,
    });

    console.log("\nSelecciona rol:");
    console.log("0 → Usuario");
    console.log("1 → Admin");

    const roleInput = readline.question("\nRol (1/0) [default: 1]: ");

    let role: UserRole;

    if (roleInput === "1") {
      role = UserRole.admin;
    } else if (roleInput === "0") {
      role = UserRole.user;
    } else {
      throw new Error("Rol inválido");
    }

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
    user.lastName = lastName;
    user.password = password; // se encripta automático
    user.role = role;

    await userRepository.save(user);

    console.log("\n✅ Usuario creado con éxito");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`📧 Email: ${email}`);
    console.log(`👤 Nombre: ${name}`);
    console.log(`👤 Apellido: ${lastName}`);
    console.log(`🛡 Rol: ${role}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error al crear usuario:", error);
    process.exit(1);
  }
};

createAdmin();
