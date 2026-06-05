import { useState, useEffect } from "react";
import { ArrowRight, Satellite, AlertTriangle, Activity, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import Header from "../components/HeaderPrivado";
import Footer from "../components/Footer";

// define como um satélite tem que ser, quais campos ele tem e o tipo de cada um
// se vier dado errado da API o typescript já briga
interface Satelite {
  id: number;
  nome: string;
  norad: string; // código internacional de rastreio do satélite
  orbita: string; // LEO (baixa) ou GEO (geoestacionária)
  altitude: number; // altura em km
  combustivel: number; // porcentagem de combustível restante
  riscoColisao: number; // porcentagem 
  status: "CRITICO" | "ATENCAO" | "NORMAL" | "OFFLINE";
}

// tipagem do alerta
interface Alerta {
  id: number;
  sateliteNome: string; // qual satélite gerou o alerta
  nivel: "CRITICO" | "ATENCAO";
  descricao: string; // o que tá acontecendo
  tempo: string;
}

// se não tiver a api configurada, cai pro localhost na porta 8080 (ambiente local de dev)
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

// mapa de cores por status, cada status tem uma cor fixa
const statusColor: Record<Satelite["status"], string> = {
  CRITICO: "#e84c1c", 
  ATENCAO: "#f0a030", 
  NORMAL: "#22c55e", 
  OFFLINE: "#4a5565",
};

// mesmo esquema mas pra label que aparece na tela
const statusLabel: Record<Satelite["status"], string> = {
  CRITICO: "Crítico", 
  ATENCAO: "Atenção", 
  NORMAL: "Normal", 
  OFFLINE: "Offline",
};

// componente principal do dashboard
function Dashboard() {
  const [satelites, setSatelites] = useState<Satelite[]>([]);
  const [alertas, setAlertas] = useState<Alerta[]>([]);

  // índice do carrossel: qual satélite tá sendo mostrado agora (começa no 0 = primeiro)
  const [idx, setIdx] = useState(0);

  // true mostra "carregando...", false mostra os dados
  const [loading, setLoading] = useState(true);

  // esse useEffect roda uma vez quando a página carrega
  // busca os dados de satélites e alertas ao mesmo tempo (promise.all)
  useEffect(() => {
    Promise.all([
      // busca os satélites na API
      // .catch() = se a API falhar, usa esses dados como fallback (pra não quebrar a tela)
      fetch(`${API_URL}/satelites`).then(r => r.json()).catch(() => [
        { id: 1, nome: "AMAZONIA-1",   norad: "47699", orbita: "LEO", altitude: 752,   combustivel: 34, riscoColisao: 78, status: "CRITICO" },
        { id: 2, nome: "BRASILSAT B4", norad: "28645", orbita: "GEO", altitude: 35786, combustivel: 61, riscoColisao: 12, status: "ATENCAO" },
        { id: 3, nome: "SGDC-1",       norad: "42833", orbita: "GEO", altitude: 35786, combustivel: 88, riscoColisao: 4,  status: "NORMAL"  },
      ]),

      // mesma coisa pros alertas
      fetch(`${API_URL}/alertas`).then(r => r.json()).catch(() => [
        { id: 1, sateliteNome: "AMAZONIA-1",   nivel: "CRITICO", descricao: "Risco de colisão 78% — objeto a 2.1 km", tempo: "há 5 min" },
        { id: 2, sateliteNome: "BRASILSAT B4", nivel: "ATENCAO", descricao: "Combustível abaixo de 40%",               tempo: "há 1h" },
      ]),
    ]).then(([sats, alts]) => {
      // quando as duas requisições terminarem, salva os dados nos states
      setSatelites(sats);
      setAlertas(alts);
    }).finally(() => setLoading(false)); // seja lá o que aconteceu, para o loading
  }, []); // array vazio = só roda uma vez

  // satélite atual do carrossel (pelo índice)
  const sat = satelites[idx];

  // cor do card muda com o status do satélite selecionado, se não tiver satélite ainda, usa o azul padrão
  const cor = sat ? statusColor[sat.status] : "#29c5f6";

  return (
    // container principal: fundo escuro, layout em coluna pra ocupar a tela toda
    <div className="font-['Roboto',sans-serif] text-white flex flex-col min-h-screen bg-[#06090f]">
      <Header />

      {/* área principal, padding no fundo pra não sobrepor nav mobile */}
      <main className="flex-1 pb-20 min-[992px]:pb-0">

        {/* seção do título do dashboard */}
        <section className="px-24 py-14 max-[480px]:px-6 max-[480px]:py-10 min-[481px]:max-[991px]:px-8 min-[481px]:max-[991px]:py-10"
          style={{ borderBottom: "1px solid rgba(41,197,246,0.1)" }}>

          {/* título grande com a parte "board" em azul */}
          <h1 className="font-['Exo_2',sans-serif] font-bold text-[2.5rem] max-[480px]:text-[1.8rem] mb-2">
            Dash<span className="text-[#29c5f6]">board</span>
          </h1>
          <p className="text-white/50 text-[0.95rem]">Visão geral da sua frota em tempo real.</p>
        </section>

        {/* se ainda tá carregando mostra mensagem, senão mostra o conteúdo */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <p className="font-['Exo_2',sans-serif] text-white/30">Carregando dados orbitais...</p>
          </div>
        ) : (
          // grid de 2 colunas no desktop, 1 coluna no mobile
          // coluna da esquerda = carrossel de satélites / coluna da direita = alertas
          <div className="px-24 py-10 max-[480px]:px-6 max-[480px]:py-8 min-[481px]:max-[991px]:px-8 grid gap-8 grid-cols-[1fr_22rem] max-[991px]:grid-cols-1">

            {/* ── COLUNA DA ESQUERDA ── */}
            <div className="flex flex-col gap-6">

              {/* cards de resumo rápido: total, críticos, atenção, normais */}
              {/* .filter() conta quantos satélites têm cada status */}
              <div className="grid grid-cols-4 gap-4 max-[480px]:grid-cols-2">
                {[
                  { label: "Total",    value: satelites.length,                                   color: "#29c5f6" },
                  { label: "Críticos", value: satelites.filter(s=>s.status==="CRITICO").length,   color: "#e84c1c" },
                  { label: "Atenção",  value: satelites.filter(s=>s.status==="ATENCAO").length,   color: "#f0a030" },
                  { label: "Normais",  value: satelites.filter(s=>s.status==="NORMAL").length,    color: "#22c55e" },
                ].map(s => (
                  // cada card tem borda colorida de acordo com a categoria
                  <div key={s.label} className="flex flex-col gap-1 p-4 rounded-2xl bg-white/[0.03]" style={{ border: `1px solid ${s.color}22` }}>
                    <span className="font-['Exo_2',sans-serif] font-bold text-[1.8rem]" style={{ color: s.color }}>{s.value}</span>
                    <span className="text-white/40 text-[0.75rem] uppercase tracking-wider font-['Exo_2',sans-serif]">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* card do carrossel de satélites */}
              {/* só renderiza se tiver um satélite selecionado (sat não é undefined) */}
              {sat && (
                <div className="rounded-2xl p-7 flex flex-col gap-6 transition-all duration-300"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${cor}33` }}>

                  {/* cabeçalho do card: bolinha colorida + nome + badge de status */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* bolinha com glow na cor do status */}
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cor, boxShadow: `0 0 8px ${cor}88` }} />
                      <div>
                        <h2 className="font-['Exo_2',sans-serif] font-bold text-white text-[1.2rem]">{sat.nome}</h2>
                        {/* infos técnicas: código NORAD, tipo de órbita, altitude */}
                        <p className="text-white/40 text-[0.8rem]">NORAD #{sat.norad} · {sat.orbita} · {sat.altitude.toLocaleString()} km</p>
                      </div>
                    </div>
                    {/* badge de status no canto direito */}
                    <span className="font-['Exo_2',sans-serif] text-[0.72rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{ color: cor, backgroundColor: cor + "18", border: `1px solid ${cor}33` }}>
                      {statusLabel[sat.status]}
                    </span>
                  </div>

                  {/* 3 métricas do satélite: combustível, risco de colisão e altitude */}
                  {/* combustível fica vermelho se for menor que 40% (alerta de pouco combustível) */}
                  <div className="grid grid-cols-3 gap-4 max-[480px]:grid-cols-1">
                    {[
                      { label: "Combustível",      value: `${sat.combustivel}%`,              color: sat.combustivel < 40 ? "#e84c1c" : "#22c55e" },
                      { label: "Risco de colisão", value: `${sat.riscoColisao}%`,             color: cor },
                      { label: "Altitude",         value: `${sat.altitude.toLocaleString()} km`, color: "#29c5f6" },
                    ].map(m => (
                      <div key={m.label} className="flex flex-col gap-1 p-4 rounded-xl bg-white/[0.03]"
                        style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                        <span className="text-white/40 text-[0.72rem] uppercase tracking-wider font-['Exo_2',sans-serif]">{m.label}</span>
                        <span className="font-['Exo_2',sans-serif] font-bold text-[1.3rem]" style={{ color: m.color }}>{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* navegação do carrossel */}
                  <div className="flex items-center justify-between">

                    {/* bolinhas indicadoras (uma por satélite), a atual fica maior e azul */}
                    <div className="flex items-center gap-2">
                      {satelites.map((_, i) => (
                        <div key={i} onClick={() => setIdx(i)} className="cursor-pointer rounded-full transition-all duration-200"
                          style={{
                            width: i === idx ? "20px" : "6px",  // a ativa é maior
                            height: "6px",
                            backgroundColor: i === idx ? "#29c5f6" : "rgba(255,255,255,0.2)"
                          }} />
                      ))}
                    </div>

                    {/* botões de prev/next com o contador "1 / 3" */}
                    <div className="flex items-center gap-2">
                      {/* volta pro anterior, o % garante que volta pro último se tiver no primeiro (loop) */}
                      <button onClick={() => setIdx(i => (i - 1 + satelites.length) % satelites.length)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.05] border-none cursor-pointer hover:bg-white/10 transition-colors"
                        style={{ color: "rgba(255,255,255,0.5)" }}>
                        <ChevronLeft size={16} />
                      </button>

                      <span className="font-['Exo_2',sans-serif] text-white/30 text-[0.8rem]">{idx + 1} / {satelites.length}</span>

                      {/* avança pro próximo, % faz loop também */}
                      <button onClick={() => setIdx(i => (i + 1) % satelites.length)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.05] border-none cursor-pointer hover:bg-white/10 transition-colors"
                        style={{ color: "rgba(255,255,255,0.5)" }}>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  {/* botão que leva pra página de frota completa */}
                  <Link to="/frota" className="inline-flex items-center gap-2 justify-center font-['Exo_2',sans-serif] font-bold text-[0.85rem] no-underline py-2.5 rounded-xl transition-colors duration-200"
                    style={{ backgroundColor: "rgba(41,197,246,0.1)", color: "#29c5f6", border: "1px solid rgba(41,197,246,0.2)" }}>
                    Ver frota completa <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </div>

            {/* COLUNA DA DIREITA: ALERTAS */}
            <div className="flex flex-col gap-4">

              {/* título + link pra ver todos os alertas */}
              <div className="flex items-center justify-between">
                <h2 className="font-['Exo_2',sans-serif] font-bold text-white text-[1rem]">Alertas recentes</h2>
                <Link to="/alertas" className="font-['Exo_2',sans-serif] text-[0.78rem] font-semibold no-underline" style={{ color: "#29c5f6" }}>Ver todos →</Link>
              </div>

              {/* se não tiver alertas mostra estado vazio, senão lista os alertas */}
              {alertas.length === 0 ? (
                // estado vazio:  tela quando tá tudo bem, sem alertas
                <div className="flex flex-col items-center justify-center gap-3 p-10 rounded-2xl"
                  style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Activity size={28} style={{ color: "rgba(255,255,255,0.15)" }} />
                  <p className="text-white/30 text-[0.85rem] font-['Exo_2',sans-serif]">Nenhum alerta ativo</p>
                </div>
              ) : (
                // lista de alertas: cor do card muda entre vermelho (crítico) e laranja (atenção)
                <div className="flex flex-col gap-3">
                  {alertas.map(a => (
                    <div key={a.id} className="flex gap-4 p-4 rounded-xl"
                      style={{
                        backgroundColor: a.nivel === "CRITICO" ? "rgba(232,76,28,0.06)" : "rgba(240,160,48,0.06)",
                        border: `1px solid ${a.nivel === "CRITICO" ? "rgba(232,76,28,0.2)" : "rgba(240,160,48,0.2)"}`
                      }}>
                      {/* ícone de alerta */}
                      <AlertTriangle size={18} className="flex-shrink-0 mt-0.5"
                        style={{ color: a.nivel === "CRITICO" ? "#e84c1c" : "#f0a030" }} />
                      <div className="flex flex-col gap-1 min-w-0">
                        <p className="font-['Exo_2',sans-serif] font-bold text-[0.85rem] text-white">{a.sateliteNome}</p>
                        <p className="text-white/55 text-[0.8rem] leading-[1.5]">{a.descricao}</p>
                        <p className="text-white/30 text-[0.72rem]">{a.tempo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* atalhos rápidos pro fundo da coluna: leva pra frota e pra alertas */}
              <div className="flex flex-col gap-3 mt-2">
                {[
                  { to: "/frota",   icon: <Satellite size={18} />,     label: "Gerenciar Frota", color: "#29c5f6" },
                  { to: "/alertas", icon: <AlertTriangle size={18} />, label: "Ver Alertas",     color: "#e84c1c" },
                ].map(item => (
                  <Link key={item.to} to={item.to}
                    className="flex items-center gap-3 p-4 rounded-xl no-underline transition-colors duration-200 hover:bg-white/[0.06]"
                    style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    {/* ícone com fundo colorido */}
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: item.color + "18", color: item.color }}>
                      {item.icon}
                    </div>
                    <span className="font-['Exo_2',sans-serif] font-semibold text-[0.9rem] text-white">{item.label}</span>
                    {/* setinha no final, empurrada pro lado direito com ml-auto */}
                    <ArrowRight size={16} className="ml-auto" style={{ color: "rgba(255,255,255,0.25)" }} />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        )}
      </main>

      {/* footer só aparece no desktop, no mobile fica escondido */}
      <div className="hidden min-[992px]:block"><Footer /></div>
    </div>
  );
}

export default Dashboard;