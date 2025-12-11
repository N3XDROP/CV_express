import { useAuth } from "../../contexts/AuthContext";
import styles from "./Home.module.css";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className={styles.root}>
      <h1 className={styles.welcome}>Bienvenido</h1>

      {user ? (
        <div className={styles.userCard}>
          <div>
            {user.name} {user.lastName} — <strong>Rol:</strong> {user.role}
          </div>

          <div className={styles.meta}>Usuario registrado desde: {user.createdAt || 'N/A'}</div>

          <pre className={styles.pre}>{JSON.stringify(user, null, 2)}</pre>
        </div>
      ) : (
        <p>No has iniciado sesión</p>
      )}
    </div>
  );
}
