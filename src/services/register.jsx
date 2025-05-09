const API_URL = import.meta.env.VITE_API_URL;

export async function register({ email, username, password }) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al registrar");
  return data;
}
