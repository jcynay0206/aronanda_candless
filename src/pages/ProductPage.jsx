import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ACCENT_CLASS, WHATSAPP_LINK } from "../data/content";
import { getProductBySlug, getRelated } from "../data/products";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import WaxDivider from "../components/WaxDivider";
import { IconArrow, IconBag, IconWhatsApp } from "../components/Icons";

export default function ProductPage() {
  const { slug } = useParams();
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <div className="bg-marfil pt-28 md:pt-36 pb-24 min-h-screen">
        <p className="max-w-7xl mx-auto px-6 md:px-10 font-sans text-sm text-espresso/50">
          Cargando producto…
        </p>
      </div>
    );
  }

  const product = getProductBySlug(products, slug);
  if (!product) return <Navigate to="/tienda" replace />;

  return <ProductView product={product} products={products} />;
}

function ProductView({ product, products }) {
  const { addItem } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [tamano, setTamano] = useState(product.tamanos[0]);
  const [cantidad, setCantidad] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setActiveImg(0);
    setTamano(product.tamanos[0]);
    setCantidad(1);
    setAdded(false);
    window.scrollTo({ top: 0 });
  }, [product]);

  const related = getRelated(products, product);
  const images = product.img?.length ? product.img : [];

  const handleAdd = () => {
    addItem(product, tamano, cantidad);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="bg-marfil pt-28 md:pt-36 pb-24 md:pb-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Breadcrumb */}
        <nav className="font-sans text-xs text-espresso/50 mb-10 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-oro transition-colors">Inicio</Link>
          <span>/</span>
          <Link to="/tienda" className="hover:text-oro transition-colors">Tienda</Link>
          <span>/</span>
          <Link to={`/tienda?coleccion=${product.coleccionId}`} className="hover:text-oro transition-colors">
            {product.coleccion}
          </Link>
          <span>/</span>
          <span className="text-espresso">{product.nombre}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Galería */}
          <div>
            <div className="aspect-square w-full overflow-hidden rounded-sm mb-3 bg-arena">
              {images[activeImg] && (
                <img
                  src={images[activeImg]}
                  alt={product.nombre}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    className={`h-20 w-20 rounded-sm overflow-hidden border transition-colors ${
                      i === activeImg ? "border-oro" : "border-transparent"
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detalles */}
          <div className="max-w-lg">
            <p className={`font-sans text-xs tracking-[0.3em] uppercase mb-4 ${ACCENT_CLASS(product.coleccionId)}`}>
              {product.coleccion}
            </p>
            <h1 className="font-display font-light text-4xl md:text-5xl text-espresso leading-tight mb-3">
              {product.nombre}
            </h1>
            {product.resumen && (
              <p className="font-sans font-light text-espresso/60 mb-6">{product.resumen}</p>
            )}

            <WaxDivider tone="oro" className="max-w-[120px] mb-6" />

            <p className="font-display text-3xl text-oro mb-6">${tamano.precio}</p>

            {product.descripcionLarga && (
              <p className="font-sans font-light text-base text-espresso/75 leading-relaxed mb-8">
                {product.descripcionLarga}
              </p>
            )}

            {/* Notas aromáticas */}
            {product.notas?.length > 0 && (
              <div className="mb-8">
                <p className="font-sans text-xs tracking-[0.3em] uppercase text-espresso/50 mb-3">
                  Notas aromáticas
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.notas.map((n) => (
                    <span
                      key={n}
                      className="font-sans text-xs text-espresso/70 border border-espresso/15 rounded-full px-3 py-1.5"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Selector de tamaño */}
            <div className="mb-8">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-espresso/50 mb-3">
                Tamaño
              </p>
              <div className="flex flex-wrap gap-2">
                {product.tamanos.map((t) => (
                  <button
                    key={t.etiqueta}
                    type="button"
                    onClick={() => setTamano(t)}
                    className={`font-sans text-sm rounded-full px-4 py-2 border transition-colors duration-200 ${
                      tamano.etiqueta === t.etiqueta
                        ? "border-oro bg-oro/10 text-espresso"
                        : "border-espresso/15 text-espresso/70 hover:border-oro/60"
                    }`}
                  >
                    {t.etiqueta} · ${t.precio}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad + Añadir */}
            <div className="flex items-stretch gap-3 mb-4">
              <div className="flex items-center border border-espresso/15 rounded-full">
                <button
                  type="button"
                  aria-label="Disminuir cantidad"
                  onClick={() => setCantidad((q) => Math.max(1, q - 1))}
                  className="w-11 h-12 flex items-center justify-center text-espresso/70 hover:text-oro transition-colors"
                >
                  −
                </button>
                <span className="w-8 text-center font-sans text-sm">{cantidad}</span>
                <button
                  type="button"
                  aria-label="Aumentar cantidad"
                  onClick={() => setCantidad((q) => q + 1)}
                  className="w-11 h-12 flex items-center justify-center text-espresso/70 hover:text-oro transition-colors"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 inline-flex items-center justify-center gap-2 font-sans text-sm tracking-[0.25em] uppercase bg-espresso text-marfil rounded-full px-6 py-3 hover:bg-oro hover:text-espresso transition-colors duration-300"
              >
                <IconBag className="w-4 h-4" />
                {added ? "Añadido a la bolsa" : "Añadir a la bolsa"}
              </button>
            </div>

            <a
              href={WHATSAPP_LINK(
                `Hola, me interesa "${product.nombre}" (${tamano.etiqueta}) — ¿está disponible? 🕯️`
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-sans text-sm text-espresso/70 hover:text-oro transition-colors duration-300"
            >
              <IconWhatsApp className="w-4 h-4" />
              Preguntar por WhatsApp
            </a>
          </div>
        </div>

        {/* Relacionados */}
        {related.length > 0 && (
          <div className="mt-24 md:mt-32">
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-oro mb-5">
              También te puede gustar
            </p>
            <WaxDivider tone="oro" className="max-w-[140px] mb-10" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
              {related.map((p) => (
                <Link key={p.id} to={`/producto/${p.slug}`} className="group block">
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
                  <h3 className="font-display font-light text-lg text-espresso mb-1">{p.nombre}</h3>
                  <span className="font-display text-oro">${p.tamanos?.[0]?.precio}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16">
          <Link
            to="/tienda"
            className="inline-flex items-center gap-2 font-sans text-sm tracking-[0.25em] uppercase text-espresso border-b border-oro pb-1 hover:text-oro transition-colors duration-300"
          >
            <IconArrow className="w-4 h-4 rotate-180" />
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
}
