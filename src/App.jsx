import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import Home from "./pages/Home";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

// El panel de administración (y Firebase Auth/Storage) se cargan en un
// chunk aparte, solo cuando alguien visita /admin.
const AdminRoot = lazy(() => import("./AdminRoot"));

export default function App() {
  return (
    <Routes>
      {/* Sitio público */}
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<ShopPage />} />
        <Route path="/producto/:slug" element={<ProductPage />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>

      {/* Administración */}
      <Route
        path="/admin/*"
        element={
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-marfil">
                <p className="font-sans text-sm text-espresso/50">Cargando panel…</p>
              </div>
            }
          >
            <AdminRoot />
          </Suspense>
        }
      />
    </Routes>
  );
}
