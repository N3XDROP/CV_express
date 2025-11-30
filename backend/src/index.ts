import express from "express";
import cors from "cors";
import "dotenv/config";
import { AppDataSource } from "./config/db";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // URL React
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

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