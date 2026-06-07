import type { Manobra } from "../types/Satelite";

const API_URL = import.meta.env.VITE_API_URL ?? "https://orbital-java.onrender.com";

// POST /manobra — calcula manobra de desvio para o satélite
export async function postManobra(noradId: string): Promise<Manobra> {
  const res = await fetch(`${API_URL}/manobra`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ noradId }),
  });
  if (!res.ok) throw new Error("Erro ao calcular manobra");
  return res.json();
}
