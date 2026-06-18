// Catálogo completo de Aronanda Candles
// Imágenes: placeholders temporales con la paleta de marca — reemplazar por
// fotografía real (luz natural, tonos cálidos) cuando esté disponible.

export const COLLECTIONS = [
  {
    id: "latina",
    nombre: "Línea Latina",
    descripcion: "Aromas que huelen a casa de abuela: café, dulce de leche, tres leches, guayaba.",
    color: "var(--color-terracota)",
    img: "https://placehold.co/900x1100/B85C38/F8F2E9?font=playfair-display&text=L%C3%ADnea+Latina",
  },
  {
    id: "wellness",
    nombre: "Línea Wellness",
    descripcion: "Lavanda, eucalipto y salvia para calmar la mente después de un día largo.",
    color: "var(--color-salvia)",
    img: "https://placehold.co/900x1100/7A8C6A/F8F2E9?font=playfair-display&text=L%C3%ADnea+Wellness",
  },
  {
    id: "espiritual",
    nombre: "Línea Espiritual",
    descripcion: "Sahumerios, palo santo y copal para limpiar el espacio y abrir el camino.",
    color: "var(--color-espresso)",
    img: "https://placehold.co/900x1100/2A1A0E/F8F2E9?font=playfair-display&text=L%C3%ADnea+Espiritual",
  },
  {
    id: "eventos",
    nombre: "Línea Eventos",
    descripcion: "Bodas, bautizos y quinceañeras: detalles personalizados para regalar ese día.",
    color: "var(--color-rosa)",
    img: "https://placehold.co/900x1100/C49080/2A1A0E?font=playfair-display&text=L%C3%ADnea+Eventos",
  },
];

const ACCENTS = {
  latina: "text-terracota",
  wellness: "text-salvia",
  espiritual: "text-espresso/70",
  eventos: "text-rosa",
};

export const ACCENT_CLASS = (coleccionId) => ACCENTS[coleccionId] ?? "text-oro";

export const PROCESO = [
  {
    paso: "01",
    titulo: "Ingredientes",
    texto:
      "Cera de soya 100% natural, mechas de algodón sin plomo y aceites aromáticos seleccionados a mano, libres de ftalatos.",
    img: "https://placehold.co/800x900/EDE5D8/2A1A0E?font=playfair-display&text=Ingredientes",
  },
  {
    paso: "02",
    titulo: "Elaboración",
    texto:
      "Cada vela se vierte y se deja enfriar lentamente para una quemada pareja, en pequeños lotes dentro de nuestro taller en Elizabeth, NJ.",
    img: "https://placehold.co/800x900/B8881E/2A1A0E?font=playfair-display&text=Elaboraci%C3%B3n",
  },
  {
    paso: "03",
    titulo: "Empaque",
    texto:
      "Etiquetas pintadas a mano, cordón de lino y una nota personal — porque cada pedido también es un regalo para quien lo recibe.",
    img: "https://placehold.co/800x900/2A1A0E/F8F2E9?font=playfair-display&text=Empaque",
  },
];

export const TESTIMONIOS = [
  {
    nombre: "Marisol R.",
    ubicacion: "Elizabeth, NJ",
    texto:
      "La vela de Café Cubano huele exactamente a la cocina de mi mamá los domingos. La encendí y se me llenaron los ojos de lágrimas, en el buen sentido.",
    img: "https://placehold.co/200x200/B85C38/F8F2E9?font=playfair-display&text=M",
  },
  {
    nombre: "Yesenia P.",
    ubicacion: "Newark, NJ",
    texto:
      "Pedí las mini velas de Flor de Azahar para mi boda y todos los invitados preguntaron de dónde eran. Empaque precioso y entrega a tiempo.",
    img: "https://placehold.co/200x200/C49080/2A1A0E?font=playfair-display&text=Y",
  },
  {
    nombre: "Carmen D.",
    ubicacion: "Linden, NJ",
    texto:
      "Uso Palo Santo & Copal para mis lecturas de tarot. La calidad de la fragancia dura horas y el frasco de vidrio quedó precioso en mi altar.",
    img: "https://placehold.co/200x200/2A1A0E/F8F2E9?font=playfair-display&text=C",
  },
];

export const INSTAGRAM_FEED = [
  "https://placehold.co/600x600/2A1A0E/B8881E?font=playfair-display&text=%F0%9F%95%AF%EF%B8%8F",
  "https://placehold.co/600x600/B85C38/F8F2E9?font=playfair-display&text=Aronanda",
  "https://placehold.co/600x600/EDE5D8/2A1A0E?font=playfair-display&text=Proceso",
  "https://placehold.co/600x600/7A8C6A/F8F2E9?font=playfair-display&text=Wellness",
  "https://placehold.co/600x600/C49080/2A1A0E?font=playfair-display&text=Eventos",
  "https://placehold.co/600x600/B8881E/2A1A0E?font=playfair-display&text=Aroma",
];

export const WHATSAPP_NUMBER = "15551234567"; // TODO: reemplazar con el número real
export const WHATSAPP_LINK = (mensaje) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;

export const ENVIO_GRATIS_DESDE = 60;
export const COSTO_ENVIO = 6;
