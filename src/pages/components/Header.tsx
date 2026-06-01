import { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import logo from "../../assets/logo.png"

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#06090f] h-14 min-[992px]:h-24 flex items-center relative"
      style={{ borderBottom: "1px solid rgba(41,197,246,0.12)" }}>
        
      {/* Logo */}
      <div className="px-4 md:px-6 [@media(min-width:992px)]:px-6">
        <Link to="/" className="text-[#29c5f6] no-underline">
            <h1 className="flex items-center gap-2 whitespace-nowrap text-2xl [@media(min-width:992px)]:text-[1.875rem] font-bold tracking-[0.08em] m-0">
                <img src={logo} alt="Orbital" className="w-8 h-8 [@media(min-width:992px)]:w-12 [@media(min-width:992px)]:h-12 object-contain"/>
            ORBITAL
            </h1>
        </Link>
      </div>

      {/* Botão hamburger (mobile + tablet) */}
      <button
        onClick={() => setOpen(!open)} aria-label="Abrir menu" className=" flex items-center bg-transparent border-none text-white ml-auto mr-4 md:mr-6 cursor-pointer [@media(min-width:992px)]:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-7 h-7 md:w-9 md:h-9">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Nav desktop (992px+) */}
      <div className="hidden [@media(min-width:992px)]:flex flex-1">
        <Menu open={open} />
      </div>

      {/* Drawer mobile/tablet (até 991px) */}
      <div
        className={`[@media(min-width:992px)]:hidden absolute top-full left-0 w-full z-50 transition-all duration-300
          ${open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
          }
        `}
      >
        <Menu open={open} />
      </div>
    </header>
  );
}

export default Header;