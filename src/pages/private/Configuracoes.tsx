import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Check, User, Lock, LogOut, Mail, Building2 } from "lucide-react";
import Header from "../components/HeaderPrivado";
import Footer from "../components/Footer";
import TitlePage from "../components/TitlePage";
import InputField from "../components/InputField";

// tipos
interface PerfilForm {
  nome: string;
}

interface SenhaForm {
  senhaAtual: string;
  novaSenha: string;
  confirmaSenha: string;
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

// CRÍTICO: Secao e CampoFixo declarados fora do componente pai
// Se declarados dentro, o React remonta o nó DOM a cada render, causando o bug de desfoco ao digitar (o input perde o foco imediatamente).
function Secao({ icon, title, children, }: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col gap-5 p-7 max-[480px]:p-5 rounded-2xl"
      style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", }} 
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

// email e organização só pode leitura
function CampoFixo({ label, value, icon, }: {
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
        style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)", cursor: "default", }}
      >
        <span style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>{icon}</span>
        <span className="truncate">{value || "—"}</span>
      </div>
    </div>
  );
}

// página principal
function Configuracoes() {

// infos fixas nas config
const [emailFixo, setEmailFixo] = useState("");
const [orgFixa, setOrgFixa] = useState("");

  // forms do perfil (só nome)
  const {
    register: regPerfil,
    handleSubmit: handlePerfil,
    reset: resetPerfil,
    formState: {
      errors: errPerfil,
      isSubmitting: salvandoPerfil,
      isSubmitSuccessful: perfilSalvo,
    },
  } = useForm<PerfilForm>();

  // forms senha
  const {
    register: regSenha,
    handleSubmit: handleSenha,
    reset: resetSenha,
    watch,
    formState: {
      errors: errSenha,
      isSubmitting: salvandoSenha,
      isSubmitSuccessful: senhaSalva,
    },
  } = useForm<SenhaForm>();

  const novaSenhaWatch   = watch("novaSenha")     ?? "";
  const confirmaSenhaWatch = watch("confirmaSenha") ?? "";

  // validação para a nova senha
  const regrasSenha = [
    { label: "Mínimo 6 caracteres",  ok: novaSenhaWatch.length >= 6 },
    { label: "Uma letra maiúscula",  ok: /[A-Z]/.test(novaSenhaWatch) },
    { label: "Uma letra minúscula",  ok: /[a-z]/.test(novaSenhaWatch) },
    { label: "Um número",            ok: /[0-9]/.test(novaSenhaWatch) },
    { label: "Senhas coincidem",     ok: novaSenhaWatch.length > 0 && novaSenhaWatch === confirmaSenhaWatch },
  ];

  // GET /usuarios/1: preenche nome no form
  // quarkus: retorna { id, nome, email, organizacao }
useEffect(() => {
  fetch(`${API_URL}/usuarios/1`)
    .then((r) => {
      if (!r.ok) throw new Error("api error");
      return r.json();
    })
    .catch(() => ({
      nome: "Catarina Salles",
      email: "est-catsalles@nasa.com",
      organizacao: "NASA",
    }))
    .then((data) => {
      resetPerfil({ nome: data.nome });
      setEmailFixo(data.email);
      setOrgFixa(data.organizacao);
    });
}, []);

  // PUT /usuarios/1: salva apenas o nome
  // quarkus: body { nome } → atualiza no banco
  async function onSalvarPerfil(data: PerfilForm) {
    try {
      await fetch(`${API_URL}/usuarios/1`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch { /* atualiza localmente */ }
  }

  // PUT /usuarios/1/senha
  // quarkus: body { senhaAtual, novaSenha } → valida e atualiza no banco
async function onAlterarSenha(data: SenhaForm) {
  try {
    const res = await fetch(`${API_URL}/usuarios/1/senha`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senhaAtual: data.senhaAtual, novaSenha: data.novaSenha }),
    });
    if (!res.ok) throw new Error("api error");
    resetSenha(); // ← só limpa se deu certo
  } catch { /* feedback via isSubmitSuccessful */ }
}

