import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Plus, X, Check, ChevronRight } from "lucide-react";
import Header from "../components/HeaderPrivado";
import Footer from "../components/Footer";

// tipos
interface Satelite {
  id: number;
  nome: string;
  noradId: string;
  cosparId: string;
  orbita: string;
  altitude: number;
  probColisao: number;
  statusRisco: "ok" | "warn" | "danger";
}

interface NovoSateliteForm {
  nome: string;
  noradId: string;
  cosparId: string;
  orbita: string;
  altitude: number;
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

const riscoCfg = {
  ok:     { color: "#22c55e", label: "Normal"  },
  warn:   { color: "#f0a030", label: "Atenção" },
  danger: { color: "#e84c1c", label: "Crítico" },
};

// modal cadastro
// usa react-hook-form + fetch POST /satelites
function ModalCadastro({
  onSave,
  onClose,
}: {
  onSave: (data: NovoSateliteForm) => Promise<void>;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NovoSateliteForm>();

  const inputCls =
    "w-full px-4 py-2.5 rounded-lg text-[0.9rem] font-['Roboto',sans-serif] outline-none bg-white/[0.04] text-white placeholder:text-white/25 border border-white/10 focus:border-[#29c5f6] transition-colors duration-200";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="w-full max-w-[28rem] rounded-2xl p-7 flex flex-col gap-5"
        style={{ backgroundColor: "#0d0d18", border: "1px solid rgba(41,197,246,0.2)" }}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-['Exo_2',sans-serif] font-bold text-white text-[1.05rem]">
            Cadastrar novo satélite
          </h3>
          <button
            onClick={onClose}
            className="bg-transparent border-none cursor-pointer text-white/40 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSave)} noValidate className="flex flex-col gap-4">
          {/* Nome */}
          <div className="flex flex-col gap-1.5">
            <label className="font-['Exo_2',sans-serif] font-bold text-[0.78rem] text-white/50 uppercase tracking-wider">
              Nome*
            </label>
            <input
              className={inputCls}
              placeholder="Ex: AMAZONIA-1"
              {...register("nome", {
                required: "Nome é obrigatório",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
            />
            {errors.nome && (
              <span className="text-[#e84c1c] text-[0.78rem]">{errors.nome.message}</span>
            )}
          </div>

          {/* NORAD + COSPAR */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-['Exo_2',sans-serif] font-bold text-[0.78rem] text-white/50 uppercase tracking-wider">
                NORAD ID*
              </label>
              <input
                className={inputCls}
                placeholder="Ex: 47699"
                {...register("noradId", {
                  required: "NORAD é obrigatório",
                  pattern: { value: /^\d+$/, message: "Apenas números" },
                })}
              />
              {errors.noradId && (
                <span className="text-[#e84c1c] text-[0.78rem]">{errors.noradId.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-['Exo_2',sans-serif] font-bold text-[0.78rem] text-white/50 uppercase tracking-wider">
                COSPAR ID*
              </label>
              <input
                className={inputCls}
                placeholder="Ex: 2021-045A"
                {...register("cosparId", { required: "COSPAR é obrigatório" })}
              />
              {errors.cosparId && (
                <span className="text-[#e84c1c] text-[0.78rem]">{errors.cosparId.message}</span>
              )}
            </div>
          </div>

          {/* Órbita + Altitude */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-['Exo_2',sans-serif] font-bold text-[0.78rem] text-white/50 uppercase tracking-wider">
                Órbita
              </label>
              <select
                className={inputCls}
                {...register("orbita")}
                style={{ appearance: "none" }}
              >
                {["LEO", "MEO", "GEO", "SSO", "HEO"].map((o) => (
                  <option key={o} value={o} style={{ background: "#0d0d18" }}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-['Exo_2',sans-serif] font-bold text-[0.78rem] text-white/50 uppercase tracking-wider">
                Altitude (km)*
              </label>
              <input
                className={inputCls}
                type="number"
                placeholder="Ex: 752"
                {...register("altitude", {
                  required: "Altitude é obrigatória",
                  min: { value: 1, message: "Valor inválido" },
                })}
              />
              {errors.altitude && (
                <span className="text-[#e84c1c] text-[0.78rem]">{errors.altitude.message}</span>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl font-['Exo_2',sans-serif] font-bold text-[0.85rem] cursor-pointer"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-xl font-['Exo_2',sans-serif] font-bold text-[0.85rem] cursor-pointer flex items-center justify-center gap-2 border-none disabled:opacity-50"
              style={{ backgroundColor: "#29c5f6", color: "#06090f" }}
            >
              <Check size={16} />
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// página principal
function FrotaLista() {
  const navigate = useNavigate();
  const [satelites, setSatelites] = useState<Satelite[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<"TODOS" | "ALERTA" | "OK">("TODOS");
  const [modalAberto, setModalAberto] = useState(false);

  // UC01/UC06 — GET /satelites
  // quarkus: retorna array Satelite[] com statusRisco calculado pelo modelo Python
  useEffect(() => {
    fetch(`${API_URL}/satelites`)
      .then((r) => {
        if (!r.ok) throw new Error("api error");
        return r.json();
      })
      .catch(() => [
        {
          id: 1, nome: "AMAZONIA-1",   noradId: "47699", cosparId: "2021-045A",
          orbita: "LEO", altitude: 752,   probColisao: 78, statusRisco: "danger",
        },
        {
          id: 2, nome: "BRASILSAT B4", noradId: "28645", cosparId: "1994-016A",
          orbita: "GEO", altitude: 35786, probColisao: 42, statusRisco: "warn",
        },
        {
          id: 3, nome: "SGDC-1",       noradId: "42833", cosparId: "2017-028A",
          orbita: "GEO", altitude: 35786, probColisao: 4,  statusRisco: "ok",
        },
        {
          id: 4, nome: "CBERS-4A",     noradId: "44883", cosparId: "2019-093E",
          orbita: "SSO", altitude: 628,   probColisao: 8,  statusRisco: "ok",
        },
      ])
      .then((data) => setSatelites(data))
      .finally(() => setLoading(false));
  }, []);

  // UC02 — POST /satelites (react-hook-form)
  async function handleCadastrar(data: NovoSateliteForm) {
    try {
      const res = await fetch(`${API_URL}/satelites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("api error");
      const novo: Satelite = await res.json();
      setSatelites((prev) => [...prev, novo]);
    } catch {
      const novoLocal: Satelite = {
        id: Date.now(),
        ...data,
        probColisao: 0,
        statusRisco: "ok",
      };
      setSatelites((prev) => [...prev, novoLocal]);
    }
    setModalAberto(false);
  }

  const filtrados = satelites.filter((s) => {
    if (filtro === "TODOS") return true;
    if (filtro === "ALERTA") return s.statusRisco === "warn" || s.statusRisco === "danger";
    return s.statusRisco === "ok";
  });

  const counts = {
    TODOS: satelites.length,
    ALERTA: satelites.filter((s) => s.statusRisco !== "ok").length,
    OK: satelites.filter((s) => s.statusRisco === "ok").length,
  };

  return (
    <div className="font-['Roboto',sans-serif] text-white flex flex-col min-h-screen bg-[#06090f]">
      <Header />

      <main className="flex-1 pb-20 min-[992px]:pb-0">

        {/* ── TÍTULO ── */}
        <section
          className="px-24 py-14 max-[480px]:px-6 max-[480px]:py-10 min-[481px]:max-[991px]:px-8 min-[481px]:max-[991px]:py-10"
          style={{ borderBottom: "1px solid rgba(41,197,246,0.1)" }}
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="font-['Exo_2',sans-serif] font-bold text-[2.5rem] max-[480px]:text-[1.8rem] mb-2">
                Minha <span className="text-[#29c5f6]">Frota</span>
              </h1>
              <p className="text-white/50 text-[0.95rem]">{satelites.length} satélites cadastrados</p>
            </div>
            {/* botão cadastrar */}
            <button
              onClick={() => setModalAberto(true)}
              className="inline-flex items-center gap-2 font-['Exo_2',sans-serif] font-bold text-[0.9rem] py-3 px-6 rounded-full border-none cursor-pointer transition-colors duration-200"
              style={{ backgroundColor: "#29c5f6", color: "#06090f" }}
            >
              <Plus size={18} /> Novo Satélite
            </button>
          </div>

          {/* filtros */}
          <div className="flex items-center gap-6 mt-6 flex-wrap">
            {(["TODOS", "ALERTA", "OK"] as const).map((f) => {
              const color =
                f === "TODOS" ? "#29c5f6" : f === "ALERTA" ? "#e84c1c" : "#22c55e";
              return (
                <button
                  key={f}
                  onClick={() => setFiltro(f)}
                  className="bg-transparent border-none cursor-pointer font-['Exo_2',sans-serif] font-semibold text-[0.8rem] uppercase tracking-wider pb-1 transition-colors duration-200"
                  style={{
                    color: filtro === f ? color : "rgba(255,255,255,0.3)",
                    borderBottom:
                      filtro === f ? `2px solid ${color}` : "2px solid transparent",
                  }}
                >
                  {f} ({counts[f]})
                </button>
              );
            })}
          </div>
        </section>

        {/* LISTA */}
        <section className="px-24 py-10 max-[480px]:px-6 max-[480px]:py-8 min-[481px]:max-[991px]:px-8">
          {loading ? (
            <p className="text-white/30 font-['Exo_2',sans-serif] text-[0.9rem]">
              Carregando frota...
            </p>
          ) : filtrados.length === 0 ? (
            <p className="text-white/30 font-['Exo_2',sans-serif] text-[0.9rem]">
              Nenhum satélite para este filtro.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {filtrados.map((sat) => {
                const cor = riscoCfg[sat.statusRisco].color;
                const label = riscoCfg[sat.statusRisco].label;
                return (
                  <div
                    key={sat.id}
                    className="flex items-center gap-5 p-5 rounded-2xl transition-all duration-200"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLDivElement).style.borderColor = cor + "44")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLDivElement).style.borderColor =
                        "rgba(255,255,255,0.07)")
                    }
                  >
                    {/* status */}
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cor, boxShadow: `0 0 6px ${cor}88` }}
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-['Exo_2',sans-serif] font-bold text-white text-[1rem]">
                          {sat.nome}
                        </span>
                        <span
                          className="font-['Exo_2',sans-serif] text-[0.68rem] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                          style={{
                            color: cor,
                            backgroundColor: cor + "18",
                            border: `1px solid ${cor}33`,
                          }}
                        >
                          {label}
                        </span>
                      </div>
                      <p className="text-white/40 text-[0.8rem] mt-0.5">
                        NORAD #{sat.noradId} · {sat.orbita} · {sat.altitude.toLocaleString()} km
                      </p>
                    </div>

                    {/* prob colisão */}
                    <div className="text-right flex-shrink-0 hidden min-[600px]:block">
                      <p
                        className="font-['Exo_2',sans-serif] font-bold text-[0.9rem]"
                        style={{ color: cor }}
                      >
                        {sat.probColisao}%
                      </p>
                      <p className="text-white/30 text-[0.72rem] font-['Exo_2',sans-serif]">
                        prob. colisão
                      </p>
                    </div>

                    {/* botão detalhe */}
                    <button
                      onClick={() => navigate(`/satelite/${sat.noradId}`)}
                      className="flex items-center gap-1.5 font-['Exo_2',sans-serif] font-bold text-[0.75rem] uppercase tracking-wider py-2 px-4 rounded-lg border cursor-pointer transition-all duration-200 flex-shrink-0"
                      style={{
                        backgroundColor: "rgba(41,197,246,0.08)",
                        borderColor: "rgba(41,197,246,0.25)",
                        color: "#29c5f6",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                          "rgba(41,197,246,0.18)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                          "rgba(41,197,246,0.08)";
                      }}
                    >
                      Detalhes <ChevronRight size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <div className="hidden min-[992px]:block">
        <Footer />
      </div>

      {modalAberto && (
        <ModalCadastro onSave={handleCadastrar} onClose={() => setModalAberto(false)} />
      )}
    </div>
  );
}

export default FrotaLista;