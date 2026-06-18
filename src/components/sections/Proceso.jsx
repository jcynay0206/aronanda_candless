import { PROCESO } from "../../data/content";
import WaxDivider from "../WaxDivider";

export default function Proceso() {
  return (
    <section id="proceso" className="bg-marfil py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14 md:mb-20">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-oro mb-5">
            Proceso artesanal
          </p>
          <h2 className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-espresso leading-tight mb-6">
            De nuestras manos a tu casa
          </h2>
          <WaxDivider tone="oro" className="max-w-[140px]" />
        </div>

        <div className="grid sm:grid-cols-3 gap-x-8 gap-y-12">
          {PROCESO.map((p, i) => (
            <div key={p.paso} className="relative">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-sm mb-6">
                <img src={p.img} alt={p.titulo} className="h-full w-full object-cover" />
              </div>
              <span className="font-display italic text-oro text-lg block mb-2">{p.paso}</span>
              <h3 className="font-display font-light text-2xl text-espresso mb-3">{p.titulo}</h3>
              <p className="font-sans font-light text-sm text-espresso/65 leading-relaxed">
                {p.texto}
              </p>

              {i < PROCESO.length - 1 && (
                <div className="hidden sm:flex absolute top-[18%] -right-4 lg:-right-5 -translate-y-1/2 items-center gap-1 w-8 z-10">
                  <span className="h-px flex-1 bg-oro/60" />
                  <span className="h-2 w-2 rounded-full bg-oro shrink-0" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
