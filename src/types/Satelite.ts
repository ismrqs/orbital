// Tipo usado internamente pelo front — nomes em camelCase legíveis
export interface Satelite {
  id: number;
  nome: string;
  noradId: string;
  cosparId: string;
  orbita: string;
  altitude: number;
  combustivel: number;
  inclinacao: number;
  proximaJanela: string;
  probColisao: number;
  deltaV: number | null;
  statusRisco: "ok" | "warn" | "danger";
}

// Tipo que o Java devolve — nomeSatelite em vez de nome
export interface SateliteAPI {
  id: number;
  nomeSatelite: string;
  noradId: string;
  cosparId: string;
  orbita: string;
  altitude: number;
  combustivel: number;
  inclinacao: number;
  proximaJanela: string;
  probColisao: number;
  deltaV: number | null;
  statusRisco: "ok" | "warn" | "danger";
}

// Campos que o front manda no PUT (só os editáveis)
export interface EditForm {
  nome: string;
  cosparId: string;
  orbita: string;
  altitude: number;
}

// Resposta do POST /manobra
export interface Manobra {
  janelaExecucao: string;
  deltaV: number;
  objetoRisco: string;
  descricao: string;
}
