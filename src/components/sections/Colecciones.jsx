import { Link } from "react-router-dom";
import { COLLECTIONS } from "../../data/content";
import WaxDivider from "../WaxDivider";
import { IconArrow } from "../Icons";

export default function Colecciones() {
  return (
    <section id="colecciones" className="bg-arena py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14 md:mb-20">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-oro mb-5">
            Colecciones
          </p>
          <h2 className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-espresso leading-tight mb-6">
            Una vela para cada momento
          </h2>
          <WaxDivider tone="oro" className="max-w-[140px]" />
        </div>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.id}
              to={`/tienda?coleccion=${c.id}`}
              className="group relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-sm block"
            >
              <img
                src={c.img}
                alt={c.nombre}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-aronanda)] group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-50 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-30"
                style={{ backgroundColor: c.color }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent" />

              <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                <h3 className="font-display font-light text-2xl md:text-3xl text-marfil mb-2">
                  {c.nombre}
                </h3>
                <p className="font-sans font-light text-sm text-marfil/80 max-w-xs mb-4">
                  {c.descripcion}
                </p>
                <span className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.3em] uppercase text-marfil border-b border-oro/0 group-hover:border-oro pb-1 w-fit transition-colors duration-300">
                  Ver colección
                  <IconArrow className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
