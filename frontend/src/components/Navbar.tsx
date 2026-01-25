import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css";
import { UserRole } from "../types/user";

export default function Navbar() {
  const navigate = useNavigate();
  const { token, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.brand}>
        Home
      </Link>

      <div className={styles.links}>
        {/* SOLO ADMIN ve Dashboard */}
        {token && user?.role === UserRole.admin && (
          <Link to="/dashboard" className={styles.adminLink}>
            Dashboard
          </Link>
        )}

        {/* SOLO ADMIN ve RegisterUser */}
        {token && user?.role === UserRole.admin && (
          <Link to="/registerUser" className={styles.adminLink}>
            RegistrarUsuario
          </Link>
        )}

        {token ? (
          <button className={styles.btn} onClick={handleLogout}>
            Cerrar sesión
          </button>
        ) : (
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
