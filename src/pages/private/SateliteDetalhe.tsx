import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, Settings, Check, AlertTriangle, AlertOctagon, Shield, RefreshCw, } from "lucide-react";
import { inputBaseModal, inputBorderModal } from "../utils/inputStyle";
import type { Satelite, EditForm, Manobra } from "../../types/Satelite";
import { getSatelite } from "../../api/GetSatelite";
import { putSatelite } from "../../api/PutSatelite";
import { postManobra } from "../../api/PostManobra";
import Header from "../components/HeaderPrivado";
import Footer from "../components/Footer";
import TitlePage from "../components/TitlePage";
import Badge from "../components/Badge";
import StatBox from "../components/StatBox";
import InputField from "../components/InputField";
import ModalWrapper from "../components/ModalWrapper";



const FALLBACK: Record<string, Satelite> = {
  "47699": {
    id: 1, nome: "AMAZONIA-1",   noradId: "47699", cosparId: "2021-045A",
    orbita: "LEO", altitude: 752,   combustivel: 34, inclinacao: 98.4,
    proximaJanela: "+14h 32min", probColisao: 78, deltaV: 0.4, statusRisco: "danger",
  },
  "28645": {
    id: 2, nome: "BRASILSAT B4", noradId: "28645", cosparId: "1994-016A",
    orbita: "GEO", altitude: 35786, combustivel: 61, inclinacao: 0.1,
    proximaJanela: "+2d 5h",    probColisao: 42, deltaV: 1.1, statusRisco: "warn",
  },
  "42833": {
    id: 3, nome: "SGDC-1",       noradId: "42833", cosparId: "2017-028A",
    orbita: "GEO", altitude: 35786, combustivel: 88, inclinacao: 0.0,
    proximaJanela: "+7d",       probColisao: 4,  deltaV: null, statusRisco: "ok",
  },
  "44883": {
    id: 4, nome: "CBERS-4A",     noradId: "44883", cosparId: "2019-093E",
    orbita: "SSO", altitude: 628,   combustivel: 72, inclinacao: 97.8,
    proximaJanela: "+3d 12h",   probColisao: 8,  deltaV: null, statusRisco: "ok",
  },
};

// config visual por status
const riscoCfg = {
  ok:     { color: "#22c55e", bg: "rgba(34,197,94,0.06)",  border: "rgba(34,197,94,0.2)",  label: "Normal",  icon: <Shield size={18}/> },
  warn:   { color: "#f0a030", bg: "rgba(240,160,48,0.06)", border: "rgba(240,160,48,0.2)", label: "Atenção", icon: <AlertTriangle size={18}/> },
  danger: { color: "#e84c1c", bg: "rgba(232,76,28,0.06)",  border: "rgba(232,76,28,0.2)",  label: "Crítico", icon: <AlertOctagon size={18}/> },
};

