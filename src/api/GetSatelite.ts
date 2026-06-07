import type { Satelite, SateliteAPI } from "../types/Satelite";

const API_URL = import.meta.env.VITE_API_URL ?? "https://orbital-java.onrender.com";

// Converte o que o Java devolve (nomeSatelite) para o que o front usa (nome)
function mapear(api: SateliteAPI): Satelite {
  return {
    id:            api.id,
    nome:          api.nomeSatelite,
    noradId:       api.noradId,
    cosparId:      api.cosparId,
    orbita:        api.orbita,
    altitude:      api.altitude,
    combustivel:   api.combustivel,
    inclinacao:    api.inclinacao,
    proximaJanela: api.proximaJanela ?? "—",
    probColisao:   api.probColisao  ?? 0,
    deltaV:        api.deltaV       ?? null,
    statusRisco:   api.statusRisco  ?? "ok",
  };
}

// GET /satelites/:noradId
export async function getSatelite(noradId: string): Promise<Satelite> {
  const res = await fetch(`${API_URL}/satelites/${noradId}`);
  if (!res.ok) throw new Error("not found");
  const data: SateliteAPI = await res.json();
  return mapear(data);
}
