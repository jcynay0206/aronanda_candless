// Vercel Serverless Function — POST /api/create-checkout-session
//
// Recibe { items, shipping, total } desde el checkout y crea una sesión de
// Stripe Checkout. Requiere la variable de entorno STRIPE_SECRET_KEY
// configurada en el proyecto de Vercel.
//
// Instalar dependencia: npm install stripe
//
// Este archivo es un punto de partida — ajustar success_url / cancel_url al
// dominio final y conectar con Firebase para guardar el pedido si se desea.

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { items, shipping } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "El carrito está vacío" });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${item.nombre} — ${item.tamanoEtiqueta}`,
          images: item.img ? [item.img] : undefined,
        },
        unit_amount: Math.round(item.precio * 100),
      },
      quantity: item.cantidad,
    }));

    const origin = req.headers.origin || "https://aronandacandles.vercel.app";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      shipping_address_collection: { allowed_countries: ["US"] },
      customer_email: shipping?.email,
      success_url: `${origin}/checkout/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return res.status(500).json({ error: "No se pudo crear la sesión de pago" });
  }
}
