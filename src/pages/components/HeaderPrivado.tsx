import { NavLink, Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Bell, Satellite, Settings } from "lucide-react"; // esses icons aparecem só no nav bottom

const navItems = [
  { to: "/dashboard",     label: "Dashboard",      shortLabel: "Início",  icon: <LayoutDashboard size={22} /> },
  { to: "/alertas",       label: "Alertas",         shortLabel: "Alertas", icon: <Bell size={22} /> },
  { to: "/frota",         label: "Meus Satélites",  shortLabel: "Frota",   icon: <Satellite size={22} /> },
  { to: "/configuracoes", label: "Configurações",   shortLabel: "Config",  icon: <Settings size={22} /> },
];

function HeaderPrivado() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/");
  }

  const desktopLink = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 font-['Exo_2',sans-serif] text-[1rem] font-semibold whitespace-nowrap px-3 py-2 no-underline border-b-2 transition-all duration-200 ${
      isActive
        ? "text-[#29c5f6] border-[#29c5f6]"
        : "text-white border-transparent hover:text-[#29c5f6] hover:border-[#29c5f6]"
    }`;

  return (
    <>
      {/* tablet e desktop >992px */}
      <header
        className="h-14 min-[992px]:h-24 flex items-center relative z-50"
        style={{
          backgroundColor: "#06090f",
          borderBottom: "1px solid rgba(41,197,246,0.12)",
        }}
      >
        {/* logo do projeto */}
        <div className="px-4 md:px-6 min-[992px]:px-6 flex-shrink-0">
          <Link to="/dashboard" className="text-[#29c5f6] no-underline">
            <h1 className="flex items-center gap-[0.3rem] whitespace-nowrap text-2xl min-[992px]:text-[1.875rem] font-bold tracking-[0.08em] m-0 font-['Exo_2',sans-serif]">
              ORBITAL
            </h1>
          </Link>
        </div>

        {/* navegação para desktop */}
        <nav className="hidden min-[992px]:flex items-center flex-1 ml-auto mr-8">
          <ul className="flex items-center gap-1 list-none m-0 p-0">
            {navItems.map(item => (
              <li key={item.to}>
                <NavLink to={item.to} className={desktopLink}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="ml-auto">
            <button
              onClick={handleLogout}
              className="font-['Exo_2',sans-serif] font-bold text-[0.9rem] py-2 px-6 rounded-full border transition-all duration-200 cursor-pointer bg-transparent"
              style={{ color: "#e84c1c", borderColor: "rgba(232,76,28,0.4)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(232,76,28,0.1)")}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent")}
            >
              Sair
            </button>
          </div>
        </nav>

        {/* navegação apenas no canto inferior (nav bottom) para mobile */}
      </header>

      {/* essa parte é só em mobile <991px */}
      <nav
        className="min-[992px]:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around h-16"
        style={{
          backgroundColor: "rgba(6,9,15,0.97)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(41,197,246,0.18)",
        }}
      >
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center gap-1 no-underline transition-all duration-200 px-3 py-1"
            style={({ isActive }) => ({
              color: isActive ? "#29c5f6" : "rgba(255,255,255,0.35)",
            })}
          >
            {item.icon}
            <span className="font-['Exo_2',sans-serif] text-[0.58rem] font-semibold tracking-wider uppercase">
              {item.shortLabel}
            </span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export default HeaderPrivado;