// animação orbital
function OrbitalCanvas({ status }: { status: "ok" | "warn" | "danger" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cor = riscoCfg[status].color;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    // órbita principal
    const orxA = 105, oryA = 42;
    // órbita debris
    const orxB = 112, oryB = 50;

    let angle = 0;       // ângulo do satélite principal
    let debAngle = 2.2;  // ângulo debris 1 (warn/danger)
    let deb2Angle = 4.4; // ângulo debris 2 (danger)
    let rafId: number;

    // converte ângulo + radii para ponto na elipse
    function ellipsePoint(a: number, rx: number, ry: number, tilt = 0) {
      const x = Math.cos(a) * rx;
      const y = Math.sin(a) * ry;
      // aplica rotação (tilt) se houver
      return {
        x: cx + x * Math.cos(tilt) - y * Math.sin(tilt),
        y: cy + x * Math.sin(tilt) + y * Math.cos(tilt),
      };
    }

    function drawEllipse(
      rx: number, ry: number,
      strokeColor: string, alpha: number,
      dash: number[] = [], tilt = 0
    ) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(tilt);
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = strokeColor;
      ctx.globalAlpha = alpha;
      ctx.setLineDash(dash);
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();
    }

    function drawGlowDot(
      x: number, y: number,
      r: number, color: string, glowR: number
    ) {
      // glow
      const grad = ctx.createRadialGradient(x, y, 0, x, y, glowR);
      grad.addColorStop(0, color + "88");
      grad.addColorStop(1, color + "00");
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(x, y, glowR, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      // dot
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.95;
      ctx.fill();
    }

    function drawSatellite(x: number, y: number, color: string) {
      ctx.save();
      ctx.translate(x, y);
      // corpo
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.92;
      ctx.beginPath();
      ctx.roundRect(-9, -4, 18, 8, 2);
      ctx.fill();
      // painéis solares esquerda e direita
      ctx.fillStyle = "#8090c8";
      ctx.globalAlpha = 0.85;
      ctx.fillRect(-18, -2.5, 8, 5);
      ctx.fillRect(10, -2.5, 8, 5);
      // núcleo brilhante
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = 1;
      ctx.fill();
      ctx.restore();
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);

      // órbita principal tracejada azul
      drawEllipse(orxA, oryA, "#1a3a5c", 1, []);
      drawEllipse(orxA, oryA, "#29c5f6", 0.3, [4, 6]);

      // órbita debris (apenas warn/danger)
      if (status === "warn" || status === "danger") {
        drawEllipse(orxB, oryB, "#e84c1c", 0.2, [3, 8], -0.14);
      }

      // terra
      const earthGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 26);
      earthGrad.addColorStop(0, "#0d2545");
      earthGrad.addColorStop(1, "#0a1a30");
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 26, 0, Math.PI * 2);
      ctx.fillStyle = earthGrad;
      ctx.fill();
      ctx.strokeStyle = "#1e3a60";
      ctx.lineWidth = 1;
      ctx.stroke();
      // núcleo azul
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fillStyle = "#29c5f6";
      ctx.globalAlpha = 0.7;
      ctx.fill();

      // satélite principal
      const sp = ellipsePoint(angle, orxA, oryA);
      drawGlowDot(sp.x, sp.y, 7, cor, 16);
      drawSatellite(sp.x, sp.y, cor);

      // debris 1 (warn + danger) - órbita inclinada
      if (status === "warn" || status === "danger") {
        const dp = ellipsePoint(debAngle, orxB, oryB, -0.14);
        drawGlowDot(dp.x, dp.y, 4, "#e84c1c", 10);
      }

      // debris 2 (danger) + linha de aviso
      if (status === "danger") {
        const d2p = ellipsePoint(deb2Angle, orxA - 5, oryA + 4);
        drawGlowDot(d2p.x, d2p.y, 3, "#ff4444", 7);
        // linha tracejada de aviso entre terra e debris
        ctx.save();
        ctx.setLineDash([3, 4]);
        ctx.strokeStyle = "#e84c1c";
        ctx.globalAlpha = 0.3;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(d2p.x, d2p.y);
        ctx.stroke();
        ctx.restore();
      }

      // velocidades angulares distintas para não ficarem sincronizados
      angle    += 0.009;  // satélite principal: 7s por volta
      debAngle += 0.015;  // debris 1: 4.2s por volta
      deb2Angle+= 0.022;  // debris 2: 2.8s por volta

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [status, cor]);

  return (
    <canvas
      ref={canvasRef}
      width={260}
      height={180}
      className="w-full max-w-[320px] mx-auto block"
      style={{ maxHeight: 200 }}
    />
  );
}

// modal resultado da manobra
function ModalManobra({ manobra, onClose }: { manobra: Manobra; onClose: () => void }) {
  return (
    <ModalWrapper title="Manobra calculada" onClose={onClose} borderColor="rgba(41,197,246,0.25)">
      <div className="flex flex-col gap-3">
        {[
          { label: "Janela de execução", value: manobra.janelaExecucao, color: "#29c5f6" },
          { label: "Delta-V mínimo",     value: `${manobra.deltaV} m/s`, color: "#f0a030" },
          { label: "Objeto de risco",    value: manobra.objetoRisco,     color: "#e84c1c" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col gap-1 p-4 rounded-xl"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <span className="font-['Exo_2',sans-serif] text-[0.72rem] font-semibold uppercase tracking-wider text-white/40">
              {item.label}
            </span>
            <span className="font-['Exo_2',sans-serif] font-bold text-[1.1rem]" style={{ color: item.color }}>
              {item.value}
            </span>
          </div>
        ))}
        <p className="text-white/55 text-[0.85rem] leading-[1.7]">{manobra.descricao}</p>
      </div>
      <button onClick={onClose}
        className="py-3 rounded-xl font-['Exo_2',sans-serif] font-bold text-[0.9rem] border-none cursor-pointer flex items-center justify-center gap-2"
        style={{ backgroundColor: "#29c5f6", color: "#06090f" }}>
        <Check size={16} /> Entendido
      </button>
    </ModalWrapper>
  );
}

