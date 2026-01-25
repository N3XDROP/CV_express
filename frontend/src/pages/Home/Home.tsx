import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Home.module.css";
import { ROLE_LABELS } from "../../types/user";
import { formatDate, formatTime } from "../../utils/date";

export default function Home() {
  const { user } = useAuth();

  const location = useLocation();
  const errorMessage = location.state?.error as string | undefined;

  return (
    <div className={styles.root}>
      {/* Alertas */}
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}

      <h1 className={styles.welcome}>
        Bienvenido/a{" "}
        <strong>{user ? `${user.name} ${user.lastName}` : "visitante"}</strong>
      </h1>

      {user ? (
        <div className={styles.userCard}>
          <p className={styles.line}>
            Eres un{" "}
            <strong className={styles.role}>{ROLE_LABELS[user.role]}</strong>
          </p>

          <p className={styles.line}>
            Tu correo es: <strong>{user.email}</strong>
          </p>

          <div className={styles.line}>
            Tu cuenta se creó el: <strong>{formatDate(user.createdAt)}</strong>
          </div>

          <div className={styles.line}>
            A las: <strong>{formatTime(user.createdAt)}</strong>
          </div>
        </div>
      ) : (
        <p>No has iniciado sesión</p>
      )}
    </div>
  );
}
