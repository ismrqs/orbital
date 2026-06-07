import type { DashSatelite, DashAlerta } from "../types/DashboardTypes";

const API_URL = import.meta.env.VITE_API_URL ?? "https://orbital-java.onrender.com";

// Converte o que o Java devolve para o formato do Dashboard
// Java: nomeSatelite, noradId, statusRisco, probColisao
// Dashboard: nome, norad, status, riscoColisao
function mapearSatelite(s: any): DashSatelite {
  const statusRisco = s.statusRisco ?? "ok";

  // converte status_risco do banco para o status visual do dashboard
  const status: DashSatelite["status"] =
    statusRisco === "danger" ? "CRITICO" :
    statusRisco === "warn"   ? "ATENCAO" :
    statusRisco === "ok"     ? "NORMAL"  : "OFFLINE";

  return {
    id:          s.id,
    nome:        s.nomeSatelite ?? s.nome ?? "",
    norad:       s.noradId,
    orbita:      s.orbita,
    altitude:    s.altitude,
    combustivel: s.combustivel,
    riscoColisao: s.probColisao ?? 0,
    status,
  };
}

// GET /satelites — lista todos para o carrossel do dashboard
export async function getDashSatelites(): Promise<DashSatelite[]> {
  const res = await fetch(`${API_URL}/satelites`);
  if (!res.ok) throw new Error("Erro ao buscar satélites");
  const data = await res.json();
  return data.map(mapearSatelite);
}

// GET /alertas — lista os alertas para o painel lateral do dashboard
export async function getDashAlertas(): Promise<DashAlerta[]> {
  const res = await fetch(`${API_URL}/alertas`);
  if (!res.ok) throw new Error("Erro ao buscar alertas");
  return res.json();
}
