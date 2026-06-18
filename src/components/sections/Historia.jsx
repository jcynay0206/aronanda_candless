import WaxDivider from "../WaxDivider";

export default function Historia() {
  return (
    <section id="historia" className="bg-marfil py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="order-2 md:order-1">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-oro mb-5">
            Nuestra historia
          </p>
          <h2 className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-espresso leading-tight mb-6">
            Hecho a mano,
            <br />
            con raíces en Elizabeth
          </h2>

          <WaxDivider tone="oro" className="max-w-[140px] mb-6" />

          <div className="space-y-5 font-sans font-light text-espresso/80 text-base md:text-lg leading-relaxed max-w-xl">
            <p>
              Aronanda nació en una cocina de Elizabeth, NJ, mezclando cera y
              recuerdos. El nombre une a las personas que más queremos —
              porque cada vela que sale de aquí lleva un poco de familia
              adentro.
            </p>
            <p className="font-display italic text-xl md:text-2xl text-espresso">
              “Cada vela sale de nuestras manos con la misma intención con la
              que entró.”
            </p>
            <p>
              Somos una marca artesanal hispana que cree en el equilibrio
              entre el calor latino y una presentación que se siente premium,
              sin perder el alma. Cada lote es pequeño, cada fragancia está
              pensada para evocar un momento — y cada pedido se prepara como
              si fuera para alguien de la familia.
            </p>
          </div>

          <a
            href="#proceso"
            className="inline-block mt-8 font-sans text-sm tracking-[0.25em] uppercase text-espresso border-b border-oro pb-1 hover:text-oro transition-colors duration-300"
          >
            Conoce nuestro proceso
          </a>
        </div>

        <div className="order-1 md:order-2 relative">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-sm">
            <img
              src="https://placehold.co/900x1125/EDE5D8/2A1A0E?font=playfair-display&text=Manos+sosteniendo+una+vela"
              alt="Manos sosteniendo una vela Aronanda recién hecha, luz natural cálida"
              className="h-full w-full object-cover"
            />
          </div>
          {/* Acento de marca */}
          <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center justify-center bg-espresso text-marfil rounded-full h-28 w-28 text-center px-4">
            <span className="font-display italic text-sm leading-snug">
              Desde Elizabeth, NJ con amor
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
