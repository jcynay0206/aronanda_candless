import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IconArrow } from "../components/Icons";

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-marfil flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-espresso text-marfil md:w-64 shrink-0 flex flex-col">
        <div className="px-6 py-6 border-b border-marfil/10">
          <Link to="/admin" className="font-display text-2xl tracking-[0.2em]">
            ARONANDA
          </Link>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-oro-soft mt-1">
            Panel de administración
          </p>
        </div>

        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `font-sans text-sm rounded-sm px-4 py-2.5 transition-colors ${
                isActive ? "bg-oro/15 text-oro-soft" : "text-marfil/70 hover:text-marfil hover:bg-marfil/5"
              }`
            }
          >
            Productos
          </NavLink>
          <NavLink
            to="/admin/productos/nuevo"
            className={({ isActive }) =>
              `font-sans text-sm rounded-sm px-4 py-2.5 transition-colors ${
                isActive ? "bg-oro/15 text-oro-soft" : "text-marfil/70 hover:text-marfil hover:bg-marfil/5"
              }`
            }
          >
            Nuevo producto
          </NavLink>
        </nav>

        <div className="px-4 py-6 border-t border-marfil/10 space-y-3">
          <Link
            to="/"
            className="flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-marfil/60 hover:text-oro-soft transition-colors px-4"
          >
            <IconArrow className="w-3.5 h-3.5 rotate-180" />
            Ver tienda
          </Link>
          {user && (
            <p className="font-sans text-xs text-marfil/40 px-4 truncate">{user.email}</p>
          )}
          <button
            type="button"
            onClick={() => logout()}
            className="w-full font-sans text-xs tracking-[0.2em] uppercase text-marfil/60 hover:text-terracota transition-colors px-4 py-2 text-left"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido */}
      <div className="flex-1 px-6 md:px-10 py-8 md:py-12 max-w-6xl">
        <Outlet />
      </div>
    </div>
  );
}
