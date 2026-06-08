import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InputField from "../components/InputField";

interface LoginForm { email: string; senha: string; }

function Login() {
  const navigate = useNavigate();
  const erroLogin = "";
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>();

  async function onSubmit(data: LoginForm) {
    await new Promise(r => setTimeout(r, 800));
    sessionStorage.setItem("logado", "true");
    // salva o e-mail usado no login para exibir nas Configurações
    sessionStorage.setItem("userEmail", data.email);
    navigate("/dashboard");
  }

  return (
    <div className="font-['Roboto',sans-serif] text-white flex flex-col min-h-screen bg-[#06090f]"
      style={{ background:"radial-gradient(ellipse at top, #0d1a2e 0%, #06090f 60%)" }}>
      <Header/>
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[26rem] flex flex-col gap-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 mb-4 text-[0.7rem] font-['Exo_2',sans-serif] font-semibold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full border border-[#29c5f6]/30 bg-[#29c5f6]/[0.06] text-[#29c5f6]">
              Acesso à plataforma
            </span>
            <h1 className="font-['Exo_2',sans-serif] font-bold text-[2rem] text-white mb-2">
              Bem-vindo de <span className="text-[#29c5f6]">volta</span>
            </h1>
            <p className="text-white/45 text-[0.9rem]">Entre com suas credenciais para acessar o painel orbital.</p>
          </div>

          <div className="rounded-2xl p-8 max-[480px]:p-6 flex flex-col gap-5"
            style={{ backgroundColor:"rgba(255,255,255,0.03)", border:"1px solid rgba(41,197,246,0.15)" }}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">

              <InputField label="E-mail*" error={errors.email?.message} type="email" placeholder="seu@email.com"
                icon={<Mail size={16}/>}
                {...register("email", { required:"E-mail é obrigatório", pattern:{ value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/, message:"E-mail inválido" } })} />

              <InputField label="Senha*" error={errors.senha?.message} type="password" placeholder="••••••••"
                icon={<Lock size={16}/>}
                {...register("senha", { required:"Senha é obrigatória", minLength:{ value:6, message:"Mínimo 6 caracteres" } })} />

              {erroLogin && (
                <p className="text-[#e84c1c] text-[0.82rem] font-['Roboto',sans-serif] flex items-center gap-1.5">
                  <span>⚠</span> {erroLogin}
                </p>
              )}

              <button type="submit" disabled={isSubmitting}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 font-['Exo_2',sans-serif] font-bold text-[0.95rem] py-[0.85rem] rounded-xl border-none cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor:"#29c5f6", color:"#06090f" }}
                onMouseEnter={e => !isSubmitting && ((e.currentTarget as HTMLButtonElement).style.backgroundColor="#1eaada")}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor="#29c5f6")}>
                {isSubmitting ? "Entrando..." : <>Entrar <ArrowRight size={17}/></>}
              </button>
            </form>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ backgroundColor:"rgba(255,255,255,0.07)" }}/>
              <span className="text-white/25 text-[0.75rem] font-['Roboto',sans-serif]">ou</span>
              <div className="flex-1 h-px" style={{ backgroundColor:"rgba(255,255,255,0.07)" }}/>
            </div>

            <p className="text-center text-[0.88rem] text-white/40 font-['Roboto',sans-serif]">
              Ainda não tem conta?{" "}
              <Link to="/cadastro" className="no-underline font-semibold transition-colors duration-200" style={{ color:"#29c5f6" }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color="#1eaada")}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color="#29c5f6")}>
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </main>
      <div className="hidden [@media(min-width:992px)]:block"><Footer/></div>
    </div>
  );
}

export default Login;