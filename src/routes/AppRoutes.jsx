import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import Proyecto from "../Pages/proyecto";
import Biodiversidad from "../Pages/Biodiversidad/Biodiversidad";
import Variabilidad from "../Pages/Variabilidad-C/Variabilidad";
import LoginPage from "../Pages/login";
import AdminPage from "../Pages/Admin/Admin";
//import UsuarioPage from "../Pages/UsuarioPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/proyecto" element={<Proyecto />} />
    <Route path="/biodiversidad" element={<Biodiversidad />} />
    <Route path="/Variabilidad" element={<Variabilidad />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/admin" element={<AdminPage />} />
    {/* <Route path="/usuario" element={<UsuarioPage />} /> */}
  </Routes>
);

export default AppRoutes;
