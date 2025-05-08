const API_URL = import.meta.env.VITE_API_URL;

export async function getContenido(seccion) {
  const res = await fetch(`${API_URL}/contenido/${seccion}`);
  if (!res.ok) throw new Error("Error al obtener contenido");
  return res.json();
}

export async function updateContenido(id, contenido, token) {
  const res = await fetch(`${API_URL}/contenido/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ contenido }),
  });
  if (!res.ok) throw new Error("Error al actualizar contenido");
  return res.json();
}
