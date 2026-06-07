import type { Alerta } from "../types/AlertaType";

const API_URL = import.meta.env.VITE_API_URL ?? "https://orbital-java.onrender.com";

// GET /alertas
// Busca os satélites com status_risco warn ou danger e retorna como lista de alertas
export async function getAlertas(): Promise<Alerta[]> {
  const res = await fetch(`${API_URL}/alertas`);
  if (!res.ok) throw new Error("Erro ao buscar alertas");
  return res.json();
}
