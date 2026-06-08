import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface LoginForm {
  email: string;
  senha: string;
}

const inputBase =
  "w-full px-4 py-[0.75rem] rounded-lg text-[0.95rem] font-['Roboto',sans-serif] outline-none transition-colors duration-200 bg-white/[0.04] text-white placeholder:text-white/25";

const inputBorder = (hasError: boolean) =>
  hasError
    ? "border-[1.5px] border-[#e84c1c]"
    : "border-[1.5px] border-white/10 focus:border-[#29c5f6]";

function Login() {
  const navigate = useNavigate();
  const [erroLogin] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  async function onSubmit(_data: LoginForm) {
    await new Promise((r) => setTimeout(r, 800));
    sessionStorage.setItem("logado", "true");
    navigate("/dashboard");
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
        <div className="w-full max-w-[26rem] flex flex-col gap-8">

          {/* Cabeçalho */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 mb-4 text-[0.7rem] font-['Exo_2',sans-serif] font-semibold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full border border-[#29c5f6]/30 bg-[#29c5f6]/[0.06] text-[#29c5f6]">
              Acesso à plataforma
            </span>
            <h1 className="font-['Exo_2',sans-serif] font-bold text-[2rem] text-white mb-2">
              Bem-vindo de <span className="text-[#29c5f6]">volta</span>
            </h1>
            <p className="text-white/45 text-[0.9rem]">
              Entre com suas credenciais para acessar o painel orbital.
            </p>
          </div>

          {/* Card do formulário */}
          <div
            className="rounded-2xl p-8 max-[480px]:p-6 flex flex-col gap-5"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(41,197,246,0.15)",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">

              {/* E-mail */}
              <div className="flex flex-col gap-1.5">
                <label className="font-['Exo_2',sans-serif] font-bold text-[0.78rem] text-white/50 uppercase tracking-wider">
                  E-mail*
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  />
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

              {/* Senha */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-['Exo_2',sans-serif] font-bold text-[0.78rem] text-white/50 uppercase tracking-wider">
                    Senha*
                  </label>
                </div>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className={`${inputBase} ${inputBorder(!!errors.senha)} pl-10`}
                    {...register("senha", {
                      required: "Senha é obrigatória",
                      minLength: { value: 6, message: "Mínimo 6 caracteres" },
                    })}
                  />
                </div>
                {errors.senha && (
                  <span className="text-[#e84c1c] text-[0.78rem]">{errors.senha.message}</span>
                )}
              </div>

              {/* Erro de credenciais (vindo da API) */}
              {erroLogin && (
                <p className="text-[#e84c1c] text-[0.82rem] font-['Roboto',sans-serif] flex items-center gap-1.5">
                  <span>⚠</span> {erroLogin}
                </p>
              )}

              {/* Botão submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 font-['Exo_2',sans-serif] font-bold text-[0.95rem] py-[0.85rem] rounded-xl border-none cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#29c5f6", color: "#06090f" }}
                onMouseEnter={(e) =>
                  !isSubmitting &&
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1eaada")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#29c5f6")
                }
              >
                {isSubmitting ? "Entrando..." : <>Entrar <ArrowRight size={17} /></>}
              </button>
            </form>

            {/* Divisor */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
              <span className="text-white/25 text-[0.75rem] font-['Roboto',sans-serif]">ou</span>
              <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
            </div>

            {/* Link para cadastro */}
            <p className="text-center text-[0.88rem] text-white/40 font-['Roboto',sans-serif]">
              Ainda não tem conta?{" "}
              <Link
                to="/cadastro"
                className="no-underline font-semibold transition-colors duration-200"
                style={{ color: "#29c5f6" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "#1eaada")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "#29c5f6")
                }
              >
                Criar conta
              </Link>
            </p>
          </div>

        </div>
      </main>

      <div className="hidden [@media(min-width:992px)]:block">
        <Footer />
      </div>
    </div>
  );
}

export default Login;