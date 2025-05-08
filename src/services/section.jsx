const API_URL = import.meta.env.VITE_API_URL;

export async function getContenido(seccion) {
  const res = await fetch(`${API_URL}/contenido/${seccion}`);
  if (!res.ok) throw new Error("Error al obtener contenido");
  return res.json();
}
