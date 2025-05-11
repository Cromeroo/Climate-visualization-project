import { useEffect, useState } from "react";
import { getContenido, updateContenido } from "../../services/AdminPage";
import "./Admin.css";

const SECCIONES = [
  { value: "proyecto", label: "Proyecto" },
  { value: "biodiversidad", label: "Biodiversidad" },
  { value: "variabilidad", label: "Variabilidad" },
  { value: "territorios", label: "Territorios" },
  { value: "adaptacion", label: "Adaptación" },

  // Agrega aquí más secciones si las tienes
];

const AdminPage = () => {
  const [seccion, setSeccion] = useState(SECCIONES[0].value);
  const [textos, setTextos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editTipo, setEditTipo] = useState("");
  const [nuevoTipo, setNuevoTipo] = useState("");
  const [nuevoContenido, setNuevoContenido] = useState("");
  const [nuevoSeccion, setNuevoSeccion] = useState(SECCIONES[0].value);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    cargarContenido();
    // eslint-disable-next-line
  }, [seccion]);

  const cargarContenido = async () => {
    setLoading(true);
    try {
      const data = await getContenido(seccion);
      setTextos(data);
    } catch {
      setMsg("Error al cargar contenido");
    }
    setLoading(false);
  };

  const handleEdit = (id, tipo, contenido) => {
    setEditId(id);
    setEditTipo(tipo);
    setEditValue(contenido);
    setMsg("");
  };

  const handleSave = async () => {
    try {
      await updateContenido(editId, editValue, token);
      setMsg("Contenido actualizado");
      setEditId(null);
      cargarContenido();
    } catch {
      setMsg("Error al actualizar");
    }
  };

  // Para agregar nuevo contenido
  const handleAdd = async () => {
    if (!nuevoTipo || !nuevoContenido || !nuevoSeccion) {
      setMsg("Completa todos los campos para agregar");
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contenido`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          seccion: nuevoSeccion,
          tipo: nuevoTipo,
          contenido: nuevoContenido,
        }),
      });
      if (!res.ok) throw new Error();
      setMsg("Contenido agregado");
      setNuevoTipo("");
      setNuevoContenido("");
      cargarContenido();
    } catch {
      setMsg("Error al agregar contenido");
    }
  };

  // Para eliminar contenido
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este contenido?")) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/contenido/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error();
      setMsg("Contenido eliminado");
      cargarContenido();
    } catch {
      setMsg("Error al eliminar");
    }
  };

  return (
    <div className="admin-container">
      <h2>Panel de Administración</h2>
      {msg && <div className="admin-msg">{msg}</div>}
      <div className="admin-add">
        <h4>Agregar nuevo contenido</h4>
        <select
          value={nuevoSeccion}
          onChange={(e) => setNuevoSeccion(e.target.value)}
        >
          {SECCIONES.map((sec) => (
            <option key={sec.value} value={sec.value}>
              {sec.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Tipo (ej: Título, Subtítulo)"
          value={nuevoTipo}
          onChange={(e) => setNuevoTipo(e.target.value)}
        />
        <textarea
          placeholder="Contenido"
          value={nuevoContenido}
          onChange={(e) => setNuevoContenido(e.target.value)}
          rows={3}
        />
        <button onClick={handleAdd}>Agregar</button>
      </div>
      <hr />
      <div style={{ marginBottom: 20 }}>
        <label>Filtrar por sección: </label>
        <select
          value={seccion}
          onChange={(e) => setSeccion(e.target.value)}
          style={{ marginLeft: 10 }}
        >
          {SECCIONES.map((sec) => (
            <option key={sec.value} value={sec.value}>
              {sec.label}
            </option>
          ))}
        </select>
      </div>
      <h4>Editar o eliminar contenido existente</h4>
      {loading ? (
        <div>Cargando...</div>
      ) : textos.length === 0 ? (
        <div>No hay contenido registrado.</div>
      ) : (
        textos.map((t) => (
          <div className="admin-item" key={t.id}>
            <span className="admin-tipo">{t.tipo}</span>
            {editId === t.id ? (
              <div className="admin-edit-form">
                <input
                  type="text"
                  value={editTipo}
                  onChange={(e) => setEditTipo(e.target.value)}
                  className="admin-edit-tipo"
                  placeholder="Tipo"
                  style={{
                    width: "100%",
                    marginBottom: "0.5rem",
                    borderRadius: "0.4rem",
                    border: "1px solid #d1d5db",
                    padding: "0.5rem",
                    fontSize: "1rem",
                  }}
                />
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  rows={4}
                  style={{
                    width: "100%",
                    borderRadius: "0.4rem",
                    border: "1px solid #d1d5db",
                    padding: "0.5rem",
                    fontSize: "1rem",
                    marginBottom: "0.7rem",
                  }}
                />
                <div className="admin-actions">
                  <button onClick={handleSave}>Guardar</button>
                  <button
                    onClick={() => setEditId(null)}
                    className="admin-cancel"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="admin-content">{t.contenido}</p>
                <div className="admin-actions">
                  <button onClick={() => handleEdit(t.id, t.tipo, t.contenido)}>
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="admin-delete"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;
