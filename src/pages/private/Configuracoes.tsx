import { User, LogOut, Mail } from "lucide-react";
import Header from "../components/HeaderPrivado";
import Footer from "../components/Footer";
import TitlePage from "../components/TitlePage";

function Secao({ icon, title, children }: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col gap-5 p-7 max-[480px]:p-5 rounded-2xl"
      style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "rgba(41,197,246,0.1)", color: "#29c5f6" }}
        >
          {icon}
        </div>
        <h2 className="font-['Exo_2',sans-serif] font-bold text-white text-[1rem]">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function CampoFixo({ label, value, icon }: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-['Exo_2',sans-serif] font-bold text-[0.78rem] text-white/40 uppercase tracking-wider">
        {label}
      </label>
      <div
        className="w-full px-4 py-[0.7rem] rounded-lg text-[0.95rem] font-['Roboto',sans-serif] flex items-center gap-2"
        style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", cursor: "default" }}
      >
        <span style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>{icon}</span>
        <span className="truncate">{value || "—"}</span>
      </div>
      <span className="text-white/25 text-[0.72rem] font-['Roboto',sans-serif]">Campo não editável</span>
    </div>
  );
}

// página principal
function Configuracoes() {

  // e-mail lido do sessionStorage — foi salvo no Login quando o usuário entrou
  // quando a API estiver ativa, esse dado virá do token JWT decodificado
  const emailFixo = sessionStorage.getItem("userEmail") ?? "—";

  function handleLogout() {
    // limpa todos os dados de sessão ao sair
    sessionStorage.removeItem("logado");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userName");
    window.location.href = "/login";
  }

  return (
    <div className="font-['Roboto',sans-serif] text-white flex flex-col min-h-screen bg-[#06090f]">
      <Header />

      <main className="flex-1 pb-20 min-[992px]:pb-0">

        {/* TÍTULO */}
        <TitlePage
          titulo="Confi" tituloDestaque="gurações"
          subtitulo="Gerencie seus dados de perfil e acesso à plataforma."
        />

        {/* coluna única ocupando a largura total da página, igual às outras seções */}
        <section className="px-24 py-14 max-[480px]:px-6 max-[480px]:py-10 min-[481px]:max-[991px]:px-8 min-[481px]:max-[991px]:py-10 flex flex-col gap-6">

          {/* PERFIL */}
          <Secao icon={<User size={18} />} title="Informações de perfil">
            <CampoFixo label="E-mail" value={emailFixo} icon={<Mail size={14} />} />
          </Secao>

          {/* LOGOUT */}
          <div
            className="flex items-center justify-between gap-4 p-7 max-[480px]:p-5 rounded-2xl flex-wrap"
            style={{ backgroundColor: "rgba(232,76,28,0.04)", border: "1px solid rgba(232,76,28,0.15)" }}
          >
            <div>
              <p className="font-['Exo_2',sans-serif] font-bold text-white text-[1rem] mb-1">
                Sair da plataforma
              </p>
              <p className="text-white/45 text-[0.85rem] leading-[1.6]">
                Encerra sua sessão e retorna à página de login.
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 font-['Exo_2',sans-serif] font-bold text-[0.9rem] py-3 px-8 rounded-full border cursor-pointer transition-all duration-200 bg-transparent"
              style={{ color: "#e84c1c", borderColor: "rgba(232,76,28,0.4)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(232,76,28,0.1)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent")
              }
            >
              <LogOut size={16} />
              Sair
            </button>
          </div>

        </section>
      </main>

      <div className="hidden min-[992px]:block">
        <Footer />
      </div>
    </div>
  );
}

export default Configuracoes;