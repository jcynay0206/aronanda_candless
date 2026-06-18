# Conectar Firebase — Panel de administración

Esta tienda ahora tiene un panel en `/admin` para que puedas subir y editar
productos sin tocar código. Para que funcione necesitas un proyecto de
Firebase (gratis en el plan Spark, que alcanza de sobra para empezar).

## 1. Crear el proyecto

1. Ve a https://console.firebase.google.com y crea un proyecto nuevo
   (ej. "aronanda-candles").
2. Dentro del proyecto, ve a **Configuración del proyecto > Tus apps** y
   crea una "Web app". Copia los valores de `firebaseConfig` — los vas a
   necesitar para el archivo `.env`.

## 2. Activar los servicios

- **Authentication**: en el menú lateral, entra a Authentication > Sign-in
  method y activa **Correo electrónico/Contraseña**. Luego en la pestaña
  "Users", crea manualmente el usuario admin (tu correo + una contraseña)
  — ese es el login de `/admin/login`.
- **Firestore Database**: créala en modo producción, en la región más
  cercana (ej. `us-east1` para NJ).
- **Storage**: actívalo (modo producción) — aquí se guardan las fotos de
  los productos que subas desde el panel.

## 3. Configurar variables de entorno

Copia `.env.example` como `.env` y pega los valores de `firebaseConfig`:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

En Vercel, agrega las mismas variables en **Project Settings > Environment
Variables** (para Production, Preview y Development).

## 4. Reglas de seguridad

**Firestore** (Rules) — cualquiera puede leer el catálogo, solo usuarios
autenticados (tú, desde `/admin`) pueden escribir:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /productos/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

**Storage** (Rules) — mismo criterio para las fotos de producto:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /productos/{productId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 5. Primer uso

1. Corre el proyecto (`npm run dev`) o súbelo a Vercel con las variables
   configuradas.
2. Entra a `/admin/login` con el usuario que creaste en el paso 2.
3. En **Productos**, si la colección está vacía verás un botón
   **"Importar catálogo inicial (12 productos)"** — esto carga las 12
   velas de ejemplo (con imágenes placeholder) para que tengas algo de
   base y lo edites a tu gusto.
4. Desde ahí puedes **crear, editar, ocultar o eliminar** productos,
   incluyendo subir tus propias fotos. Los cambios se reflejan al
   instante en la tienda (`/tienda`, `/producto/:slug` y los
   "Bestsellers" de la portada).

## ¿Qué se gestiona desde el panel y qué no?

- **Desde `/admin`**: el catálogo completo de productos (nombre, colección,
  precios por tamaño, descripciones, notas aromáticas, fotos, si aparece
  en Bestsellers, si está visible).
- **Sigue siendo código** (porque cambia poco): las 4 colecciones/líneas de
  marca (`src/data/content.js`), los textos de Historia/Proceso/Reseñas,
  el número de WhatsApp y los colores/tipografías de marca.

Si más adelante quieres que las colecciones, reseñas o el número de
WhatsApp también sean editables desde el panel, es un paso natural una vez
que esto esté funcionando.
