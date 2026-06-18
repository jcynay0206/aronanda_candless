import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ACCENT_CLASS } from "../../data/content";
import { getBestsellers } from "../../data/products";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../context/CartContext";
import WaxDivider from "../WaxDivider";
import { IconArrow, IconBag } from "../Icons";

export default function Bestsellers() {
  const trackRef = useRef(null);
  const { addItem } = useCart();
  const { products, loading } = useProducts();
  const [added, setAdded] = useState(null);

  const bestsellers = getBestsellers(products);

  const scrollBy = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  const handleAdd = (p) => {
    addItem(p, p.tamanos[0], 1);
    setAdded(p.id);
    setTimeout(() => setAdded((cur) => (cur === p.id ? null : cur)), 1500);
  };

  return (
    <section id="bestsellers" className="bg-marfil py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div className="max-w-xl">
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-oro mb-5">
              Bestsellers
            </p>
            <h2 className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-espresso leading-tight mb-6">
              Las favoritas de la casa
            </h2>
            <WaxDivider tone="oro" className="max-w-[140px]" />
          </div>

          <div className="hidden md:flex gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Anterior"
              className="h-12 w-12 rounded-full border border-espresso/20 flex items-center justify-center hover:border-oro hover:text-oro transition-colors duration-300"
            >
              <IconArrow className="w-4 h-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Siguiente"
              className="h-12 w-12 rounded-full border border-espresso/20 flex items-center justify-center hover:border-oro hover:text-oro transition-colors duration-300"
            >
              <IconArrow className="w-4 h-4" />
            </button>
          </div>
        </div>

        {loading && <p className="font-sans text-sm text-espresso/50">Cargando…</p>}

        {!loading && bestsellers.length === 0 && (
          <p className="font-sans text-sm text-espresso/50">
            Pronto verás aquí nuestras velas más queridas.
          </p>
        )}

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto scrollbar-hidden snap-x snap-mandatory pb-4 -mx-6 px-6 md:mx-0 md:px-0"
        >
          {bestsellers.map((p) => (
            <article
              key={p.id}
              className="snap-start shrink-0 w-[78%] xs:w-[60%] sm:w-[42%] md:w-[31%] lg:w-[23%]"
            >
              <Link to={`/producto/${p.slug}`} className="block">
                <div className="aspect-square w-full overflow-hidden rounded-sm mb-4 bg-arena">
                  {p.img?.[0] && (
                    <img
                      src={p.img[0]}
                      alt={p.nombre}
                      className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-aronanda)] hover:scale-105"
                    />
                  )}
                </div>
                <p className={`font-sans text-[11px] tracking-[0.3em] uppercase mb-2 ${ACCENT_CLASS(p.coleccionId)}`}>
                  {p.coleccion}
                </p>
                <h3 className="font-display font-light text-2xl text-espresso mb-1">
                  {p.nombre}
                </h3>
              </Link>
              <p className="font-sans font-light text-sm text-espresso/65 mb-4 leading-relaxed">
                {p.descripcionCorta}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl text-oro">${p.tamanos?.[0]?.precio}</span>
                <button
                  type="button"
                  onClick={() => handleAdd(p)}
                  className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.25em] uppercase text-espresso border border-espresso/20 rounded-full px-4 py-2.5 hover:bg-espresso hover:text-marfil hover:border-espresso transition-colors duration-300"
                >
                  <IconBag className="w-4 h-4" />
                  {added === p.id ? "Añadido" : "Añadir"}
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <Link
            to="/tienda"
            className="inline-flex items-center gap-3 font-sans text-sm tracking-[0.25em] uppercase text-espresso border-b border-oro pb-1 hover:text-oro transition-colors duration-300"
          >
            Ver toda la tienda
            <IconArrow className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
