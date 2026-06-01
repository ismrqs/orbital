import { NavLink, Link } from "react-router-dom";

interface MenuProps {
  open: boolean;
}

function Menu({ open }: MenuProps) {

  const desktopLink = ({ isActive }: { isActive: boolean }) =>
    `text-[1rem] font-semibold whitespace-nowrap px-3 py-2 transition-all duration-200 no-underline border-b-2 font-['Exo_2',sans-serif] ${
      isActive
        ? "text-[#29c5f6] border-[#29c5f6]"
        : "text-white border-transparent hover:text-[#29c5f6] hover:border-[#29c5f6]"
    }`;

  return (
    <>
      {/* DESKTOP 992px+ */}
      <nav className="hidden [@media(min-width:992px)]:flex items-center ml-auto mr-8 w-full">
        <ul className="flex items-center gap-1 list-none m-0 p-0">
          <li><NavLink to="/" end className={desktopLink}>Home</NavLink></li>
          <li><NavLink to="/sobre" className={desktopLink}>Sobre</NavLink></li>
          <li><NavLink to="/faq" className={desktopLink}>FAQ</NavLink></li>
          <li><NavLink to="/integrantes" className={desktopLink}>Integrantes</NavLink></li>
          <li><NavLink to="/contato" className={desktopLink}>Contato</NavLink></li>
        </ul>

        <div className="flex items-center gap-3 ml-auto">
          <Link to="/"
            className="text-white bg-[#29c5f6] px-5 py-2 rounded-[6px] text-[0.95rem] font-semibold no-underline transition-all duration-200 hover:bg-[#1fa8d4] font-['Exo_2',sans-serif]"
          > Entrar </Link>
          <Link to="/"
            className="text-white bg-[#e84c1c] px-5 py-2 rounded-[6px] text-[0.95rem] font-semibold no-underline transition-all duration-200 hover:bg-[#c73d14] font-['Exo_2',sans-serif]"
          > Cadastrar </Link>
        </div>
      </nav>

      {/* MOBILE e TABLET (até 991px) */}
      <nav
        className={`[@media(min-width:992px)]:hidden absolute top-full left-0 right-0 w-full z-50 bg-[#06090f]
        border-t border-[#29c5f6]/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden
          ${open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
          }
        `}
      >

        <div className="px-6 py-4 border-t border-[#ffffff10]">
          <p className="text-[#ffffff40] text-xs text-right font-['Exo_2',sans-serif]">
            ORBITAL — AETHER SYSTEMS
          </p>
        </div>
      </nav>
    </>
  );
}

export default Menu;