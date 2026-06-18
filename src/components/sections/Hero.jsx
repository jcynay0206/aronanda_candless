import WaxDivider from "../WaxDivider";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-espresso">
      {/* Imagen de fondo (placeholder — reemplazar por foto cinemática real) */}
      <img
        src="https://placehold.co/1920x1080/2A1A0E/4A3324?font=playfair-display&text=Foto+cinem%C3%A1tica+%E2%80%94+luz+de+vela"
        alt="Vela Aronanda encendida en una mesa de madera, luz cálida"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      {/* Degradado para legibilidad — tonos cálidos, sin filtros fríos */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-espresso/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/40 via-transparent to-espresso/40" />

      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-end pb-24 md:pb-28">
        <p className="font-sans text-[11px] md:text-xs tracking-[0.4em] uppercase text-oro-soft mb-6">
          Candles · Handcrafted · Elizabeth, NJ
        </p>

        <h1 className="font-display font-light text-marfil leading-[0.95] text-[18vw] sm:text-7xl md:text-8xl lg:text-9xl tracking-tight">
          Aronanda
        </h1>

        <WaxDivider tone="oro" className="max-w-[180px] mt-6 mb-6" />

        <p className="font-display italic font-light text-marfil/90 text-xl sm:text-2xl md:text-3xl max-w-2xl leading-snug">
          “Cada vela nace de manos que conocen el calor del hogar. Aronanda es
          el aroma que llena la habitación antes de que enciendan la luz.”
        </p>

        <div className="mt-10">
          <a
            href="#colecciones"
            className="group inline-flex items-center gap-3 font-sans text-sm tracking-[0.25em] uppercase text-marfil border border-oro/60 rounded-full px-8 py-4 transition-colors duration-500 hover:bg-oro hover:text-espresso hover:border-oro"
          >
            Explorar colección
            <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 right-6 md:right-10 hidden sm:flex flex-col items-center gap-3">
        <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-marfil/60 [writing-mode:vertical-rl]">
          Descubre
        </span>
        <span className="block h-12 w-px bg-marfil/30" />
      </div>
    </section>
  );
}
