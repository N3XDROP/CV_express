import express from "express";
import cors from "cors";
import "dotenv/config";
import { AppDataSource } from "./config/db";
import authRoutes from "./routes/auth.routes";

const app = express();

// CORS: allow frontend origin from env or fallback
app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET no definido en .env");
  process.exit(1);
}
if (!process.env.DB_TYPE) {
  console.error("❌ DB_TYPE no definido en .env");
  process.exit(1);
}
// if (!process.env.FRONTEND_URL) {
//   console.error("❌ FRONTEND_URL no definido en .env");
//   process.exit(1);
// }

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Base de datos conectada");

    app.listen(process.env.PORT || 4000, () => {
      console.log("✅ Servidor corriendo en puerto 4000");
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar la DB:", error);
  });