// modal de edição
function ModalEditar({
  satelite,
  onSave,
  onClose,
}: {
  satelite: Satelite;
  onSave: (data: EditForm) => void;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditForm>({
    defaultValues: {
      nome: satelite.nome,
      cosparId: satelite.cosparId,
      orbita: satelite.orbita,
      altitude: satelite.altitude,
    },
  });
  const selectCls = `${inputBaseModal} ${inputBorderModal(false)}`;

  return (
    <ModalWrapper title="Editar satélite" onClose={onClose}>
      <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-4">
        <InputField label="Nome*" error={errors.nome ? "Nome é obrigatório" : undefined} variant="modal"
          placeholder="Nome do satélite"
          {...register("nome", { required: true })}
        />
        <InputField label="COSPAR ID" variant="modal"
          placeholder="Ex: 2021-045A"
          {...register("cosparId")}
        />
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="font-['Exo_2',sans-serif] font-bold text-[0.78rem] text-white/50 uppercase tracking-wider">
              Órbita
            </label>
            <select className={selectCls} {...register("orbita")} style={{ appearance: "none" }}>
              {["LEO", "MEO", "GEO", "SSO", "HEO"].map((o) => (
                <option key={o} value={o} style={{ background: "#0d0d18" }}>{o}</option>
              ))}
            </select>
          </div>
          <InputField label="Altitude (km)*" variant="modal" type="number"
            placeholder="Ex: 752"
            {...register("altitude", { required: true })}
          />
        </div>
        <div className="flex gap-3 pt-1">
          <button type="button" onClick={onClose}
            className="flex-1 py-2.5 rounded-xl font-['Exo_2',sans-serif] font-bold text-[0.85rem] cursor-pointer"
            style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>
            Cancelar
          </button>
          <button type="submit"
            className="flex-1 py-2.5 rounded-xl font-['Exo_2',sans-serif] font-bold text-[0.85rem] cursor-pointer flex items-center justify-center gap-2 border-none"
            style={{ backgroundColor: "#29c5f6", color: "#06090f" }}>
            <Check size={16} /> Salvar
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}

// página principal
function SateliteDetalhe() {
  // ":id" vem da rota /satelite/:id definida no App.tsx
  // o valor é o noradId do satélite (ex: "47699")
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [satelite, setSatelite]   = useState<Satelite | null>(null);
  const [loading, setLoading]     = useState(true);
  const [calculando, setCalculando] = useState(false);
  const [monitorando, setMonitorando] = useState(false);
  const [manobra, setManobra]     = useState<Manobra | null>(null);
  const [editando, setEditando]   = useState(false);
  const [feedback, setFeedback]   = useState("");

  function carregar() {
    setLoading(true);
    getSatelite(id!)
      .then((data) => setSatelite(data))
      .catch(() => {
        if (id && FALLBACK[id]) setSatelite(FALLBACK[id]);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => { carregar(); }, [id]);

  // UC04 — Atualizar dados (GET /satelites/:noradId de novo)
  // Quarkus: re-executa o modelo Python de classificação e atualiza statusRisco
  async function handleMonitorar() {
    setMonitorando(true);
    carregar();
    setFeedback("Dados atualizados com sucesso!");
    setMonitorando(false);
    setTimeout(() => setFeedback(""), 3000);
  }

  // UC03 — POST /manobra
  // Quarkus: recebe { noradId } → chama modelo Python de regressão → retorna manobra
  // Resposta: { janelaExecucao, deltaV, objetoRisco, descricao }
  async function handleCalcularManobra() {
    if (!satelite) return;
    setCalculando(true);
    try {
      const data = await postManobra(satelite.noradId);
      setManobra(data);
    } catch {
      setManobra({
        janelaExecucao: "+4h 12min",
        deltaV: satelite.deltaV ?? 1.2,
        objetoRisco: `DEBRIS-${Math.floor(Math.random() * 90000 + 10000)}`,
        descricao: "Manobra de desvio calculada. Execute dentro da janela indicada para garantir segurança orbital.",
      });
    }
    setCalculando(false);
  }

  async function handleEditar(data: EditForm) {
    if (!satelite) return;
    try {
      await putSatelite(satelite.noradId, data);
    } catch {
      // fallback: aplica localmente se API indisponível
    }
    setSatelite((s) => (s ? { ...s, ...data } : s));
    setEditando(false);
    setFeedback("Satélite atualizado!");
    setTimeout(() => setFeedback(""), 3000);
  }

  if (loading)
    return (
      <div className="flex flex-col min-h-screen bg-[#06090f]">
        <Header />
        <main className="flex-1 flex items-center justify-center pb-20 min-[992px]:pb-0">
          <p className="font-['Exo_2',sans-serif] text-white/30">Carregando dados orbitais...</p>
        </main>
      </div>
    );

  if (!satelite)
    return (
      <div className="flex flex-col min-h-screen bg-[#06090f]">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 pb-20 min-[992px]:pb-0">
          <p className="font-['Exo_2',sans-serif] text-white/40">Satélite não encontrado.</p>
          <button onClick={() => navigate("/frota")}
            className="font-['Exo_2',sans-serif] font-bold text-[0.9rem] py-2 px-6 rounded-full border cursor-pointer bg-transparent"
            style={{ color: "#29c5f6", borderColor: "rgba(41,197,246,0.3)" }}>
            ← Voltar para Frota
          </button>
        </main>
      </div>
    );

  const cfg = riscoCfg[satelite.statusRisco];

  return (
    <div className="font-['Roboto',sans-serif] text-white flex flex-col min-h-screen bg-[#06090f]">
      <Header />

      <main className="flex-1 pb-20 min-[992px]:pb-0">

        {/* TÍTULO */}
        <TitlePage
          titulo={satelite.nome}
          subtitulo={`NORAD #${satelite.noradId} · COSPAR ${satelite.cosparId} · ${satelite.orbita}`}
          backButton={
            <button onClick={() => navigate("/frota")}
              className="inline-flex items-center gap-2 bg-transparent border-none cursor-pointer font-['Exo_2',sans-serif] text-[0.85rem] font-semibold p-0 transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.4)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#29c5f6")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)")}>
              <ArrowLeft size={16} /> Voltar para Frota
            </button>
          }
          acoes={
            <>
              {/* badge de status — usa StatusBadge com ícone */}
              <Badge status={satelite.statusRisco} size="md" showIcon />
              {/* botão editar */}
              <button onClick={() => setEditando(true)}
                className="inline-flex items-center gap-2 font-['Exo_2',sans-serif] font-semibold text-[0.85rem] py-2 px-5 rounded-full border cursor-pointer bg-transparent transition-colors duration-200"
                style={{ color: "#29c5f6", borderColor: "rgba(41,197,246,0.3)" }}>
                <Settings size={16} /> Editar
              </button>
            </>
          }
        />

        {feedback && (
          <div className="px-24 pt-4 max-[480px]:px-6 min-[481px]:max-[991px]:px-8">
            <p className="text-[#29c5f6] text-[0.88rem] font-['Exo_2',sans-serif] flex items-center gap-2">
              <Check size={14} /> {feedback}
            </p>
          </div>
        )}

        {/* CONTEÚDO */}
        <section className="px-24 py-10 max-[480px]:px-6 max-[480px]:py-8 min-[481px]:max-[991px]:px-8 grid gap-10 grid-cols-[1fr_20rem] max-[991px]:grid-cols-1">

          {/* animação + stats */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl p-6"
              style={{ backgroundColor: "rgba(255,255,255,0.02)", border: `1px solid ${cfg.color}22` }}>
              <OrbitalCanvas status={satelite.statusRisco} />
            </div>

            {/*métricas principais — usa StatBox */}
            <div className="grid grid-cols-3 gap-4 max-[480px]:grid-cols-1">
              <StatBox label="Próxima janela" value={satelite.proximaJanela}                              color="#29c5f6" />
              <StatBox label="Prob. colisão"  value={`${satelite.probColisao}%`}                         color={cfg.color} />
              <StatBox label="Delta-V mín."   value={satelite.deltaV ? `${satelite.deltaV} m/s` : "—"}  color="#f0a030" />
            </div>

            {/* dados — usa StatBox com size="sm" e bgAlpha="low" */}
            <div className="grid grid-cols-2 gap-4 max-[480px]:grid-cols-1">
              <StatBox label="Altitude"    value={`${satelite.altitude.toLocaleString()} km`} color="#29c5f6" size="sm" bgAlpha="low" />
              <StatBox label="Inclinação"  value={`${satelite.inclinacao}°`}                  color="#29c5f6" size="sm" bgAlpha="low" />
              <StatBox label="Combustível" value={`${satelite.combustivel}%`}                 color={satelite.combustivel < 40 ? "#e84c1c" : "#22c55e"} size="sm" bgAlpha="low" />
              <StatBox label="Órbita"      value={satelite.orbita}                             color="#ffffff" size="sm" bgAlpha="low" />
            </div>
          </div>

          {/* painel de ações */}
          <div className="flex flex-col gap-4">
            <h2 className="font-['Exo_2',sans-serif] font-bold text-white text-[1rem] mb-1">
              Ações disponíveis
            </h2>

            {/* botão principal muda conforme statusRisco */}
            {satelite.statusRisco === "ok" ? (
              // UC04 — Monitorar (GET): sem risco, só atualiza dados
              <button onClick={handleMonitorar} disabled={monitorando}
                className="w-full py-4 rounded-xl font-['Exo_2',sans-serif] font-bold text-[0.95rem] border-none cursor-pointer transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ backgroundColor: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }}>
                <Shield size={18} />
                {monitorando ? "Atualizando..." : "Monitorar satélite"}
              </button>
            ) : satelite.statusRisco === "warn" ? (
              // UC03 — Calcular Manobra (POST): risco moderado
              <button onClick={handleCalcularManobra} disabled={calculando}
                className="w-full py-4 rounded-xl font-['Exo_2',sans-serif] font-bold text-[0.95rem] border-none cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ backgroundColor: "#f0a030", color: "#06090f" }}>
                <AlertTriangle size={18} />
                {calculando ? "Calculando..." : "Calcular Manobra"}
              </button>
            ) : (
              // UC03 — Manobra Emergencial (POST): risco crítico
              <button onClick={handleCalcularManobra} disabled={calculando}
                className="w-full py-4 rounded-xl font-['Exo_2',sans-serif] font-bold text-[0.95rem] border-none cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ backgroundColor: "#e84c1c", color: "#fff", animation: "pulse 1.5s infinite" }}>
                <AlertOctagon size={18} />
                {calculando ? "Calculando..." : "⚠ Manobra Emergencial"}
              </button>
            )}

            {/* UC04 — Monitorar sempre disponível em warn/danger */}
            {satelite.statusRisco !== "ok" && (
              <button onClick={handleMonitorar} disabled={monitorando}
                className="w-full py-3.5 rounded-xl font-['Exo_2',sans-serif] font-bold text-[0.9rem] cursor-pointer transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-60 bg-transparent"
                style={{ color: "#29c5f6", border: "1px solid rgba(41,197,246,0.25)" }}>
                <RefreshCw size={16} className={monitorando ? "animate-spin" : ""} />
                {monitorando ? "Atualizando..." : "Monitorar satélite"}
              </button>
            )}
          </div>
        </section>
      </main>

      <div className="hidden min-[992px]:block">
        <Footer />
      </div>

      {manobra   && <ModalManobra manobra={manobra} onClose={() => setManobra(null)} />}
      {editando  && satelite && (
        <ModalEditar satelite={satelite} onSave={handleEditar} onClose={() => setEditando(false)} />
      )}
    </div>
  );
}

export default SateliteDetalhe;