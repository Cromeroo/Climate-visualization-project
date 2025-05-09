import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../../services/authService";
import "./login.css";
import { useAuth } from "./useAuth";
// Función simple para decodificar el payload del JWT
function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- dentro del componente

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await loginService(email, password);
      const { token } = res;
      login(token); // <-- solo esto, sin localStorage.setItem
      const payload = parseJwt(token);
      const role = payload?.role;

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/usuario");
      }
    } catch (err) {
      setError("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-bg">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Iniciar sesión</h2>
        <div className="login-field">
          <label htmlFor="email">Correo</label>
          <input
            id="email"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="login-field">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        {error && <div className="login-error">{error}</div>}
        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <div className="login-register-link">
          <span>¿No tienes cuenta?</span>
          <button
            type="button"
            className="login-register-btn"
            onClick={handleRegister}
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;