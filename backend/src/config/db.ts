import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import "dotenv/config";

const DB_TYPE = process.env.DB_TYPE;

let AppDataSource: DataSource;

// MYSQL (XAMPP)
if (DB_TYPE === "mysql") {
  console.log("🟡 Usando base de datos MYSQL (XAMPP)");

  AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT || 3306),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User],
  });
}

// SUPABASE (POSTGRES)
else if (DB_TYPE === "supabase") {
  console.log("🟢 Usando base de datos SUPABASE (Postgres)");

  AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.SUPABASE_URL,
    ssl: { rejectUnauthorized: false },
    synchronize: true,
    logging: false,
    entities: [User],
  });
}

// ❌ ERROR
else {
  throw new Error("❌ DB_TYPE no definido correctamente en .env");
}

export { AppDataSource };