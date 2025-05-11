const API_URL = import.meta.env.VITE_API_URL;

export async function getUsuarios(token) {
  const res = await fetch(`${API_URL}/auth/usuarios`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return await res.json();
}

export async function cambiarRolUsuario(id, nuevoRol, token) {
  const res = await fetch(`${API_URL}/auth/usuarios/${id}/role`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role: nuevoRol }),
  });
  if (!res.ok) throw new Error("Error al cambiar rol");
  return await res.json();
}
