import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import api from "../../services/api";
import styles from "./Login.module.css";
import { useAuth } from "../../context/AuthContext";
import type { User } from "../../types/user";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await api.post("/auth/login", { email, password });

      // save to auth context (and context persists to localStorage)
      const usr = data.user as User;
      login(data.token, usr);

      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleLogin}>
        <div className={styles.hero}>
          <h2 className={styles.title}>Iniciar sesión</h2>
        </div>

        {error && <div className={styles.message}>{error}</div>}

        {/* EMAIL */}
        <div className={styles.group}>
          <Mail className={styles.leftIcon} size={18} />
          <input
            className={styles.input}
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className={styles.group}>
          <Lock className={styles.leftIcon} size={18} />
          <input
            className={styles.input}
            type={showPass ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className={styles.toggle}
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* SUBMIT */}
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? (
            "Cargando.."
          ) : (
            <>
              <LogIn size={18} /> Entrar
            </>
          )}
        </button>
      </form>
    </div>
  );
}
