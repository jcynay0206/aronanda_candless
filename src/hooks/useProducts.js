import { useEffect, useState } from "react";
import { subscribeProducts } from "../data/products";

// Hook que mantiene la lista de productos sincronizada en tiempo real con
// Firestore. Mientras `loading` es true, no se ha recibido respuesta aún.
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeProducts((data, err) => {
      setProducts(data);
      setError(err);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { products, loading, error };
}
