import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, User, Building2, ArrowRight, Check } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface CadastroForm {
  nome: string;
  email: string;
  organizacao: string;
  senha: string;
  confirmaSenha: string;
}

const inputBase =
  "w-full px-4 py-[0.75rem] rounded-lg text-[0.95rem] font-['Roboto',sans-serif] outline-none transition-colors duration-200 bg-white/[0.04] text-white placeholder:text-white/25";

const inputBorder = (hasError: boolean) =>
  hasError
    ? "border-[1.5px] border-[#e84c1c]"
    : "border-[1.5px] border-white/10 focus:border-[#29c5f6]";

function InputIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <span
      className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
      style={{ color: "rgba(255,255,255,0.25)" }}
    >
      {icon}
    </span>
  );
}

function Cadastro() {
  const navigate = useNavigate();
  const [erroCadastro] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<CadastroForm>();

  const senhaWatch = watch("senha") ?? "";
  const confirmaSenhaWatch = watch("confirmaSenha") ?? "";

  // validação de senha
  const regrasSenha = [
    { label: "Mínimo 6 caracteres", ok: senhaWatch.length >= 6 },
    { label: "Uma letra maiúscula", ok: /[A-Z]/.test(senhaWatch) },
    { label: "Uma letra minúscula", ok: /[a-z]/.test(senhaWatch) },
    { label: "Um número",           ok: /[0-9]/.test(senhaWatch) },
    { label: "Senhas coincidem",    ok: senhaWatch.length > 0 && senhaWatch === confirmaSenhaWatch },
  ];

  // Integração futura com Quarkus
  // Quando o backend estiver pronto com CORS configurado,
  // descomente o bloco abaixo e remova o bloco de fallback:
  //
  // async function onSubmit(data: CadastroForm) {
  //   try {
  //     const res = await fetch(`${API_URL}/auth/cadastro`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         nome: data.nome,
  //         email: data.email,
  //         organizacao: data.organizacao,
  //         senha: data.senha,
  //       }),
  //     });
  //     if (!res.ok) throw new Error("Erro ao cadastrar");
  //     // Sucesso: isSubmitSuccessful vira true → mostra tela de sucesso → redireciona para /login
  //   } catch {
  //     setErroCadastro("Não foi possível criar a conta. Tente novamente.");
  //   }
  // }
  //
  async function onSubmit(_data: CadastroForm) {
    await new Promise((r) => setTimeout(r, 900));
    setTimeout(() => navigate("/login"), 1200);
  }

  return (
    <div
      className="font-['Roboto',sans-serif] text-white flex flex-col min-h-screen bg-[#06090f]"
      style={{
  background: "radial-gradient(ellipse at top, #0d1a2e 0%, #06090f 60%)",
}}
    >
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[30rem] flex flex-col gap-8">

          {/* Cabeçalho */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 mb-4 text-[0.7rem] font-['Exo_2',sans-serif] font-semibold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full border border-[#e84c1c]/30 bg-[#e84c1c]/[0.06] text-[#e84c1c]">
              Novo acesso
            </span>
            <h1 className="font-['Exo_2',sans-serif] font-bold text-[2rem] text-white mb-2">
              Crie sua <span className="text-[#e84c1c]">conta</span>
            </h1>
            <p className="text-white/45 text-[0.9rem]">
              Monitore sua frota e gerencie riscos orbitais em tempo real.
            </p>
          </div>

          {/* Card do formulário */}
          <div
            className="rounded-2xl p-8 max-[480px]:p-6 flex flex-col gap-5"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(232,76,28,0.15)",
            }}
          >
            {isSubmitSuccessful ? (
              /* Estado de sucesso */
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)" }}
                >
                  <Check size={28} style={{ color: "#22c55e" }} />
                </div>
                <h2 className="font-['Exo_2',sans-serif] font-bold text-white text-[1.2rem]">
                  Conta criada com sucesso!
                </h2>
                <p className="text-white/45 text-[0.88rem]">
                  Redirecionando para o login...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">

                {/* Nome */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-['Exo_2',sans-serif] font-bold text-[0.78rem] text-white/50 uppercase tracking-wider">
                    Nome completo*
                  </label>
                  <div className="relative">
                    <InputIcon icon={<User size={16} />} />
                    <input
                      type="text"
                      placeholder="Seu nome completo"
                      className={`${inputBase} ${inputBorder(!!errors.nome)} pl-10`}
                      {...register("nome", {
                        required: "Nome é obrigatório",
                        minLength: { value: 3, message: "Mínimo 3 caracteres" },
                      })}
                    />
                  </div>
                  {errors.nome && (
                    <span className="text-[#e84c1c] text-[0.78rem]">{errors.nome.message}</span>
                  )}
                </div>

                {/* E-mail */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-['Exo_2',sans-serif] font-bold text-[0.78rem] text-white/50 uppercase tracking-wider">
                    E-mail*
                  </label>
                  <div className="relative">
                    <InputIcon icon={<Mail size={16} />} />
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      className={`${inputBase} ${inputBorder(!!errors.email)} pl-10`}
                      {...register("email", {
                        required: "E-mail é obrigatório",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "E-mail inválido",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-[#e84c1c] text-[0.78rem]">{errors.email.message}</span>
                  )}
                </div>

                {/* Organização */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-['Exo_2',sans-serif] font-bold text-[0.78rem] text-white/50 uppercase tracking-wider">
                    Organização
                  </label>
                  <div className="relative">
                    <InputIcon icon={<Building2 size={16} />} />
                    <input
                      type="text"
                      placeholder="Nome da sua organização"
                      className={`${inputBase} ${inputBorder(false)} pl-10`}
                      {...register("organizacao")}
                    />
                  </div>
                </div>

                {/* Senha */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-['Exo_2',sans-serif] font-bold text-[0.78rem] text-white/50 uppercase tracking-wider">
                    Senha*
                  </label>
                  <div className="relative">
                    <InputIcon icon={<Lock size={16} />} />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className={`${inputBase} ${inputBorder(!!errors.senha)} pl-10`}
                      {...register("senha", {
                        required: "Senha é obrigatória",
                        minLength: { value: 6, message: "Mínimo 6 caracteres" },
                        validate: {
                          maiuscula: (v) => /[A-Z]/.test(v) || "Precisa de uma letra maiúscula",
                          minuscula: (v) => /[a-z]/.test(v) || "Precisa de uma letra minúscula",
                          numero:    (v) => /[0-9]/.test(v) || "Precisa de um número",
                        },
                      })}
                    />
                  </div>
                  {errors.senha && (
                    <span className="text-[#e84c1c] text-[0.78rem]">{errors.senha.message}</span>
                  )}
                </div>

                {/* Confirmar senha */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-['Exo_2',sans-serif] font-bold text-[0.78rem] text-white/50 uppercase tracking-wider">
                    Confirmar senha*
                  </label>
                  <div className="relative">
                    <InputIcon icon={<Lock size={16} />} />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className={`${inputBase} ${inputBorder(!!errors.confirmaSenha)} pl-10`}
                      {...register("confirmaSenha", {
                        required: "Confirme sua senha",
                        validate: (v) => v === senhaWatch || "As senhas não coincidem",
                      })}
                    />
                  </div>
                  {errors.confirmaSenha && (
                    <span className="text-[#e84c1c] text-[0.78rem]">{errors.confirmaSenha.message}</span>
                  )}
                </div>

                {/* Checklist de validação */}
                {senhaWatch.length > 0 && (
                  <div
                    className="grid grid-cols-2 gap-x-4 gap-y-2 p-4 rounded-xl"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {regrasSenha.map((regra) => (
                      <div key={regra.label} className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                          style={{
                            backgroundColor: regra.ok
                              ? "rgba(34,197,94,0.15)"
                              : "rgba(232,76,28,0.12)",
                          }}
                        >
                          {regra.ok ? (
                            <Check size={10} style={{ color: "#22c55e" }} />
                          ) : (
                            <span
                              style={{
                                display: "block",
                                width: 8,
                                height: 1.5,
                                borderRadius: 2,
                                backgroundColor: "#e84c1c",
                              }}
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

                {erroCadastro && (
                  <p className="text-[#e84c1c] text-[0.82rem] font-['Roboto',sans-serif] flex items-center gap-1.5">
                    <span>⚠</span> {erroCadastro}
                  </p>
                )}

                {/* Botão submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full inline-flex items-center justify-center gap-2 font-['Exo_2',sans-serif] font-bold text-[0.95rem] py-[0.85rem] rounded-xl border-none cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#e84c1c", color: "#ffffff" }}
                  onMouseEnter={(e) =>
                    !isSubmitting &&
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#c73d14")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#e84c1c")
                  }
                >
                  {isSubmitting ? "Criando conta..." : <>Criar conta <ArrowRight size={17} /></>}
                </button>
              </form>
            )}

            {/* Divisor */}
            {!isSubmitSuccessful && (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
                  <span className="text-white/25 text-[0.75rem] font-['Roboto',sans-serif]">ou</span>
                  <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
                </div>

                {/* Link para login */}
                <p className="text-center text-[0.88rem] text-white/40 font-['Roboto',sans-serif]">
                  Já tem conta?{" "}
                  <Link
                    to="/login"
                    className="no-underline font-semibold transition-colors duration-200"
                    style={{ color: "#29c5f6" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "#1eaada")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "#29c5f6")
                    }
                  >
                    Fazer login
                  </Link>
                </p>
              </>
            )}
          </div>

        </div>
      </main>

      <div className="hidden [@media(min-width:992px)]:block">
        <Footer />
      </div>
    </div>
  );
}

export default Cadastro;