import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import background from "../assets/background.jpg"

function Home() {
  return (
    <div className="font-['Roboto',sans-serif] text-white flex flex-col min-h-screen bg-[#06090f]" 
    style={{ backgroundImage: `linear-gradient(rgba(6,9,15,0.75), rgba(6,9,15,0.85)), url(${background})`, backgroundSize: "cover", backgroundPosition: "center",}}>

      <Header/>
      <main className="flex-1 flex flex-col">

        {/* ── HERO ── */}
        <section
          className="flex-1 flex items-center min-h-[calc(100vh-3.5rem)] pl-24 max-[480px]:pl-0 max-[480px]:justify-center max-[480px]:text-center max-[480px]:py-12 max-[480px]:px-6 min-[481px]:max-[991px]:pl-0 min-[481px]:max-[991px]:justify-center min-[481px]:max-[991px]:text-center min-[481px]:max-[991px]:py-12 min-[481px]:max-[991px]:px-6 min-[992px]:min-h-[calc(100vh-6rem)]">

          <div className="max-w-[40rem]">

            {/* headline */}
            <h1 className="font-['Exo_2',sans-serif] font-bold leading-[1.05] mb-5 text-[3rem] max-[480px]:text-[2rem]min-[481px]:max-[991px]:text-[2.4rem]">
              Transformando<br />
              <span className="text-[#29c5f6]">dados orbitais</span><br />
              em decisões estratégicas.
            </h1>

            {/* subtítulo */}
            <p className="text-[1rem] leading-[1.7] mb-8 text-white/60 max-[480px]:text-[0.9rem] max-[480px]:mb-6 min-[481px]:max-[991px]:text-[0.95rem]">
              A ORBITAL é uma plataforma de gestão de risco orbital que prevê colisões,
              classifica níveis de risco e recomenda manobras de desvio — contribuindo
              para operações espaciais mais seguras e rápidas.
            </p>

            {/* CTAs */}
            <div className=" flex items-center gap-4 flex-wrap max-[480px]:justify-center max-[480px]:flex-col max-[480px]:gap-3 min-[481px]:max-[991px]:justify-center">
              <Link to="/" className="
                  inline-flex items-center gap-2 font-['Exo_2',sans-serif] font-bold text-[0.95rem] bg-[#e84c1c] text-white py-[0.8rem] px-8 rounded-[2rem] no-underline border-none
                  hover:bg-[#c73d14] transition-colors duration-200 max-[480px]:text-[0.9rem] max-[480px]:py-[0.7rem] max-[480px]:px-6 max-[480px]:w-full max-[480px]:justify-center">
                Acessar Dashboard
                <ArrowRight size={18} />
              </Link>

              <Link to="/sobre"
                className="
                  inline-flex items-center gap-2 font-['Exo_2',sans-serif] font-semibold text-[0.95rem] text-[#29c5f6] border border-[#29c5f6]/40 py-[0.8rem] px-8 rounded-[2rem] no-underline bg-transparent
                  hover:bg-[#29c5f6]/10 transition-colors duration-200 max-[480px]:text-[0.9rem] max-[480px]:py-[0.7rem] max-[480px]:px-6 max-[480px]:w-full max-[480px]:justify-center">
                Saiba mais
              </Link>
            </div>
          </div>

        </section>

        {/* ── STATS ── */}
        <section className="px-24 py-8 border-t border-[#29c5f6]/10 max-[480px]:px-6 max-[480px]:py-8 min-[481px]:max-[991px]:px-8">
            <div className="grid gap-6 grid-cols-3 max-[480px]:grid-cols-2 min-[481px]:max-[991px]:grid-cols-2 text-center">
            {[
              { value: "27.000+", label: "objetos rastreados",        color: "#29c5f6" },
              { value: "6.000+",  label: "satélites ativos SpaceX",   color: "#e84c1c" },
              { value: "100%",    label: "dados NASA & Space-Track",   color: "#29c5f6" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-['Exo_2',sans-serif] font-bold text-[1.75rem] leading-none max-[480px]:text-[1.4rem]"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-[0.75rem] uppercase tracking-wider text-white/40 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <div className="hidden [@media(min-width:992px)]:block">
        <Footer />
      </div>
    </div>
  );
}

export default Home;