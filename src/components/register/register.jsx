import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/register";
import "./register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      await register({ email, username, password });
      setMsg("Registro exitoso. Redirigiendo al login...");
      setTimeout(() => navigate("/login"), 1500); // Redirige tras 1.5 segundos
    } catch (err) {
      setMsg(err.message || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  const handleGoLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register-bg">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Registro</h2>
        <div className="register-field">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            id="username"
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="register-field">
          <label htmlFor="email">Correo</label>
          <input
            id="email"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="register-field">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        {msg && <div className="register-msg">{msg}</div>}
        <button className="register-btn" type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
        <div className="register-login-link">
          <span>¿Ya tienes cuenta?</span>
          <button
            type="button"
            className="register-login-btn"
            onClick={handleGoLogin}
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
