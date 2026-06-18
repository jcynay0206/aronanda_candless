import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Permite que los enlaces tipo "/#colecciones" funcionen como anclas
// dentro de la SPA: al cambiar el hash, hace scroll suave a la sección.
export default function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        // Pequeño delay para asegurar que el layout ya esté pintado
        requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [hash, pathname]);

  return null;
}
