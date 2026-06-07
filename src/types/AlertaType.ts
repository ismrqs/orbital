export interface Alerta {
  id: number;
  sateliteNome: string;
  norad: string;
  nivel: "CRITICO" | "ATENCAO";
  descricao: string;
  probabilidade: number;
  distancia: string;
  tempo: string;
}
