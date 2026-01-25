import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Save, Eye, EyeOff, PersonStanding } from "lucide-react";
import api from "../../services/api";
import styles from "./Register.module.css";
import { ROLE_LABELS, UserRole, type RoleType } from "../../types/user";

export function RegisterUser() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<RoleType>(UserRole.user);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password || !name || !lastName) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await api.post("/auth/register", {
        email,
        password,
        name,
        lastName,
        role,
      });

      navigate("/login", {
        replace: true,
        state: {
          success: "Cuenta creada correctamente. Ahora puedes iniciar sesión.",
        },
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleRegister}>
        <div className={styles.hero}>
          <h2 className={styles.title}>Registrar Usuarios</h2>
        </div>

        {error && <div className={styles.message}>{error}</div>}

        {/* NAME */}
        <div className={styles.group}>
          <PersonStanding className={styles.leftIcon} size={18} />
          <input
            className={styles.input}
            type="text"
            placeholder="Nombre"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* LASTNAME */}
        <div className={styles.group}>
          <PersonStanding className={styles.leftIcon} size={18} />
          <input
            className={styles.input}
            type="text"
            placeholder="Apellido"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* EMAIL */}
        <div className={styles.group}>
          <Mail className={styles.leftIcon} size={18} />
          <input
            className={styles.input}
            type="email"
            placeholder="Correo"
            value={email}
            required
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
            minLength={8}
            required
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

        {/* ROLE */}
        <div className={styles.group}>
          <PersonStanding className={styles.leftIcon} size={18} />

          <select
            className={styles.input}
            value={role}
            onChange={(e) => setRole(e.target.value as RoleType)}
          >
            {Object.values(UserRole).map((value) => (
              <option key={value} value={value}>
                {ROLE_LABELS[value]}
              </option>
            ))}
          </select>
        </div>

        {/* SUBMIT */}
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? (
            "Cargando.."
          ) : (
            <>
              <Save size={18} /> Registrarse
            </>
          )}
        </button>

        {/* LINK A REGISTRO */}
        <p className={styles.loginText}>
          ¿Ya estás registrado?{" "}
          <span
            className={styles.loginLink}
            onClick={() => navigate("/login")}
            role="button"
            tabIndex={0}
          >
            Logueate
          </span>
        </p>

        {/* LINK A HOME */}
        <p className={styles.backHome}>
          <span className={styles.backHomeLink} onClick={() => navigate("/")}>
            ← Volver al inicio
          </span>
        </p>
      </form>
    </div>
  );
}
