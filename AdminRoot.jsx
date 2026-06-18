import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductForm from "./pages/admin/AdminProductForm";

function AdminFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-marfil">
      <p className="font-sans text-sm text-espresso/50">Cargando panel…</p>
    </div>
  );
}

// Punto de entrada del panel de administración. Se carga como un chunk
// separado (ver App.jsx), por lo que Firebase Auth y Storage solo se
// descargan cuando alguien visita /admin.
export default function AdminRoot() {
  return (
    <AuthProvider>
      <Suspense fallback={<AdminFallback />}>
        <Routes>
          <Route path="login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="productos/nuevo" element={<AdminProductForm />} />
              <Route path="productos/:id" element={<AdminProductForm />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
