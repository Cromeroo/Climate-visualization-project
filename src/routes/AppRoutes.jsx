import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import Proyecto from "../Pages/proyecto/proyecto";
import Biodiversidad from "../Pages/Biodiversidad/Biodiversidad";
import Variabilidad from "../Pages/Variabilidad-C/Variabilidad";
import LoginPage from "../Pages/auth/login";
import AdminPage from "../Pages/Admin/Admin";
import UsuariosAdmin from "../Pages/Admins_Users/usuariosAdmin";
//import UsuarioPage from "../Pages/UsuarioPage";
import ProtectedRoute from "../components/security/ProtectedRoute";
import Register from "../components/register/register";
import Territorios from "../Pages/Territorios/Territorios";
import Adaptacion from "../Pages/Adaptacion/adaptacion";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/proyecto" replace />} />
    <Route path="/proyecto" element={<Proyecto />} />
    <Route path="/biodiversidad" element={<Biodiversidad />} />
    <Route path="/Variabilidad" element={<Variabilidad />} />
    <Route path="/territorios" element={<Territorios />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<Register />} />
    <Route path="/adaptacion" element={<Adaptacion />} />
    {/* <Route path="/usuario" element={<UsuarioPage />} /> */}

    <Route
      path="/admin"
      element={
        <ProtectedRoute adminOnly={true}>
          <AdminPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admins_users"
      element={
        <ProtectedRoute adminOnly={true}>
          <UsuariosAdmin />
        </ProtectedRoute>
      }
    />
    {/* <Route path="/usuario" element={<UsuarioPage />} /> */}
  </Routes>
);

export default AppRoutes;
