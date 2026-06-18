import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconBag, IconClose, IconMenu, IconWhatsApp } from "./Icons";
import { WHATSAPP_LINK } from "../data/content";
import { useCart } from "../context/CartContext";

const LINKS = [
  { href: "/#historia", label: "Historia" },
  { href: "/#colecciones", label: "Colecciones" },
  { href: "/tienda", label: "Tienda" },
  { href: "/#eventos", label: "Eventos" },
  { href: "/#proceso", label: "Proceso" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const dark = scrolled || open || !isHome;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        dark ? "bg-marfil/90 backdrop-blur-sm shadow-[0_1px_0_0_rgba(42,26,14,0.08)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <Link
          to="/"
          className={`font-display text-2xl md:text-3xl tracking-[0.2em] transition-colors duration-500 ${
            dark ? "text-espresso" : "text-marfil"
          }`}
        >
          ARONANDA
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`text-sm font-light tracking-wide transition-colors duration-500 hover:text-oro ${
                dark ? "text-espresso" : "text-marfil"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href={WHATSAPP_LINK("Hola, me gustaría conocer más sobre las velas Aronanda ✨")}
            target="_blank"
            rel="noreferrer"
            className={`hidden sm:inline-flex items-center gap-2 text-sm font-light tracking-wide border rounded-full px-5 py-2 transition-colors duration-500 hover:bg-oro hover:text-espresso hover:border-oro ${
              dark ? "border-espresso/30 text-espresso" : "border-marfil/40 text-marfil"
            }`}
          >
            <IconWhatsApp className="w-4 h-4" />
            WhatsApp
          </a>

          <Link
            to="/carrito"
            aria-label="Carrito"
            className={`relative p-2 transition-colors duration-500 ${dark ? "text-espresso" : "text-marfil"}`}
          >
            <IconBag className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-[18px] min-w-[18px] px-1 rounded-full bg-oro text-espresso text-[10px] font-sans flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className={`md:hidden p-2 -mr-2 transition-colors duration-500 ${dark ? "text-espresso" : "text-marfil"}`}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden bg-marfil border-t border-espresso/10 px-6 py-6 flex flex-col gap-5">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setOpen(false)}
              className="text-espresso font-light text-base tracking-wide"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={WHATSAPP_LINK("Hola, me gustaría conocer más sobre las velas Aronanda ✨")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-light tracking-wide border border-espresso/30 rounded-full px-5 py-2 w-fit text-espresso"
          >
            <IconWhatsApp className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
