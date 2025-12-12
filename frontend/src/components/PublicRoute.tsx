import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

export default function PublicRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  // No permitir que un usuario que ya inició sesion se rediriga a una ruta pública
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
