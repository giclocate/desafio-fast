import { BarChart3, LayoutDashboard, Menu, Users, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/fast-logo.svg";

const sideItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Colaboradores', to: '/colaboradores', icon: Users },
  { label: 'Workshops', to: '/workshops', icon: BarChart3 },
]

export function Sidebar() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-64 flex-col border-r border-[#123047] bg-[#001426] p-5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="logo" width={30} height={31}/>

          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-wide text-[#00D1F2]">
              FAST Soluções
            </span>

            <span className="block text-xs text-slate-400">
              Painel de Workshops
            </span>
          </span>
        </Link>

        {/* Navegação */}
        <div className="mt-8 flex-1">
          <p className="mb-3 px-3 text-[0.7rem] font-semibold uppercase tracking-widest text-slate-500">
            Navegação
          </p>

          <nav className="flex flex-col gap-1">
            {sideItems.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#2564FD]/15 text-[#00D1F2] ring-1 ring-[#2564FD]/40"
                      : "text-slate-400 hover:bg-[#0A2538] hover:text-white"
                  }`
                }
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Rodapé */}
        <p className="px-3 text-xs text-slate-500">
          Ciclo de workshops trimestrais · Analytics interno
        </p>
      </aside>

      {/* Sidebar Mobile */}
      <div className="lg:hidden">
        <header className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-[#123047] bg-[#001426]/95 px-4 py-3 backdrop-blur">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <span className="grid size-9 place-items-center rounded-lg bg-[#2564FD] text-sm font-bold text-white">
              FS
            </span>

            <span className="leading-tight">
              <span className="block text-sm font-semibold tracking-wide text-[#00D1F2]">
                FAST Soluções
              </span>

              <span className="block text-xs text-slate-400">
                Painel de Workshops
              </span>
            </span>
          </Link>

          {/* Botão */}
          <button
            type="button"
            aria-label={
              menuAberto
                ? "Fechar navegação"
                : "Abrir navegação"
            }
            aria-expanded={menuAberto}
            onClick={() => setMenuAberto(!menuAberto)}
            className="grid size-10 place-items-center rounded-lg border border-[#123047] text-white transition-colors hover:bg-[#0A2538]"
          >
            {menuAberto ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </header>

        {/* Menu Mobile */}
        {menuAberto && (
          <div className="border-b border-[#123047] bg-[#001426] px-4 py-3">
            <nav className="flex flex-col gap-1">
              {sideItems.map(({ label, to, icon: Icon }) => (
                <NavLink
                  key={label}
                  to={to}
                  onClick={() => setMenuAberto(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#2564FD]/15 text-[#00D1F2] ring-1 ring-[#2564FD]/40"
                        : "text-slate-400 hover:bg-[#0A2538] hover:text-white"
                    }`
                  }
                >
                  <Icon className="size-4 shrink-0" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
}