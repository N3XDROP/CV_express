import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  requiredRole?: string; // optional role required to view route (e.g. '1')
}

export default function ProtectedRoute({ children, requiredRole }: Props) {
  const { token, user } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  if (requiredRole && user?.role !== requiredRole) {
    // If user is authenticated but not authorized, redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
}