import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ENVIO_GRATIS_DESDE, COSTO_ENVIO } from "../data/content";
import WaxDivider from "../components/WaxDivider";
import { IconArrow } from "../components/Icons";

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal } = useCart();
  const envio = items.length === 0 ? 0 : subtotal >= ENVIO_GRATIS_DESDE ? 0 : COSTO_ENVIO;
  const total = subtotal + envio;

  return (
    <div className="bg-marfil pt-28 md:pt-36 pb-24 md:pb-36 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="font-sans text-xs tracking-[0.4em] uppercase text-oro mb-5">Bolsa</p>
        <h1 className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-espresso leading-tight mb-6">
          Tu bolsa
        </h1>
        <WaxDivider tone="oro" className="max-w-[140px] mb-12" />

        {items.length === 0 ? (
          <div className="max-w-md">
            <p className="font-sans font-light text-espresso/70 mb-8">
              Tu bolsa está vacía por ahora. Explora nuestras colecciones y encuentra el
              aroma que llene tu casa de calidez.
            </p>
            <Link
              to="/tienda"
              className="inline-flex items-center gap-3 font-sans text-sm tracking-[0.25em] uppercase text-marfil bg-espresso rounded-full px-8 py-4 hover:bg-oro hover:text-espresso transition-colors duration-300"
            >
              Ir a la tienda
              <IconArrow className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {/* Lista de productos */}
            <div className="md:col-span-2 divide-y divide-espresso/10">
              {items.map((item) => (
                <div key={item.key} className="flex gap-5 py-6 first:pt-0">
                  <Link to={`/producto/${item.slug}`} className="shrink-0">
                    <div className="h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-sm">
                      <img src={item.img} alt={item.nombre} className="h-full w-full object-cover" />
                    </div>
                  </Link>

                  <div className="flex-1 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-espresso/45 mb-1">
                        {item.coleccion}
                      </p>
                      <Link to={`/producto/${item.slug}`} className="font-display text-xl text-espresso hover:text-oro transition-colors">
                        {item.nombre}
                      </Link>
                      <p className="font-sans text-xs text-espresso/55 mt-1">{item.tamanoEtiqueta}</p>

                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        className="font-sans text-xs text-espresso/40 hover:text-terracota transition-colors mt-3"
                      >
                        Eliminar
                      </button>
                    </div>

                    <div className="flex sm:flex-col sm:items-end items-center justify-between gap-3 sm:gap-3">
                      <div className="flex items-center border border-espresso/15 rounded-full">
                        <button
                          type="button"
                          aria-label="Disminuir cantidad"
                          onClick={() => updateQty(item.key, item.cantidad - 1)}
                          className="w-9 h-9 flex items-center justify-center text-espresso/70 hover:text-oro transition-colors"
                        >
                          −
                        </button>
                        <span className="w-7 text-center font-sans text-sm">{item.cantidad}</span>
                        <button
                          type="button"
                          aria-label="Aumentar cantidad"
                          onClick={() => updateQty(item.key, item.cantidad + 1)}
                          className="w-9 h-9 flex items-center justify-center text-espresso/70 hover:text-oro transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-display text-lg text-oro">
                        ${(item.precio * item.cantidad).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-8">
                <Link
                  to="/tienda"
                  className="inline-flex items-center gap-2 font-sans text-sm tracking-[0.25em] uppercase text-espresso border-b border-oro pb-1 hover:text-oro transition-colors duration-300"
                >
                  <IconArrow className="w-4 h-4 rotate-180" />
                  Seguir comprando
                </Link>
              </div>
            </div>

            {/* Resumen */}
            <div className="md:col-span-1">
              <div className="bg-arena rounded-sm p-6 md:p-8 sticky top-28">
                <h2 className="font-display font-light text-2xl text-espresso mb-6">Resumen</h2>

                <div className="space-y-3 font-sans text-sm text-espresso/75 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span>{envio === 0 ? "Gratis" : `$${envio.toFixed(2)}`}</span>
                  </div>
                  {envio > 0 && (
                    <p className="text-xs text-espresso/50">
                      Envío gratis en pedidos desde ${ENVIO_GRATIS_DESDE}.
                    </p>
                  )}
                </div>

                <div className="flex justify-between font-display text-xl text-espresso border-t border-espresso/15 pt-4 mb-8">
                  <span>Total</span>
                  <span className="text-oro">${total.toFixed(2)}</span>
                </div>

                <Link
                  to="/checkout"
                  className="w-full inline-flex items-center justify-center gap-3 font-sans text-sm tracking-[0.25em] uppercase text-marfil bg-espresso rounded-full px-6 py-4 hover:bg-oro hover:text-espresso transition-colors duration-300"
                >
                  Proceder al pago
                  <IconArrow className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
