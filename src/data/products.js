import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  writeBatch,
  query,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase";
import { SEED_PRODUCTS } from "./seedProducts";

export const PRODUCTS_COLLECTION = "productos";

// --- Lectura en tiempo real -------------------------------------------------

// Se suscribe a la colección "productos" y llama a `callback` con la lista
// actualizada cada vez que algo cambia (alta, edición o borrado desde /admin).
export function subscribeProducts(callback) {
  const q = query(collection(db, PRODUCTS_COLLECTION), orderBy("creadoEn", "desc"));
  return onSnapshot(
    q,
    (snap) => {
      const products = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      callback(products, null);
    },
    (error) => {
      console.error("Error leyendo productos:", error);
      callback([], error);
    }
  );
}

// --- Escritura ---------------------------------------------------------------

export async function addProduct(data) {
  return addDoc(collection(db, PRODUCTS_COLLECTION), {
    ...data,
    creadoEn: serverTimestamp(),
  });
}

export async function updateProduct(id, data) {
  return updateDoc(doc(db, PRODUCTS_COLLECTION, id), data);
}

export async function deleteProduct(id) {
  return deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
}

// Sube una o varias imágenes a Storage bajo productos/{productId}/ y devuelve
// las URLs públicas de descarga.
export async function uploadProductImages(productId, files) {
  const urls = [];
  for (const file of files) {
    const path = `productos/${productId}/${Date.now()}_${file.name}`;
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    urls.push(await getDownloadURL(fileRef));
  }
  return urls;
}

// Borra una imagen de Storage a partir de su URL de descarga.
export async function deleteProductImage(url) {
  try {
    const fileRef = ref(storage, url);
    await deleteObject(fileRef);
  } catch (err) {
    // La imagen puede no existir en Storage (ej. placeholders de la semilla)
    console.warn("No se pudo borrar la imagen:", url, err.message);
  }
}

// Importa el catálogo inicial a Firestore (un solo uso, desde /admin,
// cuando la colección "productos" está vacía).
export async function importSeedProducts() {
  const batch = writeBatch(db);
  SEED_PRODUCTS.forEach((p) => {
    const ref_ = doc(collection(db, PRODUCTS_COLLECTION));
    const { id, ...rest } = p; // descartar el id estático de la semilla
    batch.set(ref_, { ...rest, creadoEn: serverTimestamp() });
  });
  await batch.commit();
}

// --- Helpers puros sobre el arreglo ya cargado --------------------------------

export function getActiveProducts(products) {
  return products.filter((p) => p.activo !== false);
}

export function getProductBySlug(products, slug) {
  return products.find((p) => p.slug === slug);
}

export function getBestsellers(products, count = 6) {
  return getActiveProducts(products).filter((p) => p.bestseller).slice(0, count);
}

export function getRelated(products, product, count = 4) {
  const active = getActiveProducts(products).filter((p) => p.id !== product.id);
  return active
    .filter((p) => p.coleccionId === product.coleccionId)
    .concat(active.filter((p) => p.coleccionId !== product.coleccionId))
    .slice(0, count);
}
