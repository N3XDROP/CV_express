import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "./Dashboard.module.css";

interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No hay sesión activa");
          setLoading(false);
          return;
        }

        const { data } = await api.get("/auth/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

              <p>{user.email}</p>

              <small>Rol: {user.role}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
