import { TESTIMONIOS } from "../../data/content";
import WaxDivider from "../WaxDivider";
import { IconStar } from "../Icons";

export default function Resenas() {
  return (
    <section className="bg-arena py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14 md:mb-20">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-oro mb-5">
            Lo que dicen de nosotros
          </p>
          <h2 className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-espresso leading-tight mb-6">
            Aromas que dejan huella
          </h2>
          <WaxDivider tone="oro" className="max-w-[140px]" />
        </div>

        <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIOS.map((t) => (
            <figure key={t.nombre} className="bg-marfil rounded-sm p-7 md:p-8 flex flex-col h-full">
              <div className="flex gap-1 text-oro mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} className="w-4 h-4" />
                ))}
              </div>
              <blockquote className="font-display italic text-lg md:text-xl text-espresso leading-relaxed flex-1 mb-6">
                “{t.texto}”
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <img
                  src={t.img}
                  alt=""
                  aria-hidden="true"
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="font-sans text-sm text-espresso">{t.nombre}</p>
                  <p className="font-sans text-xs text-espresso/50">{t.ubicacion}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
