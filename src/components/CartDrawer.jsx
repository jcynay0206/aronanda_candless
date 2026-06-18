import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { IconArrow, IconClose } from "./Icons";

export default function CartDrawer() {
  const { items, subtotal, open, setOpen, updateQty, removeItem } = useCart();

  return (
    <>
      {/* Fondo oscuro */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-espresso/50 z-[60] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-marfil z-[70] shadow-2xl transition-transform duration-500 ease-[var(--ease-aronanda)] flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Bolsa de compras"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-espresso/10">
          <h2 className="font-display text-2xl text-espresso">Tu bolsa</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar bolsa"
            className="p-1 text-espresso/60 hover:text-oro transition-colors"
          >
            <IconClose />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="font-sans font-light text-espresso/60 py-10 text-center">
              Aún no has añadido velas a tu bolsa.
            </p>
          ) : (
            <div className="divide-y divide-espresso/10">
              {items.map((item) => (
                <div key={item.key} className="flex gap-4 py-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-sm">
                    <img src={item.img} alt={item.nombre} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 font-sans text-sm">
                    <p className="text-espresso">{item.nombre}</p>
                    <p className="text-espresso/50 text-xs mb-2">{item.tamanoEtiqueta}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-espresso/15 rounded-full">
                        <button
                          type="button"
                          aria-label="Disminuir cantidad"
                          onClick={() => updateQty(item.key, item.cantidad - 1)}
                          className="w-7 h-7 flex items-center justify-center text-espresso/70 hover:text-oro transition-colors text-xs"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-xs">{item.cantidad}</span>
                        <button
                          type="button"
                          aria-label="Aumentar cantidad"
                          onClick={() => updateQty(item.key, item.cantidad + 1)}
                          className="w-7 h-7 flex items-center justify-center text-espresso/70 hover:text-oro transition-colors text-xs"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        className="text-xs text-espresso/40 hover:text-terracota transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <span className="font-display text-oro">
                    ${(item.precio * item.cantidad).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-espresso/10">
            <div className="flex justify-between font-sans text-sm text-espresso/70 mb-4">
              <span>Subtotal</span>
              <span className="font-display text-lg text-oro">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                className="w-full inline-flex items-center justify-center gap-3 font-sans text-sm tracking-[0.25em] uppercase text-marfil bg-espresso rounded-full px-6 py-4 hover:bg-oro hover:text-espresso transition-colors duration-300"
              >
                Ir a pagar
                <IconArrow className="w-4 h-4" />
              </Link>
              <Link
                to="/carrito"
                onClick={() => setOpen(false)}
                className="w-full inline-flex items-center justify-center font-sans text-xs tracking-[0.25em] uppercase text-espresso/70 hover:text-oro transition-colors duration-300 py-2"
              >
                Ver bolsa completa
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
