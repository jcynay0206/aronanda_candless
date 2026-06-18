# Configurar Firebase para Aronanda Candles

Esta tienda ahora gestiona su catálogo de productos desde un panel de
administración propio en `/admin`, conectado a Firebase. Sigue estos pasos
una sola vez para activarlo.

## 1. Crear el proyecto de Firebase

1. Ve a https://console.firebase.google.com y crea un proyecto nuevo
   (ej. "aronanda-candles").
2. Dentro del proyecto, ve a **Configuración del proyecto > Tus apps** y
   crea una app web (ícono `</>`). Copia los valores de `firebaseConfig`.
3. Copia `.env.example` como `.env` en la raíz del proyecto y pega esos
   valores en cada variable `VITE_FIREBASE_...`.

## 2. Activar Authentication

1. En el menú lateral, ve a **Authentication > Sign-in method**.
2. Activa el proveedor **Correo electrónico/contraseña**.
3. Ve a la pestaña **Users** y crea manualmente el usuario administrador
   (tu correo + una contraseña segura). Este es el usuario con el que
   entrarás a `/admin/login`. No hay registro público — solo tú puedes
   crear usuarios admin desde la consola de Firebase.

## 3. Activar Firestore

1. Ve a **Firestore Database > Crear base de datos**.
2. Elige modo de producción y la región más cercana (ej. `us-east4` para
   la costa este de EE.UU.).
3. Ve a la pestaña **Reglas** y pega esto:

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

Esto permite que cualquiera vea el catálogo (necesario para la tienda),
pero solo un usuario autenticado (tu admin) puede crear, editar o borrar
productos.

## 4. Activar Storage (fotos de productos)

1. Ve a **Storage > Comenzar** y sigue los pasos (modo de producción).
2. En la pestaña **Reglas**, pega esto:

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

## 5. Variables de entorno en Vercel

En el dashboard de Vercel, ve a **Settings > Environment Variables** del
proyecto y agrega las mismas 6 variables `VITE_FIREBASE_...` que pusiste en
`.env`. Vuelve a hacer deploy después de guardarlas.

## 6. Primer uso

1. Corre el proyecto (`npm run dev`) o ábrelo en producción.
2. Ve a `/admin/login` e ingresa con el usuario que creaste en el paso 2.
3. En **Productos**, si la lista está vacía, verás un botón para
   **"Importar catálogo inicial (12 productos)"** — esto carga las 12 velas
   de ejemplo (con imágenes de marcador) como punto de partida. Después
   puedes editarlas, subir fotos reales, cambiar precios, ocultarlas o
   borrarlas, y crear productos nuevos — todo sin tocar código ni hacer
   deploy.

## Notas

- El catálogo se sincroniza en tiempo real: lo que cambias en `/admin` se
  refleja al instante en la tienda (`/tienda`, páginas de producto,
  bestsellers).
- El campo **"Visible en la tienda"** te permite ocultar un producto sin
  borrarlo (ej. mientras se agota el inventario).
- El campo **"Mostrar en Bestsellers"** controla qué aparece en el
  carrusel de la página de inicio.
