import Header from "./components/Header";
import Footer from "./components/Footer";

const integrantes = [
  {
    id: "isabely",
    nome: "Isabely Marques",
    foto: "https://i.pinimg.com/736x/f1/3e/1e/f13e1e9a57c27b6a3e74b588b0f72cb0.jpg",
    linkedin: "https://www.linkedin.com/in/isabely-marques/",
    linkedinNome: "Isabely Marques",
    github: "https://github.com/ismrqs",
    githubNome: "ismrqs",
    rm: "566663",
    turma: "1TDSPR",
    role: "Front-end & Banco de Dados",
    bio: "Responsável pela estruturação, modelagem e implementação do banco de dados da plataforma, garantindo organização, integridade e eficiência no armazenamento das informações. Também atuou no desenvolvimento front-end com React e TypeScript, contribuindo para interfaces funcionais.",
  },
  {
    id: "mateus",
    nome: "Mateus Ribeiro",
    foto: "https://i.pinimg.com/736x/f6/ee/99/f6ee992e638eb7723a079fb9858f19eb.jpg",
    linkedin: "https://www.linkedin.com/in/mateus-ribeiro-azevedo-a39a13269",
    linkedinNome: "Mateus Ribeiro Azevedo",
    github: "https://github.com/mateus-ribeiro-dev",
    githubNome: "mateus-ribeiro-dev",
    rm: "566630",
    turma: "1TDSPR",
    role: "Back-end & APIs",
    bio: "Responsável pelo desenvolvimento back-end da plataforma, construindo as APIs REST em Java com Spring Boot. Implementou os endpoints de monitoramento e alertas, garantindo comunicação eficiente entre o front-end e as fontes de dados da NASA e Space-Track.",
  },
  {
    id: "luana",
    nome: "Luana Oliveira",
    foto: "https://i.pinimg.com/736x/69/b9/83/69b9838e7332d7bd2b1862086f7fa1d0.jpg",
    linkedin: "https://www.linkedin.com/in/luana-oliveira-83a3b1289/",
    linkedinNome: "Luana Oliveira",
    github: "https://github.com/Moonnax",
    githubNome: "Moonnax",
    rm: "566621",
    turma: "1TDSPR",
    role: "IA & Design",
    bio: "Liderou o planejamento estratégico e a identidade visual da plataforma. Responsável pelo modelo de inteligência artificial para classificação de riscos orbitais e pelo layout base do front-end, definindo a experiência do usuário da plataforma.",
  },
];

function QuemSomos() {
  return (
    <div className="font-['Roboto',sans-serif] text-white flex flex-col min-h-screen bg-[#06090f]">
      <Header />

      <main className="flex-1">

        {/* ── TÍTULO ── */}
        <div
          className="
            px-24 py-14
            max-[480px]:px-6 max-[480px]:py-10
            min-[481px]:max-[991px]:px-8 min-[481px]:max-[991px]:py-10
          "
          style={{ borderBottom: "1px solid rgba(41,197,246,0.1)" }}
        >
          <h1 className="
            font-['Exo_2',sans-serif] font-bold leading-tight mb-3
            text-[2.5rem]
            max-[480px]:text-[1.8rem]
            min-[481px]:max-[991px]:text-[2rem]
          ">
            Nossos <span className="text-[#29c5f6]">integrantes</span>
          </h1>
          <p className="text-white/50 text-[0.95rem] max-w-[32rem]">
            Conheça os estudantes por trás da plataforma ORBITAL.
          </p>
        </div>

        {/* ── CARDS ── */}
        <div className="
          flex flex-col gap-5
          px-24 py-14
          max-[480px]:px-6 max-[480px]:py-10
          min-[481px]:max-[991px]:px-8 min-[481px]:max-[991px]:py-10
        ">
          {integrantes.map((i) => (
            <div
              key={i.id}
              className="
                flex flex-col items-center text-center gap-6
                min-[992px]:flex-row min-[992px]:items-start min-[992px]:text-left min-[992px]:gap-10
                p-7 rounded-2xl bg-white/[0.03]
              "
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* foto */}
              <img
                src={i.foto}
                alt={`foto ${i.nome}`}
                className="w-[9rem] h-[9rem] object-cover rounded-xl flex-shrink-0"
              />

              {/* info */}
              <div className="flex flex-col gap-3 w-full">
                <div>
                  <span
                    className="
                      inline-block mb-2
                      text-[0.68rem] font-['Exo_2',sans-serif] font-semibold tracking-[0.12em] uppercase
                      px-3 py-1 rounded-full
                    "
                    style={{
                      color: "#29c5f6",
                      backgroundColor: "rgba(41,197,246,0.08)",
                      border: "1px solid rgba(41,197,246,0.2)",
                    }}
                  >
                    {i.role}
                  </span>
                  <p className="font-['Exo_2',sans-serif] font-bold text-[1.15rem] text-white">
                    {i.nome}
                  </p>
                  <p className="text-white/40 text-[0.82rem]">RM: {i.rm} · {i.turma}</p>
                </div>

                <p className="text-[0.9rem] text-white/60 leading-[1.8]">{i.bio}</p>

                <div className="flex items-center gap-6 justify-center min-[992px]:justify-start flex-wrap">
                  <a
                    href={i.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="no-underline text-[0.85rem] font-semibold font-['Exo_2',sans-serif] transition-colors duration-200 hover:text-[#29c5f6]"
                    style={{ color: "rgba(41,197,246,0.7)" }}
                  >
                    LinkedIn — {i.linkedinNome}
                  </a>
                  <a
                    href={i.github}
                    target="_blank"
                    rel="noreferrer"
                    className="no-underline text-[0.85rem] font-semibold font-['Exo_2',sans-serif] transition-colors duration-200 hover:text-[#29c5f6]"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    GitHub — {i.githubNome}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      <div className="hidden min-[992px]:block">
        <Footer />
      </div>
    </div>
  );
}

export default QuemSomos;