  function handleLogout() {
    window.location.href = "/";
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

        <section className="px-24 py-14 max-[480px]:px-6 max-[480px]:py-10 min-[481px]:max-[991px]:px-8 min-[481px]:max-[991px]:py-10 grid gap-16 grid-cols-[1fr_22rem] items-start max-[991px]:grid-cols-1 max-[991px]:gap-10">

          <div className="flex flex-col gap-6">

            {/* PERFIL */}
            <Secao icon={<User size={18} />} title="Informações de perfil">
              <form onSubmit={handlePerfil(onSalvarPerfil)} noValidate
                className="flex flex-col gap-4"
              >
                {/* nome: único campo que da pra editar — usa InputField */}
                <InputField
                  label="Nome*"
                  error={errPerfil.nome?.message}
                  type="text"
                  placeholder="Seu nome completo"
                  {...regPerfil("nome", {
                    required: "Nome é obrigatório", 
                    minLength: { value: 3, message: "Mínimo 3 caracteres" },
                  })}
                />

                {/* email: somente leitura */}
                <CampoFixo label="E-mail" value={emailFixo} icon={<Mail size={14} />} />

                {/* org: somente leitura */}
                <CampoFixo label="Organização" value={orgFixa} icon={<Building2 size={14} />} />

                {perfilSalvo && (
                  <p className="text-[#29c5f6] text-[0.88rem] font-semibold font-['Exo_2',sans-serif] flex items-center gap-2">
                    <Check size={16} /> Nome atualizado com sucesso!
                  </p>
                )}

                <button
                  type="submit" disabled={salvandoPerfil}
                  className="self-start inline-flex items-center gap-2 font-['Exo_2',sans-serif] font-bold text-[0.9rem] py-3 px-8 rounded-full border-none cursor-pointer transition-colors duration-200 disabled:opacity-50"
                  style={{ backgroundColor: perfilSalvo ? "#22c55e" : "#29c5f6", color: "#06090f", }}
                >
                  {perfilSalvo ? <><Check size={16} /> Salvo!</> : salvandoPerfil ? "Salvando..." : "Salvar"}
                </button>
              </form>
            </Secao>

            {/* SENHA */}
            <Secao icon={<Lock size={18} />} title="Alterar senha">
              <form onSubmit={handleSenha(onAlterarSenha)} noValidate
                className="flex flex-col gap-4"
              >
                {/* usa InputField nos três campos de senha */}
                <InputField
                  label="Senha atual*"
                  error={errSenha.senhaAtual?.message}
                  type="password"
                  placeholder="••••••••"
                  {...regSenha("senhaAtual", { required: "Informe sua senha atual" })}
                />

                <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                  <InputField
                    label="Nova senha*"
                    error={errSenha.novaSenha?.message}
                    type="password"
                    placeholder="••••••••"
                    {...regSenha("novaSenha", {
                      required: "Informe a nova senha", minLength: { value: 6, message: "Mínimo 6 caracteres" },
                      validate: {
                        maiuscula: (v) => /[A-Z]/.test(v) || "Precisa de uma letra maiúscula",
                        minuscula: (v) => /[a-z]/.test(v) || "Precisa de uma letra minúscula",
                        numero:    (v) => /[0-9]/.test(v) || "Precisa de um número",
                      },
                    })}
                  />
                  <InputField
                    label="Confirmar nova senha*"
                    error={errSenha.confirmaSenha?.message}
                    type="password"
                    placeholder="••••••••"
                    {...regSenha("confirmaSenha", {
                      required: "Confirme a nova senha",
                      validate: (v) => v === novaSenhaWatch || "As senhas não coincidem",
                    })}
                  />
                </div>

                {/* checklist de regras de validação de senha */}
                {novaSenhaWatch.length > 0 && (
                  <div
                    className="grid grid-cols-2 gap-x-4 gap-y-2 p-4 rounded-xl max-[600px]:grid-cols-1"
                    style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", }}
                  >
                    {regrasSenha.map((regra) => (
                      <div key={regra.label} className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                          style={{ backgroundColor: regra.ok ? "rgba(34,197,94,0.15)" : "rgba(232,76,28,0.12)", }}
                        >
                          {regra.ok ? (
                            <Check size={10} style={{ color: "#22c55e" }} />
                          ) : (
                            <span
                              style={{ display: "block", width: 8, height: 1.5, borderRadius: 2, backgroundColor: "#e84c1c", }}
                            />
                          )}
                        </div>
                        <span
                          className="text-[0.75rem] font-['Roboto',sans-serif] transition-colors duration-200"
                          style={{ color: regra.ok ? "#22c55e" : "rgba(255,255,255,0.35)" }}
                        >
                          {regra.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {senhaSalva && (
                  <p className="text-[#29c5f6] text-[0.88rem] font-semibold font-['Exo_2',sans-serif] flex items-center gap-2">
                    <Check size={16} /> Senha alterada com sucesso!
                  </p>
                )}

                <button
                  type="submit" disabled={salvandoSenha}
                  className="self-start inline-flex items-center gap-2 font-['Exo_2',sans-serif] font-bold text-[0.9rem] py-3 px-8 rounded-full border-none cursor-pointer transition-colors duration-200 disabled:opacity-50"
                  style={{ backgroundColor: "#e84c1c", color: "#ffffff" }}
                  onMouseEnter={(e) =>
                    !salvandoSenha &&
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#c73d14")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#e84c1c")
                  }
                >
                  <Lock size={16} />
                  {salvandoSenha ? "Alterando..." : "Alterar senha"}
                </button>
              </form>
            </Secao>
          </div>

          <div className="flex flex-col gap-6">
            {/* card de perfil */}
            <div
              className="flex flex-col gap-5 p-7 rounded-2xl"
              style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(41,197,246,0.12)", }}
            >
              <h2 className="font-['Exo_2',sans-serif] font-bold text-[1.1rem] text-white">
                Sua conta
              </h2>

              {[
                { icon: <User size={16} />,      label: "Organização", value: orgFixa },
                { icon: <Mail size={16} />,      label: "E-mail",      value: emailFixo },
                { icon: <Building2 size={16} />, label: "Plataforma",  value: "Orbital" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(41,197,246,0.1)", color: "#29c5f6" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-['Exo_2',sans-serif] font-bold text-[0.78rem] text-white/40 uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-[0.88rem] text-white/70 break-all">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Card de logout */}
            <div
              className="flex flex-col gap-4 p-7 rounded-2xl"
              style={{ backgroundColor: "rgba(232,76,28,0.04)", border: "1px solid rgba(232,76,28,0.15)", }}
            >
              <div>
                <p className="font-['Exo_2',sans-serif] font-bold text-white text-[1rem] mb-1">
                  Sair da plataforma
                </p>
                <p className="text-white/45 text-[0.85rem] leading-[1.6]">
                  Encerra sua sessão e retorna à página inicial.
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 font-['Exo_2',sans-serif] font-bold text-[0.9rem] py-3 px-6 rounded-full border cursor-pointer transition-all duration-200 bg-transparent w-full"
                style={{ color: "#e84c1c", borderColor: "rgba(232,76,28,0.4)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "rgba(232,76,28,0.1)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent")
                }
              >
                <LogOut size={16} />
                Sair
              </button>
            </div>

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