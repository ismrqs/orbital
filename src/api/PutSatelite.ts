import type { EditForm } from "../types/Satelite";

const API_URL = import.meta.env.VITE_API_URL ?? "https://orbital-java.onrender.com";

// PUT /satelites/:noradId — atualiza nome, cosparId, orbita, altitude
export async function putSatelite(noradId: string, form: EditForm): Promise<void> {
  const res = await fetch(`${API_URL}/satelites/${noradId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  if (!res.ok) throw new Error("Erro ao atualizar satélite");
}
