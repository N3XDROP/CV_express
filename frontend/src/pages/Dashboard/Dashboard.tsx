import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "./Dashboard.module.css";
import type { User } from "../../types/user";

function getRoleLabel(role: string): string {
  return role === "1" ? "Admin" : "Usuario";
}

function formatDate(dateString?: string): string {
  if (!dateString) return "Fecha no disponible";

  const date = new Date(dateString);
  return date.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatTime(dateString?: string): string {
  if (!dateString) return "Hora no disponible";

  const date = new Date(dateString);
  return date.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Para AM/PM
  });
}

function formatDateTime(dateString?: string): string {
  if (!dateString) return "Fecha no disponible";

  const date = new Date(dateString);
  return date.toLocaleString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/auth/users");

        setUsers(data.users);
      } catch (err: any) {
        console.error(err);

        if (err.response?.status === 401) {
          setError("No autorizado. Inicia sesión nuevamente");
        } else if (err.response?.status === 403) {
          setError("No tienes permisos para ver esta información");
        } else {
          setError("Error al cargar los usuarios");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Cargando usuarios...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Usuarios en base de datos</h1>

      {users.length === 0 ? (
        <p>No hay usuarios registrados</p>
      ) : (
        <div className={styles.grid}>
          {users.map((user) => (
            <div key={user.id} className={styles.card}>
              <h3>
                {user.name} {user.lastName}
              </h3>

              <p>ID: {user.id}</p>
              <p>Correo: {user.email}</p>
              <p>Creado El: {formatDate(user.createdAt)}</p>
              <p>Creado A las: {formatTime(user.createdAt)}</p>
              <p>Fecha Creación: {formatDateTime(user.createdAt)}</p>

              <small>Rol: {getRoleLabel(user.role)}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
