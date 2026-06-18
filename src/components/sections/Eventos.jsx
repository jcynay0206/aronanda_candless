import WaxDivider from "../WaxDivider";
import { IconWhatsApp } from "../Icons";
import { WHATSAPP_LINK } from "../../data/content";

const EVENTOS = [
  {
    nombre: "Bodas",
    texto: "Velas personalizadas con el nombre de la pareja y la fecha, como recuerdo para cada mesa.",
    img: "https://placehold.co/700x500/4A3324/F8F2E9?font=playfair-display&text=Bodas",
  },
  {
    nombre: "Bautizos",
    texto: "Mini velas con etiqueta personalizada — un detalle dulce para acompañar ese día tan especial.",
    img: "https://placehold.co/700x500/B85C38/F8F2E9?font=playfair-display&text=Bautizos",
  },
  {
    nombre: "Quinceañeras",
    texto: "Sets a juego con la paleta de colores de la fiesta, para regalar a las damas y chambelanes.",
    img: "https://placehold.co/700x500/C49080/2A1A0E?font=playfair-display&text=Quincea%C3%B1eras",
  },
];

export default function Eventos() {
  return (
    <section id="eventos" className="bg-espresso text-marfil py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14 md:mb-20">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-oro-soft mb-5">
            Eventos especiales
          </p>
          <h2 className="font-display font-light text-4xl sm:text-5xl md:text-6xl leading-tight mb-6">
            El recuerdo que se llevan a casa
          </h2>
          <WaxDivider tone="marfil" className="max-w-[140px] mb-6" />
          <p className="font-sans font-light text-marfil/70 text-base md:text-lg leading-relaxed">
            Diseñamos detalles a la medida para bodas, bautizos y
            quinceañeras — el aroma que tus invitados recordarán cada vez que
            vuelvan a encenderlo.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
          {EVENTOS.map((e) => (
            <div key={e.nombre} className="group">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-sm mb-5">
                <img
                  src={e.img}
                  alt={e.nombre}
                  className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-aronanda)] group-hover:scale-105"
                />
              </div>
              <h3 className="font-display font-light text-2xl mb-2">{e.nombre}</h3>
              <p className="font-sans font-light text-sm text-marfil/65 leading-relaxed mb-5">
                {e.texto}
              </p>
              <a
                href={WHATSAPP_LINK(
                  `Hola, me gustaría solicitar una cotización para velas personalizadas de ${e.nombre.toLowerCase()} 🕯️`
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.25em] uppercase border border-oro/50 rounded-full px-5 py-2.5 hover:bg-oro hover:text-espresso hover:border-oro transition-colors duration-300"
              >
                <IconWhatsApp className="w-4 h-4" />
                Solicitar cotización
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
