import { useState } from "react";
import { IconInstagram, IconWhatsApp } from "./Icons";
import { WHATSAPP_LINK } from "../data/content";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // TODO: conectar con Brevo (lista de newsletter de Aronanda)
    setEnviado(true);
    setEmail("");
  };

  return (
    <footer className="bg-espresso text-marfil pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-marfil/10">
          <div className="md:col-span-4">
            <a href="#" className="font-display text-3xl tracking-[0.2em] block mb-4">
              ARONANDA
            </a>
            <p className="font-sans font-light text-sm text-marfil/60 leading-relaxed max-w-xs">
              Velas artesanales hechas a mano en Elizabeth, NJ. El aroma que
              llena la habitación antes de que enciendan la luz.
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-sans text-xs tracking-[0.3em] uppercase text-oro-soft mb-5">
              Tienda
            </h4>
            <ul className="space-y-3 font-sans font-light text-sm text-marfil/70">
              <li><a href="#colecciones" className="hover:text-marfil transition-colors">Línea Latina</a></li>
              <li><a href="#colecciones" className="hover:text-marfil transition-colors">Línea Wellness</a></li>
              <li><a href="#colecciones" className="hover:text-marfil transition-colors">Línea Espiritual</a></li>
              <li><a href="#colecciones" className="hover:text-marfil transition-colors">Línea Eventos</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-sans text-xs tracking-[0.3em] uppercase text-oro-soft mb-5">
              Marca
            </h4>
            <ul className="space-y-3 font-sans font-light text-sm text-marfil/70">
              <li><a href="#historia" className="hover:text-marfil transition-colors">Nuestra historia</a></li>
              <li><a href="#proceso" className="hover:text-marfil transition-colors">Proceso artesanal</a></li>
              <li><a href="#eventos" className="hover:text-marfil transition-colors">Eventos especiales</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-sans text-xs tracking-[0.3em] uppercase text-oro-soft mb-5">
              Únete a la lista
            </h4>
            <p className="font-sans font-light text-sm text-marfil/60 mb-4 max-w-xs">
              Aromas nuevos, ofertas y novedades de Aronanda directo a tu correo.
            </p>
            {enviado ? (
              <p className="font-sans text-sm text-oro-soft">
                ¡Gracias! Ya estás en la lista. 🕯️
              </p>
            ) : (
              <form onSubmit={onSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="flex-1 min-w-0 bg-transparent border border-marfil/25 rounded-full px-4 py-2.5 text-sm font-sans font-light placeholder:text-marfil/40 focus:outline-none focus:border-oro"
                />
                <button
                  type="submit"
                  className="shrink-0 font-sans text-xs tracking-[0.2em] uppercase border border-oro/60 rounded-full px-5 py-2.5 hover:bg-oro hover:text-espresso hover:border-oro transition-colors duration-300"
                >
                  Unirme
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-sans font-light text-xs text-marfil/40 order-2 sm:order-1">
            © {new Date().getFullYear()} Aronanda Candles · Elizabeth, NJ
          </p>

          <div className="flex items-center gap-4 order-1 sm:order-2">
            <a
              href="https://instagram.com/aronandacandles"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de Aronanda"
              className="h-10 w-10 rounded-full border border-marfil/20 flex items-center justify-center hover:border-oro hover:text-oro transition-colors duration-300"
            >
              <IconInstagram className="w-4 h-4" />
            </a>
            <a
              href={WHATSAPP_LINK("Hola, me gustaría conocer más sobre las velas Aronanda ✨")}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp de Aronanda"
              className="h-10 w-10 rounded-full border border-marfil/20 flex items-center justify-center hover:border-oro hover:text-oro transition-colors duration-300"
            >
              <IconWhatsApp className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
