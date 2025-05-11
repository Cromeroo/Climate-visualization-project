import { useEffect, useState } from "react";
import { getUsuarios, cambiarRolUsuario } from "../../services/userService";

const ROLES = ["admin", "usuario"];

const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const cargarUsuarios = async () => {
    setLoading(true);
    setMsg("");
    try {
      const data = await getUsuarios(token);
      setUsuarios(data);
    } catch {
      setMsg("Error al cargar usuarios");
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarUsuarios();
    // eslint-disable-next-line
  }, []);

  const handleRolChange = async (id, nuevoRol) => {
    setMsg("");
    try {
      await cambiarRolUsuario(id, nuevoRol, token);
      setMsg("Rol actualizado correctamente");
      cargarUsuarios();
    } catch {
      setMsg("Error al actualizar rol");
    }
  };

  return (
    <div className="usuarios-admin-container">
      <h2 className="mt-5 mb-4">Gestión de Usuarios</h2>{" "}
      {msg && <div className="alert alert-info text-center">{msg}</div>}
      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle shadow-sm rounded">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Cambiar rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        u.role === "admin" ? "bg-danger" : "bg-secondary"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={u.role}
                      onChange={(e) => handleRolChange(u.id, e.target.value)}
                      style={{ minWidth: 100 }}
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsuariosAdmin;
