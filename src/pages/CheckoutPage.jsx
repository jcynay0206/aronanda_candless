import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ENVIO_GRATIS_DESDE, COSTO_ENVIO, WHATSAPP_LINK } from "../data/content";
import WaxDivider from "../components/WaxDivider";
import { IconArrow, IconWhatsApp } from "../components/Icons";

const initialForm = {
  nombre: "",
  email: "",
  telefono: "",
  direccion: "",
  ciudad: "",
  estado: "NJ",
  zip: "",
  notas: "",
};

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) return <Navigate to="/carrito" replace />;

  const envio = subtotal >= ENVIO_GRATIS_DESDE ? 0 : COSTO_ENVIO;
  const total = subtotal + envio;

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const formValido = form.nombre && form.email && form.direccion && form.ciudad && form.zip;

  // Pago con tarjeta vía Stripe Checkout.
  // TODO: crear el endpoint /api/create-checkout-session en Vercel (Node/Edge function)
  // que reciba { items, shipping } y devuelva la URL de la sesión de Stripe Checkout
  // usando STRIPE_SECRET_KEY como variable de entorno. Ver api/create-checkout-session.js
  const handlePagoTarjeta = async () => {
    setError("");
    if (!formValido) {
      setError("Por favor completa tus datos de envío antes de continuar.");
      return;
    }
    setPaying(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, shipping: form, total }),
      });
      if (!res.ok) throw new Error("No se pudo crear la sesión de pago");
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Respuesta inválida del servidor de pagos");
      }
    } catch (err) {
      setError(
        "El pago con tarjeta aún no está conectado en este entorno. Puedes finalizar tu pedido por WhatsApp mientras tanto."
      );
    } finally {
      setPaying(false);
    }
  };

  const mensajeWhatsApp = () => {
    const lineas = items
      .map((i) => `• ${i.nombre} (${i.tamanoEtiqueta}) x${i.cantidad} — $${(i.precio * i.cantidad).toFixed(2)}`)
      .join("\n");
    return (
      `Hola! Quiero confirmar mi pedido de Aronanda Candles 🕯️\n\n${lineas}\n\n` +
      `Envío: ${envio === 0 ? "Gratis" : `$${envio.toFixed(2)}`}\n` +
      `Total: $${total.toFixed(2)}\n\n` +
      `Datos de envío:\n${form.nombre}\n${form.direccion}\n${form.ciudad}, ${form.estado} ${form.zip}\n` +
      `Tel: ${form.telefono}\n${form.notas ? `Notas: ${form.notas}` : ""}`
    );
  };

  return (
    <div className="bg-marfil pt-28 md:pt-36 pb-24 md:pb-36 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="font-sans text-xs tracking-[0.4em] uppercase text-oro mb-5">Checkout</p>
        <h1 className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-espresso leading-tight mb-6">
          Finaliza tu pedido
        </h1>
        <WaxDivider tone="oro" className="max-w-[140px] mb-12" />

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {/* Formulario de envío */}
          <div className="md:col-span-2">
            <h2 className="font-display font-light text-2xl text-espresso mb-6">
              Información de envío
            </h2>

            <form className="grid sm:grid-cols-2 gap-5">
              <Field label="Nombre completo" name="nombre" value={form.nombre} onChange={onChange} required className="sm:col-span-2" />
              <Field label="Correo electrónico" name="email" type="email" value={form.email} onChange={onChange} required />
              <Field label="Teléfono / WhatsApp" name="telefono" value={form.telefono} onChange={onChange} />
              <Field label="Dirección" name="direccion" value={form.direccion} onChange={onChange} required className="sm:col-span-2" />
              <Field label="Ciudad" name="ciudad" value={form.ciudad} onChange={onChange} required />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Estado" name="estado" value={form.estado} onChange={onChange} required />
                <Field label="Código postal" name="zip" value={form.zip} onChange={onChange} required />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-sans text-xs tracking-[0.2em] uppercase text-espresso/50 mb-2">
                  Notas del pedido (opcional)
                </label>
                <textarea
                  name="notas"
                  value={form.notas}
                  onChange={onChange}
                  rows={3}
                  placeholder="Ej: personalizar etiqueta con el nombre de la pareja y la fecha"
                  className="w-full bg-transparent border border-espresso/15 rounded-sm px-4 py-3 font-sans font-light text-sm focus:outline-none focus:border-oro"
                />
              </div>
            </form>

            {error && (
              <p className="mt-6 font-sans text-sm text-terracota">{error}</p>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handlePagoTarjeta}
                disabled={paying}
                className="inline-flex items-center justify-center gap-3 font-sans text-sm tracking-[0.25em] uppercase text-marfil bg-espresso rounded-full px-8 py-4 hover:bg-oro hover:text-espresso transition-colors duration-300 disabled:opacity-60"
              >
                {paying ? "Conectando con Stripe…" : "Pagar con tarjeta"}
              </button>

              <a
                href={WHATSAPP_LINK(mensajeWhatsApp())}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  if (formValido) clearCart();
                }}
                aria-disabled={!formValido}
                className={`inline-flex items-center justify-center gap-3 font-sans text-sm tracking-[0.25em] uppercase border rounded-full px-8 py-4 transition-colors duration-300 ${
                  formValido
                    ? "border-oro text-espresso hover:bg-oro hover:text-espresso"
                    : "border-espresso/15 text-espresso/40 pointer-events-none"
                }`}
              >
                <IconWhatsApp className="w-4 h-4" />
                Finalizar por WhatsApp
              </a>
            </div>
            {!formValido && (
              <p className="mt-3 font-sans text-xs text-espresso/45">
                Completa nombre, correo, dirección, ciudad y código postal para continuar.
              </p>
            )}
          </div>

          {/* Resumen */}
          <div className="md:col-span-1">
            <div className="bg-arena rounded-sm p-6 md:p-8 sticky top-28">
              <h2 className="font-display font-light text-2xl text-espresso mb-6">Tu pedido</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.key} className="flex gap-3 items-center">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-sm">
                      <img src={item.img} alt={item.nombre} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 font-sans text-sm">
                      <p className="text-espresso">{item.nombre}</p>
                      <p className="text-espresso/50 text-xs">
                        {item.tamanoEtiqueta} · x{item.cantidad}
                      </p>
                    </div>
                    <span className="font-display text-oro">
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 font-sans text-sm text-espresso/75 border-t border-espresso/15 pt-4 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>{envio === 0 ? "Gratis" : `$${envio.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="flex justify-between font-display text-xl text-espresso border-t border-espresso/15 pt-4 mb-4">
                <span>Total</span>
                <span className="text-oro">${total.toFixed(2)}</span>
              </div>

              <Link
                to="/carrito"
                className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.25em] uppercase text-espresso/60 hover:text-oro transition-colors duration-300"
              >
                <IconArrow className="w-3.5 h-3.5 rotate-180" />
                Editar bolsa
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", required = false, className = "" }) {
  return (
    <div className={className}>
      <label className="block font-sans text-xs tracking-[0.2em] uppercase text-espresso/50 mb-2">
        {label}
        {required && <span className="text-terracota"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-transparent border border-espresso/15 rounded-sm px-4 py-3 font-sans font-light text-sm focus:outline-none focus:border-oro"
      />
    </div>
  );
}
