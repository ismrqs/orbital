
function Footer() {
  return (
    <footer className="bg-[#06090f] text-white text-center px-4 py-4" style={{ borderTop: "1px solid rgba(41,197,246,0.1)" }}>
      <h2 className="mb-3 font-bold text-lg text-[#29c5f6] tracking-[0.1em]">
        ORBITAL
      </h2>
      <p className="italic mb-4 text-white/50">
        "Operações espaciais mais seguras e rápidas."
      </p>
      <p className="max-w-[30rem] mx-auto text-sm text-white/40">
        Projeto desenvolvido por alunos do Centro Universitário{" "}
        <a href="https://www.fiap.com.br/" target="_blank" rel="noopener noreferrer" className="text-[#e84c1c] no-underline hover:text-[#f26522]">
          FIAP
        </a>
      </p>

    </footer>
  );
}

export default Footer;