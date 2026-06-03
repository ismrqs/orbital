import { Satellite, AlertTriangle, Navigation, Activity, Zap, Globe, Cpu, Database } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Sobre() {
  return (
    <div className="font-['Roboto',sans-serif] text-white flex flex-col min-h-screen bg-[#06090f]">
      <Header />

      <main className="flex-1">

        {/* ── TÍTULO DA PÁGINA ── */}
        <section className="px-24 py-14 max-[480px]:px-6 max-[480px]:py-10 min-[481px]:max-[991px]:px-8 min-[481px]:max-[991px]:py-10"
          style={{ borderBottom: "1px solid rgba(41,197,246,0.1)" }}
        >

          <h1 className="font-['Exo_2',sans-serif] font-bold leading-tight text-[2.5rem] max-[480px]:text-[1.8rem] min-[481px]:max-[991px]:text-[2rem] mb-3">
            Sobre a <span className="text-[#29c5f6]">ORBITAL</span>
          </h1>

          <p className="text-white/50 text-[1rem] max-w-[36rem] max-[480px]:text-[0.9rem]">
            Uma plataforma de gestão de risco orbital desenvolvida por estudantes da FIAP,
            criada para tornar operações espaciais mais seguras e rápidas.
          </p>
        </section>

        {/* ── PROBLEMA ── */}
        <section className="px-24 py-14 max-[480px]:px-6 max-[480px]:py-10 min-[481px]:max-[991px]:px-8 min-[481px]:max-[991px]:py-10"
            style={{ borderBottom: "1px solid rgba(41,197,246,0.1)" }}>
          <p className="font-['Exo_2',sans-serif] font-bold mb-6 text-[1.375rem] min-[992px]:text-[1.75rem] text-white">
            O problema que resolvemos
          </p>

          <p className="text-justify leading-relaxed text-white/70 text-[0.95rem] min-[768px]:text-[1rem] mb-6">
            A órbita terrestre acumula hoje mais de <strong className="text-white">27.000 objetos rastreados</strong> —
            entre satélites inativos, estágios de foguetes e fragmentos de colisões anteriores.
            Com a explosão de constelações de satélites como Starlink, prevê-se a adição de
            mais 3.200 novos objetos até 2030, tornando o espaço próximo cada vez mais congestionado.
          </p>

          <p className="text-justify leading-relaxed text-white/70 text-[0.95rem] min-[768px]:text-[1rem] mb-6">
            Colisões em órbita geram cascatas de detritos que podem inutilizar faixas inteiras
            do espaço por décadas — o chamado <strong className="text-white">Síndrome de Kessler</strong>.
            Operadores de satélites precisam de ferramentas rápidas e confiáveis para identificar
            riscos, tomar decisões e executar manobras de desvio antes que seja tarde.
          </p>

          <p className="text-justify leading-relaxed text-white/70 text-[0.95rem] min-[768px]:text-[1rem]">
            A ORBITAL conecta dados oficiais da <strong className="text-white">NASA</strong> e do
            <strong className="text-white"> Space-Track</strong> em uma única plataforma operacional,
            com inteligência artificial para classificar riscos, recomendar manobras e centralizar
            alertas — tudo em tempo real, com interface acessível e responsiva.
          </p>
        </section>

        {/* ── COMO FUNCIONA ── */}
        <section className="px-24 py-20 max-[480px]:px-6 max-[480px]:py-12 min-[481px]:max-[991px]:px-8 min-[481px]:max-[991px]:py-14"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="mb-12 max-[480px]:text-center min-[481px]:max-[991px]:text-center">
            <h2 className="font-['Exo_2',sans-serif] font-bold text-[1.75rem] mb-3 max-[480px]:text-[1.4rem]">
              Como a ORBITAL funciona
            </h2>
            <p className="text-white/50 text-[0.95rem] max-w-[40rem] max-[991px]:mx-auto">
              Uma cadeia completa de monitoramento, predição e resposta a riscos orbitais.
            </p>
          </div>

          <div className="grid gap-5 grid-cols-4 max-[480px]:grid-cols-1 min-[481px]:max-[991px]:grid-cols-2">
            {[
              {
                icon: <Satellite size={32} />,
                title: "Monitoramento orbital",
                desc: "Rastreamento contínuo de satélites e detritos em tempo real com dados oficiais da NASA e Space-Track.",
                accent: "#29c5f6",
                bg: "rgba(41,197,246,0.06)",
                border: "rgba(41,197,246,0.18)",
              },
              {
                icon: <AlertTriangle size={32} />,
                title: "Predição de colisão",
                desc: "IA classificando probabilidades de impacto e níveis de risco antes que se tornem ameaças reais.",
                accent: "#e84c1c",
                bg: "rgba(232,76,28,0.06)",
                border: "rgba(232,76,28,0.18)",
              },
              {
                icon: <Navigation size={32} />,
                title: "Manobras de desvio",
                desc: "Recomendações de manobras eficientes calculadas para menor consumo de combustível e maior segurança.",
                accent: "#29c5f6",
                bg: "rgba(41,197,246,0.06)",
                border: "rgba(41,197,246,0.18)",
              },
              {
                icon: <Activity size={32} />,
                title: "Dashboard operacional",
                desc: "Painel completo com alertas, eventos e histórico orbital para tomada de decisão estratégica.",
                accent: "#e84c1c",
                bg: "rgba(232,76,28,0.06)",
                border: "rgba(232,76,28,0.18)",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="flex flex-col gap-5 p-7 rounded-2xl transition-all duration-200 hover:scale-[1.02]"
                style={{ background: f.bg, border: `1px solid ${f.border}` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${f.accent}18`, color: f.accent }}
                >
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-['Exo_2',sans-serif] font-bold text-[1rem] mb-2 text-white">
                    {f.title}
                  </h3>
                  <p className="text-[0.85rem] leading-[1.7] text-white/55">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TECNOLOGIAS */}
        <section className="px-24 py-20 max-[480px]:px-6 max-[480px]:py-12 min-[481px]:max-[991px]:px-8 min-[481px]:max-[991px]:py-14"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="mb-10">
            <h2 className="font-['Exo_2',sans-serif] font-bold text-[1.75rem] mb-2 max-[480px]:text-[1.4rem]">
              Tecnologias envolvidas
            </h2>
            <p className="text-white/50 text-[0.95rem]">
              Stack completa — do front-end ao banco de dados.
            </p>
          </div>

          <div className="grid gap-4 grid-cols-4 max-[480px]:grid-cols-2 min-[481px]:max-[991px]:grid-cols-3">
            {[
              { nome: "React + Vite",  sub: "Front-end",       icon: <Zap size={20} />,       cor: "#29c5f6" },
              { nome: "TypeScript",    sub: "Tipagem estática",    icon: <Cpu size={20} />,        cor: "#29c5f6" },
              { nome: "Tailwind CSS",  sub: "Estilização",         icon: <Globe size={20} />,      cor: "#29c5f6" },
              { nome: "NASA API",      sub: "Dados orbitais",      icon: <Satellite size={20} />,  cor: "#29c5f6" },
              { nome: "Java",          sub: "Back-end",            icon: <Cpu size={20} />,        cor: "#e84c1c" },
              { nome: "Quarkus",       sub: "API REST",            icon: <Activity size={20} />,   cor: "#e84c1c" },
              { nome: "Oracle SQL",    sub: "Banco de dados",      icon: <Database size={20} />,   cor: "#e84c1c" },
              { nome: "Space-Track",   sub: "Rastreamento",        icon: <Navigation size={20} />, cor: "#e84c1c" },
            ].map((tech) => {
              const isCyan = tech.cor === "#29c5f6";
              return (
                <div
                  key={tech.nome}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors duration-200"
                  style={{ border: `1px solid ${isCyan ? "rgba(41,197,246,0.15)" : "rgba(232,76,28,0.15)"}`, }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: isCyan ? "rgba(41,197,246,0.1)" : "rgba(232,76,28,0.1)", color: tech.cor, }}
                  >
                    {tech.icon}
                  </div>
                  <div>
                    <p className="font-['Exo_2',sans-serif] font-bold text-[0.9rem] text-white leading-none mb-1">
                      {tech.nome}
                    </p>
                    <p className="text-[0.75rem] text-white/40">{tech.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── CRONOGRAMA ── */}
        <section className="px-24 py-14 max-[480px]:px-6 max-[480px]:py-10 min-[481px]:max-[991px]:px-8 min-[481px]:max-[991px]:py-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="font-['Exo_2',sans-serif] font-bold mb-8 text-[1.375rem] min-[992px]:text-[1.75rem]">
            Nosso cronograma
          </p>

          {[
            { src: "", alt: "Cronograma fase 1" },
            { src: "", alt: "Cronograma fase 2" },
          ].map((img, i) =>
            img.src ? (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                className="max-w-[43.75rem] w-full h-auto block mx-auto my-5 rounded-xl opacity-90"
                style={{ border: "1px solid rgba(41,197,246,0.12)" }}
              />
            ) : (
              <div
                key={i}
                className="max-w-[43.75rem] w-full mx-auto my-5 rounded-xl flex items-center justify-center h-40"
                style={{ border: "1px dashed rgba(41,197,246,0.2)", backgroundColor: "rgba(41,197,246,0.03)" }}
              >
              </div>
            )
          )}
        </section>

        <br />
      </main>

      <div className="hidden min-[992px]:block">
        <Footer />
      </div>
    </div>
  );
}

export default Sobre;