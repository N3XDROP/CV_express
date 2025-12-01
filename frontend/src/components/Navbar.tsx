import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "1rem",
        background: "#0f172a",
        display: "flex",
        gap: "1rem",
        color: "white",
      }}
    >
      <Link to="/">Home</Link>

      {/* SOLO ADMIN ve Dashboard */}
      {token && user?.role === "1" && (
        <Link
          to="/dashboard"
          style={{ color: "white", textDecoration: "none" }}
        >
          Dashboard
        </Link>
      )}

      {token ? (
        <button onClick={handleLogout}>Cerrar sesión</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
