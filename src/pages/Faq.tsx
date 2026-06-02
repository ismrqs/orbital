import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const faqs = [
  {
    question: "O que é a plataforma ORBITAL?",
    answer:
      "A ORBITAL é uma plataforma de gestão de risco orbital desenvolvida por estudantes da FIAP. Ela monitora satélites e detritos espaciais em tempo real usando dados oficiais da NASA e Space-Track, utiliza inteligência artificial para prever colisões e recomenda manobras de desvio para proteger ativos orbitais.",
  },
  {
    question: "Quem se beneficia com a ORBITAL?",
    answer:
      "Operadores de satélites, agências espaciais e organizações que precisam monitorar seus ativos em órbita. A plataforma centraliza dados e alertas em um único painel operacional, facilitando a tomada de decisão rápida e segura antes que riscos se tornem colisões reais.",
  },
  {
    question: "De onde vêm os dados utilizados pela plataforma?",
    answer:
      "Os dados são obtidos diretamente da NASA e do Space-Track, as principais fontes oficiais de rastreamento orbital global. Isso garante informações precisas e atualizadas sobre a posição e trajetória de mais de 27.000 objetos catalogados em órbita.",
  },
  {
    question: "Como a IA classifica os riscos de colisão?",
    answer:
      "O sistema analisa as trajetórias dos objetos rastreados e calcula a probabilidade de aproximação perigosa. Com base nesses dados, a IA classifica o nível de risco em categorias e sugere automaticamente as manobras de desvio mais eficientes em termos de consumo de combustível e segurança.",
  },
  {
    question: "A plataforma é apenas tecnológica ou tem impacto real?",
    answer:
      "Vai além da tecnologia. O objetivo central é contribuir para a sustentabilidade do espaço orbital — evitando a criação de novos detritos e preservando faixas orbitais para as próximas gerações. A tecnologia é o meio; a segurança espacial é o fim.",
  },
  {
    question: "Por que o problema de lixo orbital é urgente?",
    answer:
      "Com mais de 27.000 objetos rastreados e 3.200 novos satélites previstos até 2030, o risco de colisões em cascata — o chamado Síndrome de Kessler — cresce rapidamente. Uma única colisão pode gerar milhares de fragmentos e inutilizar faixas orbitais inteiras por décadas, comprometendo GPS, telecomunicações e exploração espacial.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="font-['Roboto',sans-serif] text-white flex flex-col min-h-screen bg-[#06090f]">
      <Header/>

      <main className="flex-1 pb-16">

        {/* ── TÍTULO ── */}
        <section className="px-24 py-14 max-[480px]:px-6 max-[480px]:py-10 min-[481px]:max-[991px]:px-8 min-[481px]:max-[991px]:py-10"
          style={{ borderBottom: "1px solid rgba(41,197,246,0.1)" }}
        >

          <h1 className="font-['Exo_2',sans-serif] font-bold leading-tight mb-3 text-[2.5rem] max-[480px]:text-[1.8rem] min-[481px]:max-[991px]:text-[2rem]">
            Perguntas <span className="text-[#29c5f6]">Frequentes</span>
          </h1>
          <p className="text-white/50 text-[0.95rem] max-w-[32rem]">
            Tudo o que você precisa saber sobre a plataforma ORBITAL e o problema que ela resolve.
          </p>
        </section>

        {/* ── ACCORDION ── */}
        <div className="max-w-[48rem] mx-auto mt-10 flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl overflow-hidden transition-all duration-200
                  ${isOpen
                    ? "shadow-[0_4px_24px_rgba(41,197,246,0.1)]" : "hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)]"
                  }`}
                style={{ backgroundColor: isOpen ? "rgba(41,197,246,0.05)" : "rgba(255,255,255,0.03)", 
                    border: isOpen
                    ? "1px solid rgba(41,197,246,0.35)" : "1px solid rgba(255,255,255,0.08)", }}
              >
                <button onClick={() => toggle(index)}
                  className="w-full bg-transparent border-none cursor-pointer text-left flex justify-between items-center gap-4 px-6 py-5 text-[0.95rem] md:text-[1rem] font-bold transition-colors duration-200 font-['Exo_2',sans-serif]"
                  style={{ color: isOpen ? "#29c5f6" : "rgba(255,255,255,0.9)" }}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                    style={{ color: "#29c5f6" }}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-[350ms] ease-in-out ${isOpen ? "max-h-[20rem]" : "max-h-0"}`}
                >
                  <div className="px-6 pb-6">
                    <p
                      className="text-[0.95rem] leading-[1.8] pt-4 m-0 font-['Roboto',sans-serif]"
                      style={{ color: "rgba(255,255,255,0.6)", borderTop: "1px solid rgba(41,197,246,0.12)", }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <div className="hidden min-[992px]:block">
        <Footer/>
      </div>
    </div>
  );
}

export default FAQ;