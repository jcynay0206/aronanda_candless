// Catálogo inicial (semilla) de Aronanda Candles.
// Se usa una sola vez desde el panel de administración para poblar
// la colección "productos" de Firestore. Después de importarlo,
// todo el catálogo se gestiona desde /admin.

export const SEED_PRODUCTS = [
  {
    id: "cafe-cubano",
    slug: "cafe-cubano",
    coleccionId: "latina",
    coleccion: "Línea Latina",
    nombre: "Café Cubano",
    resumen: "Café tostado + vainilla",
    descripcionCorta: "Cera de soya · Café tostado + vainilla · 8 oz · 45-50 hrs",
    descripcionLarga:
      "Una vela que huele a la cocina de tu abuela un domingo por la mañana: café recién colado, un toque de vainilla y el calorcito de la casa despertando. Perfecta para encender mientras se prepara el desayuno.",
    notas: ["Café tostado", "Vainilla", "Madera cálida"],
    tamanos: [
      { etiqueta: "8 oz · 45-50 hrs", precio: 22 },
      { etiqueta: "4 oz · 20-25 hrs", precio: 14 },
    ],
    img: [
      "https://placehold.co/900x900/B85C38/F8F2E9?font=playfair-display&text=Caf%C3%A9+Cubano",
      "https://placehold.co/900x900/4A3324/F8F2E9?font=playfair-display&text=Caf%C3%A9+Cubano+2",
    ],
    bestseller: true,
  },
  {
    id: "tres-leches",
    slug: "tres-leches",
    coleccionId: "latina",
    coleccion: "Línea Latina",
    nombre: "Tres Leches",
    resumen: "Vainilla, leche condensada y canela",
    descripcionCorta: "Cera de soya · Vainilla, leche condensada y canela · 8 oz · 45-50 hrs",
    descripcionLarga:
      "Inspirada en el postre favorito de toda fiesta familiar. Notas cremosas de vainilla y leche condensada con un toque de canela — dulce sin ser empalagosa, como el final perfecto de una comida en casa.",
    notas: ["Vainilla", "Leche condensada", "Canela"],
    tamanos: [
      { etiqueta: "8 oz · 45-50 hrs", precio: 22 },
      { etiqueta: "4 oz · 20-25 hrs", precio: 14 },
    ],
    img: [
      "https://placehold.co/900x900/D2AA5C/2A1A0E?font=playfair-display&text=Tres+Leches",
      "https://placehold.co/900x900/EDE5D8/2A1A0E?font=playfair-display&text=Tres+Leches+2",
    ],
    bestseller: true,
  },
  {
    id: "abuela-en-domingo",
    slug: "abuela-en-domingo",
    coleccionId: "latina",
    coleccion: "Línea Latina",
    nombre: "Abuela en Domingo",
    resumen: "Pan dulce recién horneado + canela",
    descripcionCorta: "Cera de soya · Pan dulce recién horneado + canela · 8 oz · 45-50 hrs",
    descripcionLarga:
      "El aroma de la panadería de la esquina entrando por la puerta de la cocina. Pan dulce recién horneado con canela — el tipo de olor que te hace sentir en casa, sin importar dónde estés.",
    notas: ["Pan dulce", "Canela", "Mantequilla"],
    tamanos: [
      { etiqueta: "8 oz · 45-50 hrs", precio: 22 },
      { etiqueta: "4 oz · 20-25 hrs", precio: 14 },
    ],
    img: [
      "https://placehold.co/900x900/EDE5D8/2A1A0E?font=playfair-display&text=Abuela+en+Domingo",
      "https://placehold.co/900x900/B85C38/F8F2E9?font=playfair-display&text=Abuela+en+Domingo+2",
    ],
    bestseller: true,
  },
  {
    id: "domingo-de-lavanda",
    slug: "domingo-de-lavanda",
    coleccionId: "wellness",
    coleccion: "Línea Wellness",
    nombre: "Domingo de Lavanda",
    resumen: "Lavanda francesa + eucalipto",
    descripcionCorta: "Cera de soya · Lavanda francesa + eucalipto · 8 oz · 45-50 hrs",
    descripcionLarga:
      "Para esos domingos en los que solo quieres respirar tranquila. Lavanda francesa y eucalipto se combinan para crear un ambiente sereno — ideal para after del trabajo, baño relajante o antes de dormir.",
    notas: ["Lavanda francesa", "Eucalipto", "Salvia blanca"],
    tamanos: [
      { etiqueta: "8 oz · 45-50 hrs", precio: 24 },
      { etiqueta: "4 oz · 20-25 hrs", precio: 15 },
    ],
    img: [
      "https://placehold.co/900x900/7A8C6A/F8F2E9?font=playfair-display&text=Domingo+de+Lavanda",
      "https://placehold.co/900x900/EDE5D8/2A1A0E?font=playfair-display&text=Domingo+de+Lavanda+2",
    ],
    bestseller: true,
  },
  {
    id: "eucalipto-y-menta",
    slug: "eucalipto-y-menta",
    coleccionId: "wellness",
    coleccion: "Línea Wellness",
    nombre: "Eucalipto y Menta",
    resumen: "Eucalipto fresco + menta + romero",
    descripcionCorta: "Cera de soya · Eucalipto fresco + menta + romero · 8 oz · 45-50 hrs",
    descripcionLarga:
      "Un respiro fresco para los días pesados. Eucalipto, menta y un toque de romero despiertan los sentidos — perfecta para el escritorio, el baño o cualquier rincón que necesite aire nuevo.",
    notas: ["Eucalipto", "Menta", "Romero"],
    tamanos: [
      { etiqueta: "8 oz · 45-50 hrs", precio: 24 },
      { etiqueta: "4 oz · 20-25 hrs", precio: 15 },
    ],
    img: [
      "https://placehold.co/900x900/7A8C6A/F8F2E9?font=playfair-display&text=Eucalipto+y+Menta",
      "https://placehold.co/900x900/2A1A0E/F8F2E9?font=playfair-display&text=Eucalipto+y+Menta+2",
    ],
    bestseller: false,
  },
  {
    id: "jardin-de-salvia",
    slug: "jardin-de-salvia",
    coleccionId: "wellness",
    coleccion: "Línea Wellness",
    nombre: "Jardín de Salvia",
    resumen: "Salvia + flor de naranjo + bergamota",
    descripcionCorta: "Cera de soya · Salvia + flor de naranjo + bergamota · 8 oz · 45-50 hrs",
    descripcionLarga:
      "Una mezcla botánica y luminosa: salvia verde, flor de naranjo y un toque cítrico de bergamota. Ideal para limpiar el ambiente de la casa y empezar el día con calma.",
    notas: ["Salvia", "Flor de naranjo", "Bergamota"],
    tamanos: [
      { etiqueta: "8 oz · 45-50 hrs", precio: 24 },
      { etiqueta: "4 oz · 20-25 hrs", precio: 15 },
    ],
    img: [
      "https://placehold.co/900x900/EDE5D8/2A1A0E?font=playfair-display&text=Jard%C3%ADn+de+Salvia",
      "https://placehold.co/900x900/7A8C6A/F8F2E9?font=playfair-display&text=Jard%C3%ADn+de+Salvia+2",
    ],
    bestseller: false,
  },
  {
    id: "palo-santo",
    slug: "palo-santo-copal",
    coleccionId: "espiritual",
    coleccion: "Línea Espiritual",
    nombre: "Palo Santo & Copal",
    resumen: "Palo santo + copal + cedro",
    descripcionCorta: "Cera de soya · Palo santo, copal y madera de cedro · 8 oz · 45-50 hrs",
    descripcionLarga:
      "Para limpiar el espacio y abrir el camino. Palo santo y copal envueltos en madera de cedro — perfecta para rituales, meditación o simplemente para reiniciar la energía de un cuarto.",
    notas: ["Palo santo", "Copal", "Cedro"],
    tamanos: [
      { etiqueta: "8 oz · 45-50 hrs", precio: 26 },
      { etiqueta: "4 oz · 20-25 hrs", precio: 16 },
    ],
    img: [
      "https://placehold.co/900x900/2A1A0E/F8F2E9?font=playfair-display&text=Palo+Santo",
      "https://placehold.co/900x900/4A3324/F8F2E9?font=playfair-display&text=Palo+Santo+2",
    ],
    bestseller: true,
  },
  {
    id: "luna-llena",
    slug: "luna-llena",
    coleccionId: "espiritual",
    coleccion: "Línea Espiritual",
    nombre: "Luna Llena",
    resumen: "Sándalo + mirra + flores blancas",
    descripcionCorta: "Cera de soya · Sándalo + mirra + flores blancas · 8 oz · 45-50 hrs",
    descripcionLarga:
      "Una mezcla envolvente de sándalo, mirra y flores blancas, pensada para los rituales de luna llena: soltar lo que ya no sirve y dar espacio a lo nuevo.",
    notas: ["Sándalo", "Mirra", "Flores blancas"],
    tamanos: [
      { etiqueta: "8 oz · 45-50 hrs", precio: 26 },
      { etiqueta: "4 oz · 20-25 hrs", precio: 16 },
    ],
    img: [
      "https://placehold.co/900x900/2A1A0E/B8881E?font=playfair-display&text=Luna+Llena",
      "https://placehold.co/900x900/4A3324/F8F2E9?font=playfair-display&text=Luna+Llena+2",
    ],
    bestseller: false,
  },
  {
    id: "camino-abierto",
    slug: "camino-abierto",
    coleccionId: "espiritual",
    coleccion: "Línea Espiritual",
    nombre: "Camino Abierto",
    resumen: "Incienso + naranja + clavo",
    descripcionCorta: "Cera de soya · Incienso + naranja + clavo · 8 oz · 45-50 hrs",
    descripcionLarga:
      "Cálida y especiada, con incienso, naranja y clavo de olor. Pensada para acompañar intenciones de prosperidad y nuevos comienzos en el altar o el espacio de trabajo.",
    notas: ["Incienso", "Naranja", "Clavo de olor"],
    tamanos: [
      { etiqueta: "8 oz · 45-50 hrs", precio: 26 },
      { etiqueta: "4 oz · 20-25 hrs", precio: 16 },
    ],
    img: [
      "https://placehold.co/900x900/B8881E/2A1A0E?font=playfair-display&text=Camino+Abierto",
      "https://placehold.co/900x900/2A1A0E/F8F2E9?font=playfair-display&text=Camino+Abierto+2",
    ],
    bestseller: false,
  },
  {
    id: "flor-de-azahar",
    slug: "flor-de-azahar",
    coleccionId: "eventos",
    coleccion: "Línea Eventos",
    nombre: "Flor de Azahar",
    resumen: "Azahar + jazmín · mini favor de boda",
    descripcionCorta: "Cera de soya · Azahar y jazmín · Mini 4 oz · favor de boda",
    descripcionLarga:
      "El recuerdo que tus invitados se llevarán a casa ese día tan especial. Azahar y jazmín en un frasco mini, perfecto para personalizar con el nombre de los novios y la fecha.",
    notas: ["Azahar", "Jazmín", "Almizcle blanco"],
    tamanos: [
      { etiqueta: "Mini 4 oz", precio: 12 },
      { etiqueta: "Set de 10 minis", precio: 105 },
    ],
    img: [
      "https://placehold.co/900x900/C49080/2A1A0E?font=playfair-display&text=Flor+de+Azahar",
      "https://placehold.co/900x900/EDE5D8/2A1A0E?font=playfair-display&text=Flor+de+Azahar+2",
    ],
    bestseller: true,
  },
  {
    id: "primer-bautizo",
    slug: "primer-bautizo",
    coleccionId: "eventos",
    coleccion: "Línea Eventos",
    nombre: "Primer Bautizo",
    resumen: "Algodón + talco + flor de azahar · mini",
    descripcionCorta: "Cera de soya · Algodón, talco y flor de azahar · Mini 4 oz",
    descripcionLarga:
      "Suave y delicada, como el día que celebra. Notas de algodón, talco y flor de azahar en un frasco mini personalizable — un detalle dulce para acompañar ese día tan especial.",
    notas: ["Algodón", "Talco", "Flor de azahar"],
    tamanos: [
      { etiqueta: "Mini 4 oz", precio: 12 },
      { etiqueta: "Set de 10 minis", precio: 105 },
    ],
    img: [
      "https://placehold.co/900x900/EDE5D8/2A1A0E?font=playfair-display&text=Primer+Bautizo",
      "https://placehold.co/900x900/C49080/2A1A0E?font=playfair-display&text=Primer+Bautizo+2",
    ],
    bestseller: false,
  },
  {
    id: "quince-rosa",
    slug: "quince-rosa",
    coleccionId: "eventos",
    coleccion: "Línea Eventos",
    nombre: "Quince Rosa",
    resumen: "Rosas + fresa + vainilla · mini",
    descripcionCorta: "Cera de soya · Rosas, fresa y vainilla · Mini 4 oz",
    descripcionLarga:
      "Dulce, romántica y festiva — como la quinceañera. Rosas, fresa y vainilla en un frasco mini que se puede personalizar con los colores de la fiesta para regalar a las damas y chambelanes.",
    notas: ["Rosas", "Fresa", "Vainilla"],
    tamanos: [
      { etiqueta: "Mini 4 oz", precio: 12 },
      { etiqueta: "Set de 10 minis", precio: 105 },
    ],
    img: [
      "https://placehold.co/900x900/C49080/2A1A0E?font=playfair-display&text=Quince+Rosa",
      "https://placehold.co/900x900/B85C38/F8F2E9?font=playfair-display&text=Quince+Rosa+2",
    ],
    bestseller: false,
  },
].map((p) => ({ ...p, activo: true }));
