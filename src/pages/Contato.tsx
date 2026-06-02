import { useForm } from "react-hook-form";
import Header from "./components/Header";
import Footer from "./components/Footer";

interface ContatoForm {
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
}

function Contato() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ContatoForm>();

  const onSubmit = async (data: ContatoForm) => {
    console.log("Dados do formulário:", data);
    reset();
  };

  const inputBase = `
    w-full px-4 py-[0.7rem]
    rounded-lg text-[0.95rem]
    font-['Roboto',sans-serif]
    outline-none transition-colors duration-200
    bg-white/[0.04] text-white
    placeholder:text-white/30`;

  const inputBorder = (hasError: boolean) =>
    hasError
      ? "border-[1.5px] border-[#e84c1c]"
      : "border-[1.5px] border-white/10 focus:border-[#29c5f6]";

  return (
    <div className="font-['Roboto',sans-serif] text-white flex flex-col min-h-screen bg-[#06090f]">
      <Header/>

      <main className="flex-1 min-h-[80vh] pb-16">

        {/* ── TÍTULO ── */}
        <section className="px-24 py-14 max-[480px]:px-6 max-[480px]:py-10 min-[481px]:max-[991px]:px-8 min-[481px]:max-[991px]:py-10"
          style={{ borderBottom: "1px solid rgba(41,197,246,0.1)" }}
        >
          <h1 className="font-['Exo_2',sans-serif] font-bold leading-tight mb-3 text-[2.5rem] max-[480px]:text-[1.8rem] min-[481px]:max-[991px]:text-[2rem]">
            Entre em <span className="text-[#29c5f6]">contato</span>
          </h1>
          <p className="text-white/50 text-[0.95rem] max-w-[32rem]">
            Tem dúvidas sobre a plataforma ou quer saber mais sobre o projeto?
            Envie sua mensagem e retornaremos em breve.
          </p>
        </section>

        {/* ── FORMULÁRIO ── */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-1 w-[95%] min-[992px]:w-[90%] max-w-[36rem] mx-auto mt-10 rounded-2xl p-6 min-[992px]:p-8"
          style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(41,197,246,0.12)", }}>

          {/* Nome */}
          <div className="flex flex-col gap-[0.3rem] mb-3">
            <label htmlFor="nome" className="font-['Exo_2',sans-serif] font-bold text-[0.9rem] text-white/80">
              Nome*
            </label>
            <input
              id="nome"
              type="text"
              placeholder="Seu nome completo"
              className={`${inputBase} ${inputBorder(!!errors.nome)}`}
              {...register("nome", {
                required: "Nome é obrigatório",
                minLength: { value: 3, message: "Mínimo de 3 caracteres" },
              })}
            />
            {errors.nome && (
              <span className="text-[#e84c1c] text-[0.8rem]">{errors.nome.message}</span>
            )}
          </div>

          {/* E-mail */}
          <div className="flex flex-col gap-[0.3rem] mb-3">
            <label htmlFor="email" className="font-['Exo_2',sans-serif] font-bold text-[0.9rem] text-white/80">
              E-mail*
            </label>
            <input
              id="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              className={`${inputBase} ${inputBorder(!!errors.email)}`}
              {...register("email", {
                required: "E-mail é obrigatório",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "E-mail inválido",
                },
              })}
            />
            {errors.email && (
              <span className="text-[#e84c1c] text-[0.8rem]">{errors.email.message}</span>
            )}
          </div>

          {/* Telefone */}
          <div className="flex flex-col gap-[0.3rem] mb-3">
            <label htmlFor="telefone" className="font-['Exo_2',sans-serif] font-bold text-[0.9rem] text-white/80">
              Telefone / WhatsApp*
            </label>
            <input
              id="telefone"
              type="text"
              placeholder="(11) 99999-9999"
              className={`${inputBase} ${inputBorder(!!errors.telefone)}`}
              {...register("telefone", {
                required: "Telefone é obrigatório",
                pattern: {
                  value: /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/,
                  message: "Formato inválido. Ex: (11) 99999-9999",
                },
              })}
            />
            {errors.telefone && (
              <span className="text-[#e84c1c] text-[0.8rem]">{errors.telefone.message}</span>
            )}
          </div>

          {/* Assunto */}
          <div className="flex flex-col gap-[0.3rem] mb-3">
            <label htmlFor="assunto" className="font-['Exo_2',sans-serif] font-bold text-[0.9rem] text-white/80">
              Assunto*
            </label>
            <input
              id="assunto"
              type="text"
              placeholder="Assunto da mensagem"
              className={`${inputBase} ${inputBorder(!!errors.assunto)}`}
              {...register("assunto", {
                required: "Assunto é obrigatório",
                minLength: { value: 3, message: "Mínimo de 3 caracteres" },
              })}
            />
            {errors.assunto && (
              <span className="text-[#e84c1c] text-[0.8rem]">{errors.assunto.message}</span>
            )}
          </div>

          {/* Mensagem */}
          <div className="flex flex-col gap-[0.3rem] mb-3">
            <label htmlFor="mensagem" className="font-['Exo_2',sans-serif] font-bold text-[0.9rem] text-white/80">
              Mensagem*
            </label>
            <textarea
              id="mensagem"
              rows={5}
              placeholder="Escreva sua mensagem aqui..."
              className={`${inputBase} resize-y ${inputBorder(!!errors.mensagem)}`}
              {...register("mensagem", {
                required: "Mensagem é obrigatória",
                minLength: { value: 10, message: "Mínimo de 10 caracteres" },
              })}
            />
            {errors.mensagem && (
              <span className="text-[#e84c1c] text-[0.8rem]">{errors.mensagem.message}</span>
            )}
          </div>

          {/* Sucesso */}
          {isSubmitSuccessful && (
            <p className="text-[#29c5f6] text-[0.95rem] font-semibold text-center font-['Exo_2',sans-serif]">
              ✅ Mensagem enviada com sucesso!
            </p>
          )}

          {/* Botão */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 border-none py-[0.85rem] rounded-xl text-[1rem] font-bold cursor-pointer transition-colors duration-200 font-['Exo_2',sans-serif] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#e84c1c", color: "#ffffff" }}
            onMouseEnter={e =>
              !isSubmitting &&
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#c73d14")
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#e84c1c")
            }
          >
            {isSubmitting ? "Enviando..." : "Enviar mensagem"}
          </button>
        </form>

      </main>

      <div className="hidden min-[992px]:block">
        <Footer />
      </div>
    </div>
  );
}

export default Contato;