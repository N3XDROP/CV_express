import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import PublicRoute from "./components/PublicRoute";
import { UserRole } from "./types/user";
import { Register } from "./pages/Register/Register";
import { RegisterUser } from "./pages/Register/RegisterUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* SIN NAVBAR */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* SIN NAVBAR */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* CON NAVBAR */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole={UserRole.admin}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/registerUser"
            element={
              <ProtectedRoute requiredRole={UserRole.admin}>
                <RegisterUser />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
