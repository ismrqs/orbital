import { useState, useEffect } from "react";
import { AlertTriangle, AlertOctagon, RefreshCw } from "lucide-react";
import Header from "../components/HeaderPrivado";
import Footer from "../components/Footer";
import type { Alerta as AlertaItem } from "../../types/AlertaType";
import { getAlertas } from "../../api/GetAlertas";

// objeto de configuração visual por nível de alerta, centraliza cor, background, borda e ícone de cada tipo num lugar só
const nivelConfig = {
  CRITICO: { label: "Crítico", color: "#e84c1c", bg: "rgba(232,76,28,0.06)", border: "rgba(232,76,28,0.2)", icon: <AlertOctagon size={20} /> },
  ATENCAO: { label: "Atenção", color: "#f0a030", bg: "rgba(240,160,48,0.06)", border: "rgba(240,160,48,0.2)", icon: <AlertTriangle size={20} /> },
};

// componente principal da página de alertas
function Alerta() {
  const [alertas, setAlertas] = useState<AlertaItem[]>([]);
  const [loading, setLoading] = useState(true);

  // filtro ativo: começa mostrando todos, pode mudar pra CRITICO ou ATENCAO
  const [filtro, setFiltro] = useState<"TODOS" | "CRITICO" | "ATENCAO">("TODOS");

  // função separada pra buscar os dados
  // foi extraída do useEffect pra poder ser chamada também pelo botão "Atualizar"
  function carregar() {
    setLoading(true);
    getAlertas()
      .then(data => setAlertas(data))
      .catch(() => setAlertas([
        { id: 1, sateliteNome: "AMAZONIA-1",   norad: "47699", nivel: "CRITICO", descricao: "Objeto a 2.1 km em trajetória de colisão. Manobra de desvio recomendada imediatamente.", probabilidade: 78, distancia: "2.1 km",  tempo: "há 5 min" },
        { id: 2, sateliteNome: "BRASILSAT B4", norad: "28645", nivel: "ATENCAO", descricao: "Combustível abaixo de 40%. Planejar reabastecimento ou deorbitar.",                        probabilidade: 42, distancia: "18 km", tempo: "há 1h"   },
        { id: 3, sateliteNome: "SGDC-3",       norad: "42873", nivel: "ATENCAO", descricao: "Debris detectado em órbita próxima. Monitoramento intensificado.",                         probabilidade: 20, distancia: "31 km", tempo: "há 2h"   },
      ]))
      .finally(() => setLoading(false));
  }

  // chama a função de carregar uma vez quando a página abre
  useEffect(() => { carregar(); }, []);

  // filtra os alertas com base no filtro selecionado
  // se for TODOS retorna tudo, senão filtra pelo nível
  const filtrados = filtro === "TODOS" ? alertas : alertas.filter(a => a.nivel === filtro);

  // contadores usados nos botões de filtro e no badge do título
  const criticos = alertas.filter(a => a.nivel === "CRITICO").length;
  const atencao  = alertas.filter(a => a.nivel === "ATENCAO").length;

  return (
    <div className="font-['Roboto',sans-serif] text-white flex flex-col min-h-screen bg-[#06090f]">
      <Header />

      <main className="flex-1 pb-20 min-[992px]:pb-0">

        {/* seção do título */}
        <section className="px-24 py-14 max-[480px]:px-6 max-[480px]:py-10 min-[481px]:max-[991px]:px-8 min-[481px]:max-[991px]:py-10"
          style={{ borderBottom: "1px solid rgba(41,197,246,0.1)" }}>

          {/* linha do título + botão de atualizar - flex pra ficar um de cada lado */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="font-['Exo_2',sans-serif] font-bold text-[2.5rem] max-[480px]:text-[1.8rem] mb-2">
                Central de <span className="text-[#29c5f6]">Alertas</span>
              </h1>
              {/* se for 1 evento não coloca "s", se for mais coloca */}
              <p className="text-white/50 text-[0.95rem]">{alertas.length} evento{alertas.length !== 1 ? "s" : ""} registrado{alertas.length !== 1 ? "s" : ""}</p>
            </div>

            {/* botão atualizar: chama a função carregar() de novo */}
            {/* o ícone de refresh fica girando enquanto loading for true (ai fica usando o animate-spin) */}
            <button onClick={carregar}
              className="inline-flex items-center gap-2 font-['Exo_2',sans-serif] font-bold text-[0.85rem] py-2.5 px-5 rounded-full border-none cursor-pointer transition-colors duration-200 bg-transparent"
              style={{ color: "#29c5f6", border: "1px solid rgba(41,197,246,0.3)" }}>
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Atualizar
            </button>
          </div>

          {/* filtros de nível */}
          {/* botões estilizados como abas q o ativo fica colorido com borda embaixo */}
          {/* "as const" trava os tipos do array pra o ts aceitar as keys */}
          <div className="flex items-center gap-6 mt-6 flex-wrap">
            {([
              { key: "TODOS",   label: `Todos (${alertas.length})`, color: "#29c5f6" },
              { key: "CRITICO", label: `Críticos (${criticos})`,    color: "#e84c1c" },
              { key: "ATENCAO", label: `Atenção (${atencao})`,      color: "#f0a030" },
            ] as const).map(f => (
              <button key={f.key} onClick={() => setFiltro(f.key)}
                className="bg-transparent border-none cursor-pointer font-['Exo_2',sans-serif] font-semibold text-[0.8rem] uppercase tracking-wider transition-colors duration-200 pb-1"
                style={{
                  // cor e borda mudam dependendo se é o filtro ativo ou não
                  color: filtro === f.key ? f.color : "rgba(255,255,255,0.3)",
                  borderBottom: filtro === f.key ? `2px solid ${f.color}` : "2px solid transparent",
                }}>
                {f.label}
              </button>
            ))}
          </div>
        </section>

        {/* lista de alertas */}
        <section className="px-24 py-10 max-[480px]:px-6 max-[480px]:py-8 min-[481px]:max-[991px]:px-8">

          {/* estados possíveis: carregando / sem alertas / lista de alertas */}
          {loading ? (
            <p className="text-white/30 font-['Exo_2',sans-serif] text-[0.9rem]">Carregando alertas...</p>

          ) : filtrados.length === 0 ? (
            // estado vazio só aparece quando o filtro selecionado não tem nenhum resultado
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <AlertTriangle size={40} style={{ color: "rgba(255,255,255,0.1)" }} />
              <p className="text-white/30 font-['Exo_2',sans-serif]">Nenhum alerta para este filtro.</p>
            </div>

          ) : (
            // lista de cards de alerta
            <div className="flex flex-col gap-4">
              {filtrados.map(a => {
                // pega a configuração visual do nível desse alerta (cor, ícone, etc)
                const cfg = nivelConfig[a.nivel];
                return (
                  // card do alerta: fundo e borda mudam pela cor do nível
                  <div key={a.id} className="p-6 rounded-2xl flex gap-5 max-[480px]:flex-col"
                    style={{ backgroundColor: cfg.bg, border: `1px solid ${cfg.border}` }}>

                    {/* ícone no canto esquerdo: octógono pra crítico, triângulo pra atenção */}
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: cfg.color + "18", color: cfg.color }}>
                      {cfg.icon}
                    </div>

                    {/* conteúdo do card */}
                    <div className="flex flex-col gap-2 flex-1">

                      {/* linha de cima: nome do satélite + badge de nível + tempo */}
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-3">
                          <span className="font-['Exo_2',sans-serif] font-bold text-white text-[1rem]">{a.sateliteNome}</span>
                          {/* badge colorido com o nível */}
                          <span className="font-['Exo_2',sans-serif] text-[0.68rem] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                            style={{ color: cfg.color, backgroundColor: cfg.color + "18", border: `1px solid ${cfg.color}33` }}>
                            {cfg.label}
                          </span>
                        </div>
                        {/* tempo no canto direito */}
                        <span className="text-white/30 text-[0.78rem] font-['Roboto',sans-serif]">{a.tempo}</span>
                      </div>

                      {/* código NORAD logo abaixo do nome */}
                      <p className="text-white/30 text-[0.78rem] font-['Roboto',sans-serif]">NORAD #{a.norad}</p>

                      {/* descrição do alerta — o texto explicando o que tá acontecendo */}
                      <p className="text-white/65 text-[0.9rem] leading-[1.7]">{a.descricao}</p>

                      {/* métricas de probabilidade e distância na parte de baixo */}
                      <div className="flex items-center gap-6 mt-1 flex-wrap">
                        <div>
                          <span className="text-white/35 text-[0.72rem] uppercase tracking-wider font-['Exo_2',sans-serif]">Probabilidade · </span>
                          {/* probabilidade na cor do nível do alerta */}
                          <span className="font-['Exo_2',sans-serif] font-bold text-[0.9rem]" style={{ color: cfg.color }}>{a.probabilidade}%</span>
                        </div>
                        <div>
                          <span className="text-white/35 text-[0.72rem] uppercase tracking-wider font-['Exo_2',sans-serif]">Distância · </span>
                          <span className="font-['Exo_2',sans-serif] font-bold text-[0.9rem] text-white">{a.distancia}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* footer só aparece no desktop, no mobile fica escondido */}
      <div className="hidden min-[992px]:block"><Footer /></div>
    </div>
  );
}

export default Alerta;