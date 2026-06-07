export interface DashSatelite {
  id: number;
  nome: string;
  norad: string;
  orbita: string;
  altitude: number;
  combustivel: number;
  riscoColisao: number;
  status: "CRITICO" | "ATENCAO" | "NORMAL" | "OFFLINE";
}

// Tipo do alerta usado no Dashboard — versão resumida (sem distancia e probabilidade)
export interface DashAlerta {
  id: number;
  sateliteNome: string;
  nivel: "CRITICO" | "ATENCAO";
  descricao: string;
  tempo: string;
}
