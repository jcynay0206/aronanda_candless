import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { COLLECTIONS, ACCENT_CLASS } from "../data/content";
import { getActiveProducts } from "../data/products";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import WaxDivider from "../components/WaxDivider";
import { IconBag } from "../components/Icons";

export default function ShopPage() {
  const [params, setParams] = useSearchParams();
  const activeCollection = params.get("coleccion") ?? "todas";
  const { addItem } = useCart();
  const { products, loading, error } = useProducts();
  const [added, setAdded] = useState(null);

  const setCollection = (id) => {
    if (id === "todas") {
      params.delete("coleccion");
    } else {
      params.set("coleccion", id);
    }
    setParams(params, { replace: true });
  };

  const visibles = getActiveProducts(products);
  const productsFiltered =
    activeCollection === "todas"
      ? visibles
      : visibles.filter((p) => p.coleccionId === activeCollection);

  const handleAdd = (p) => {
    addItem(p, p.tamanos[0], 1);
    setAdded(p.id);
    setTimeout(() => setAdded((cur) => (cur === p.id ? null : cur)), 1500);
  };

  return (
    <div className="bg-marfil pt-28 md:pt-36 pb-24 md:pb-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="font-sans text-xs tracking-[0.4em] uppercase text-oro mb-5">Tienda</p>
        <h1 className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-espresso leading-tight mb-6">
          Todas las velas Aronanda
        </h1>
        <WaxDivider tone="oro" className="max-w-[140px] mb-10" />

        {/* Filtros de colección */}
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            type="button"
            onClick={() => setCollection("todas")}
            className={`font-sans text-xs tracking-[0.2em] uppercase rounded-full px-5 py-2.5 border transition-colors duration-200 ${
              activeCollection === "todas"
                ? "bg-espresso text-marfil border-espresso"
                : "border-espresso/15 text-espresso/70 hover:border-oro/60"
            }`}
          >
            Todas
          </button>
          {COLLECTIONS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCollection(c.id)}
              className={`font-sans text-xs tracking-[0.2em] uppercase rounded-full px-5 py-2.5 border transition-colors duration-200 ${
                activeCollection === c.id
                  ? "bg-espresso text-marfil border-espresso"
                  : "border-espresso/15 text-espresso/70 hover:border-oro/60"
              }`}
            >
              {c.nombre}
            </button>
          ))}
        </div>

        {loading && <p className="font-sans text-sm text-espresso/50">Cargando productos…</p>}

        {error && (
          <p className="font-sans text-sm text-terracota">
            No se pudo cargar la tienda. Inténtalo de nuevo más tarde.
          </p>
        )}

        {/* Grid de productos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {productsFiltered.map((p) => (
            <article key={p.id}>
              <Link to={`/producto/${p.slug}`} className="block group">
                <div className="aspect-square w-full overflow-hidden rounded-sm mb-3 bg-arena">
                  {p.img?.[0] && (
                    <img
                      src={p.img[0]}
                      alt={p.nombre}
                      className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-aronanda)] group-hover:scale-105"
                    />
                  )}
                </div>
                <p className={`font-sans text-[10px] tracking-[0.3em] uppercase mb-1 ${ACCENT_CLASS(p.coleccionId)}`}>
                  {p.coleccion}
                </p>
                <h3 className="font-display font-light text-xl text-espresso mb-1">{p.nombre}</h3>
              </Link>
              <p className="font-sans font-light text-xs text-espresso/55 mb-3 leading-relaxed">
                {p.descripcionCorta}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-display text-xl text-oro">${p.tamanos?.[0]?.precio}</span>
                <button
                  type="button"
                  onClick={() => handleAdd(p)}
                  aria-label={`Añadir ${p.nombre} a la bolsa`}
                  className="inline-flex items-center gap-1.5 font-sans text-[11px] tracking-[0.2em] uppercase text-espresso border border-espresso/20 rounded-full px-3 py-2 hover:bg-espresso hover:text-marfil hover:border-espresso transition-colors duration-300"
                >
                  <IconBag className="w-3.5 h-3.5" />
                  {added === p.id ? "Añadido" : "Añadir"}
                </button>
              </div>
            </article>
          ))}
        </div>

        {!loading && productsFiltered.length === 0 && (
          <p className="font-sans text-espresso/60">No hay productos en esta colección por ahora.</p>
        )}
      </div>
    </div>
  );
}
