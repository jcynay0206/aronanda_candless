import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { deleteProduct, updateProduct, importSeedProducts, deleteProductImage } from "../../data/products";
import { COLLECTIONS, ACCENT_CLASS } from "../../data/content";
import WaxDivider from "../../components/WaxDivider";

export default function AdminDashboard() {
  const { products, loading, error } = useProducts();
  const [busyId, setBusyId] = useState(null);
  const [importing, setImporting] = useState(false);

  const coleccionNombre = (id) => COLLECTIONS.find((c) => c.id === id)?.nombre ?? id;

  const handleToggleActivo = async (p) => {
    setBusyId(p.id);
    try {
      await updateProduct(p.id, { activo: p.activo === false });
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`¿Eliminar "${p.nombre}"? Esta acción no se puede deshacer.`)) return;
    setBusyId(p.id);
    try {
      await Promise.all((p.img ?? []).map((url) => deleteProductImage(url)));
      await deleteProduct(p.id);
    } finally {
      setBusyId(null);
    }
  };

  const handleImport = async () => {
    setImporting(true);
    try {
      await importSeedProducts();
    } catch (err) {
      console.error(err);
      alert("No se pudo importar el catálogo inicial: " + err.message);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
        <div>
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-oro mb-3">Panel</p>
          <h1 className="font-display font-light text-3xl md:text-4xl text-espresso leading-tight">
            Productos
          </h1>
          <WaxDivider tone="oro" className="max-w-[120px] mt-3" />
        </div>
        <Link
          to="/admin/productos/nuevo"
          className="inline-flex items-center justify-center font-sans text-sm tracking-[0.2em] uppercase bg-espresso text-marfil rounded-full px-6 py-3 hover:bg-oro hover:text-espresso transition-colors duration-300 w-fit"
        >
          + Nuevo producto
        </Link>
      </div>

      {error && (
        <p className="font-sans text-sm text-terracota mb-6">
          Error al cargar productos: {error.message}. Revisa la configuración de Firebase en .env.
        </p>
      )}

      {loading && (
        <p className="font-sans text-sm text-espresso/50">Cargando productos…</p>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="bg-arena rounded-sm p-8 max-w-xl">
          <h2 className="font-display text-2xl text-espresso mb-3">Aún no hay productos</h2>
          <p className="font-sans font-light text-sm text-espresso/70 mb-6">
            Puedes empezar desde cero con "Nuevo producto", o importar el catálogo
            inicial de 12 velas de ejemplo (con imágenes de marcador) para usarlo
            como punto de partida y editarlo después.
          </p>
          <button
            type="button"
            onClick={handleImport}
            disabled={importing}
            className="font-sans text-sm tracking-[0.2em] uppercase border border-oro/60 rounded-full px-6 py-3 hover:bg-oro hover:text-espresso transition-colors duration-300 disabled:opacity-60"
          >
            {importing ? "Importando…" : "Importar catálogo inicial (12 productos)"}
          </button>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="overflow-x-auto -mx-6 md:mx-0">
          <table className="w-full text-left font-sans text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-espresso/15 text-espresso/50 text-xs uppercase tracking-[0.2em]">
                <th className="py-3 px-6 md:px-0 font-normal">Producto</th>
                <th className="py-3 px-3 font-normal">Colección</th>
                <th className="py-3 px-3 font-normal">Precio</th>
                <th className="py-3 px-3 font-normal">Bestseller</th>
                <th className="py-3 px-3 font-normal">Estado</th>
                <th className="py-3 px-6 md:px-0 font-normal text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-espresso/10">
              {products.map((p) => (
                <tr key={p.id} className={busyId === p.id ? "opacity-50" : ""}>
                  <td className="py-3 px-6 md:px-0">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-sm bg-arena">
                        {p.img?.[0] && (
                          <img src={p.img[0]} alt="" className="h-full w-full object-cover" />
                        )}
                      </div>
                      <div>
                        <p className="text-espresso">{p.nombre}</p>
                        <p className="text-espresso/45 text-xs">/{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className={`py-3 px-3 ${ACCENT_CLASS(p.coleccionId)}`}>
                    {coleccionNombre(p.coleccionId)}
                  </td>
                  <td className="py-3 px-3 text-oro font-display">
                    ${p.tamanos?.[0]?.precio ?? "—"}
                  </td>
                  <td className="py-3 px-3">{p.bestseller ? "Sí" : "—"}</td>
                  <td className="py-3 px-3">
                    <button
                      type="button"
                      onClick={() => handleToggleActivo(p)}
                      className={`text-xs tracking-[0.15em] uppercase rounded-full px-3 py-1 border transition-colors ${
                        p.activo === false
                          ? "border-espresso/15 text-espresso/40"
                          : "border-salvia/50 text-salvia"
                      }`}
                    >
                      {p.activo === false ? "Oculto" : "Visible"}
                    </button>
                  </td>
                  <td className="py-3 px-6 md:px-0 text-right whitespace-nowrap">
                    <Link
                      to={`/admin/productos/${p.id}`}
                      className="text-espresso/70 hover:text-oro transition-colors mr-4"
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(p)}
                      className="text-espresso/40 hover:text-terracota transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
