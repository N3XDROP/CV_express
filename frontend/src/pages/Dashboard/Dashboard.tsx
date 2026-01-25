import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "./Dashboard.module.css";
import { ROLE_LABELS, type User } from "../../types/user";
import { formatDate, formatDateTime, formatTime } from "../../utils/date";

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

              <small>Rol: {ROLE_LABELS[user.role]}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
