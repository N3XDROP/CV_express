import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  requiredRole?: string; // optional role required to view route (e.g. '1')
}

export default function ProtectedRoute({ children, requiredRole }: Props) {
  const { token, user } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <Navigate
        to="/"
        replace
        state={{ error: "No tienes permisos para acceder a esta sección" }}
      />
    );
  }

  return children;
}
