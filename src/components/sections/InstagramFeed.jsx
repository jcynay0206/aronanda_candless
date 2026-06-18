import { INSTAGRAM_FEED } from "../../data/content";
import { IconInstagram } from "../Icons";
import WaxDivider from "../WaxDivider";

export default function InstagramFeed() {
  return (
    <section className="bg-marfil pt-24 md:pt-36 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-oro mb-5">
            Síguenos
          </p>
          <h2 className="font-display font-light text-4xl sm:text-5xl text-espresso leading-tight mb-4">
            @aronandacandles
          </h2>
          <WaxDivider tone="oro" className="max-w-[140px] mx-auto" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
          {INSTAGRAM_FEED.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com/aronandacandles"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden rounded-sm block"
            >
              <img
                src={src}
                alt="Publicación de Instagram de Aronanda Candles"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/40 flex items-center justify-center transition-colors duration-300">
                <IconInstagram className="w-6 h-6 text-marfil opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://instagram.com/aronandacandles"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm tracking-[0.25em] uppercase text-espresso border-b border-oro pb-1 hover:text-oro transition-colors duration-300"
          >
            <IconInstagram className="w-4 h-4" />
            Síguenos en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
