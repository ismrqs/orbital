interface TitlePageProps {
  badge?: string;
  badgeColor?: string;
  titulo: string;
  tituloDestaque?: string;
  destaqueColor?: string;
  subtitulo?: string;
  acoes?: React.ReactNode;
  filtros?: React.ReactNode;
  backButton?: React.ReactNode;
  className?: string;
}

function TitlePage({
  badge,
  badgeColor = "#29c5f6",
  titulo,
  tituloDestaque,
  destaqueColor = "#29c5f6",
  subtitulo,
  acoes,
  filtros,
  backButton,
  className = "",
}: TitlePageProps) {
  return (
    <section
      className={`px-24 py-14 max-[480px]:px-6 max-[480px]:py-10 min-[481px]:max-[991px]:px-8 min-[481px]:max-[991px]:py-10 ${className}`}
      style={{ borderBottom: "1px solid rgba(41,197,246,0.1)" }}
    >
      {/* botão de voltar */}
      {backButton && <div className="mb-6">{backButton}</div>}

      {/* badge superior */}
      {badge && (
        <span
          className="inline-flex items-center gap-2 mb-5 text-[0.7rem] font-['Exo_2',sans-serif] font-semibold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full border"
          style={{
            color: badgeColor,
            borderColor: badgeColor + "4d",   
            backgroundColor: badgeColor + "0f", 
          }}
        >
          {badge}
        </span>
      )}

      {/* linha título + ações */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-['Exo_2',sans-serif] font-bold text-[2.5rem] max-[480px]:text-[1.8rem] mb-2 leading-tight">
            {titulo}
            {tituloDestaque && (
              <span style={{ color: destaqueColor }}>{tituloDestaque}</span>
            )}
          </h1>
          {subtitulo && (
            <p className="text-white/50 text-[0.95rem]">{subtitulo}</p>
          )}
        </div>
        {acoes && <div className="flex items-center gap-3 flex-wrap">{acoes}</div>}
      </div>

      {/* filtros / tabs */}
      {filtros && <div className="mt-6">{filtros}</div>}
    </section>
  );
}

export default TitlePage;