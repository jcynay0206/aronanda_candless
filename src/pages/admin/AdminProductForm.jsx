import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import {
  addProduct,
  updateProduct,
  uploadProductImages,
  deleteProductImage,
} from "../../data/products";
import { COLLECTIONS } from "../../data/content";
import WaxDivider from "../../components/WaxDivider";
import { IconArrow, IconClose } from "../../components/Icons";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quitar acentos
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const emptyForm = {
  nombre: "",
  slug: "",
  coleccionId: COLLECTIONS[0].id,
  resumen: "",
  descripcionCorta: "",
  descripcionLarga: "",
  notas: "",
  tamanos: [{ etiqueta: "8 oz · 45-50 hrs", precio: "" }],
  bestseller: false,
  activo: true,
};

export default function AdminProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { products, loading } = useProducts();

  const [form, setForm] = useState(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(!isEdit);

  // Cargar producto existente cuando estamos editando
  useEffect(() => {
    if (!isEdit || loading || loaded) return;
    const product = products.find((p) => p.id === id);
    if (product) {
      setForm({
        nombre: product.nombre ?? "",
        slug: product.slug ?? "",
        coleccionId: product.coleccionId ?? COLLECTIONS[0].id,
        resumen: product.resumen ?? "",
        descripcionCorta: product.descripcionCorta ?? "",
        descripcionLarga: product.descripcionLarga ?? "",
        notas: (product.notas ?? []).join(", "),
        tamanos: product.tamanos?.length ? product.tamanos : emptyForm.tamanos,
        bestseller: Boolean(product.bestseller),
        activo: product.activo !== false,
      });
      setExistingImages(product.img ?? []);
      setSlugTouched(true);
      setLoaded(true);
    }
  }, [isEdit, loading, loaded, products, id]);

  const onField = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const onNombreChange = (value) => {
    setForm((f) => ({
      ...f,
      nombre: value,
      slug: slugTouched ? f.slug : slugify(value),
    }));
  };

  const onTamanoChange = (index, field, value) => {
    setForm((f) => {
      const tamanos = [...f.tamanos];
      tamanos[index] = { ...tamanos[index], [field]: value };
      return { ...f, tamanos };
    });
  };

  const addTamano = () =>
    setForm((f) => ({ ...f, tamanos: [...f.tamanos, { etiqueta: "", precio: "" }] }));

  const removeTamano = (index) =>
    setForm((f) => ({ ...f, tamanos: f.tamanos.filter((_, i) => i !== index) }));

  const onFilesSelected = (e) => {
    setNewFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    e.target.value = "";
  };

  const removeExistingImage = (url) => {
    setExistingImages((imgs) => imgs.filter((u) => u !== url));
    setRemovedImages((r) => [...r, url]);
  };

  const removeNewFile = (index) =>
    setNewFiles((files) => files.filter((_, i) => i !== index));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.nombre || !form.slug || !form.descripcionCorta) {
      setError("Completa al menos nombre, slug y descripción corta.");
      return;
    }

    const tamanos = form.tamanos
      .filter((t) => t.etiqueta && t.precio !== "")
      .map((t) => ({ etiqueta: t.etiqueta, precio: Number(t.precio) }));

    if (tamanos.length === 0) {
      setError("Agrega al menos un tamaño con su precio.");
      return;
    }

    setSaving(true);
    try {
      const coleccion = COLLECTIONS.find((c) => c.id === form.coleccionId)?.nombre ?? "";
      const data = {
        nombre: form.nombre,
        slug: form.slug,
        coleccionId: form.coleccionId,
        coleccion,
        resumen: form.resumen,
        descripcionCorta: form.descripcionCorta,
        descripcionLarga: form.descripcionLarga,
        notas: form.notas
          .split(",")
          .map((n) => n.trim())
          .filter(Boolean),
        tamanos,
        bestseller: form.bestseller,
        activo: form.activo,
      };

      if (isEdit) {
        // Borrar imágenes quitadas
        await Promise.all(removedImages.map((url) => deleteProductImage(url)));
        let img = existingImages;
        if (newFiles.length > 0) {
          const uploaded = await uploadProductImages(id, newFiles);
          img = [...img, ...uploaded];
        }
        await updateProduct(id, { ...data, img });
      } else {
        const docRef = await addProduct({ ...data, img: [] });
        if (newFiles.length > 0) {
          const uploaded = await uploadProductImages(docRef.id, newFiles);
          await updateProduct(docRef.id, { img: uploaded });
        }
      }

      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar el producto: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (isEdit && !loaded) {
    return <p className="font-sans text-sm text-espresso/50">Cargando producto…</p>;
  }

  return (
    <div className="max-w-2xl">
      <Link
        to="/admin"
        className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-espresso/60 hover:text-oro transition-colors mb-6"
      >
        <IconArrow className="w-3.5 h-3.5 rotate-180" />
        Volver a productos
      </Link>

      <p className="font-sans text-xs tracking-[0.4em] uppercase text-oro mb-3">
        {isEdit ? "Editar producto" : "Nuevo producto"}
      </p>
      <h1 className="font-display font-light text-3xl md:text-4xl text-espresso leading-tight mb-3">
        {isEdit ? form.nombre || "Producto" : "Añadir una nueva vela"}
      </h1>
      <WaxDivider tone="oro" className="max-w-[120px] mb-8" />

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Nombre" required value={form.nombre} onChange={onNombreChange} />
          <div>
            <FieldLabel label="Slug (URL)" required />
            <div className="flex items-center gap-2">
              <span className="font-sans text-xs text-espresso/40">/producto/</span>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  onField("slug", slugify(e.target.value));
                }}
                className="flex-1 bg-transparent border border-espresso/15 rounded-sm px-3 py-2.5 font-sans font-light text-sm focus:outline-none focus:border-oro"
              />
            </div>
          </div>
        </div>

        <div>
          <FieldLabel label="Colección" required />
          <select
            value={form.coleccionId}
            onChange={(e) => onField("coleccionId", e.target.value)}
            className="w-full bg-marfil border border-espresso/15 rounded-sm px-3 py-2.5 font-sans font-light text-sm focus:outline-none focus:border-oro"
          >
            {COLLECTIONS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <Field
          label="Resumen (texto corto bajo el nombre)"
          value={form.resumen}
          onChange={(v) => onField("resumen", v)}
        />

        <Field
          label="Descripción corta (tarjeta de producto)"
          required
          value={form.descripcionCorta}
          onChange={(v) => onField("descripcionCorta", v)}
          placeholder="Cera de soya · Café tostado + vainilla · 8 oz · 45-50 hrs"
        />

        <div>
          <FieldLabel label="Descripción larga (página de producto)" />
          <textarea
            rows={4}
            value={form.descripcionLarga}
            onChange={(e) => onField("descripcionLarga", e.target.value)}
            className="w-full bg-transparent border border-espresso/15 rounded-sm px-3 py-2.5 font-sans font-light text-sm focus:outline-none focus:border-oro"
          />
        </div>

        <Field
          label="Notas aromáticas (separadas por coma)"
          value={form.notas}
          onChange={(v) => onField("notas", v)}
          placeholder="Café tostado, Vainilla, Madera cálida"
        />

        {/* Tamaños y precios */}
        <div>
          <FieldLabel label="Tamaños y precios" required />
          <div className="space-y-3">
            {form.tamanos.map((t, i) => (
              <div key={i} className="flex gap-3 items-start">
                <input
                  type="text"
                  placeholder="Etiqueta (ej. 8 oz · 45-50 hrs)"
                  value={t.etiqueta}
                  onChange={(e) => onTamanoChange(i, "etiqueta", e.target.value)}
                  className="flex-1 bg-transparent border border-espresso/15 rounded-sm px-3 py-2.5 font-sans font-light text-sm focus:outline-none focus:border-oro"
                />
                <div className="flex items-center gap-1">
                  <span className="font-sans text-sm text-espresso/50">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Precio"
                    value={t.precio}
                    onChange={(e) => onTamanoChange(i, "precio", e.target.value)}
                    className="w-24 bg-transparent border border-espresso/15 rounded-sm px-3 py-2.5 font-sans font-light text-sm focus:outline-none focus:border-oro"
                  />
                </div>
                {form.tamanos.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTamano(i)}
                    aria-label="Quitar tamaño"
                    className="p-2.5 text-espresso/40 hover:text-terracota transition-colors"
                  >
                    <IconClose className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addTamano}
            className="mt-3 font-sans text-xs tracking-[0.2em] uppercase text-espresso/60 border-b border-oro pb-0.5 hover:text-oro transition-colors"
          >
            + Añadir otro tamaño
          </button>
        </div>

        {/* Imágenes */}
        <div>
          <FieldLabel label="Fotos del producto" />
          {existingImages.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-3">
              {existingImages.map((url) => (
                <div key={url} className="relative h-20 w-20 rounded-sm overflow-hidden group">
                  <img src={url} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(url)}
                    aria-label="Quitar imagen"
                    className="absolute top-1 right-1 bg-espresso/70 text-marfil rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <IconClose className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {newFiles.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-3">
              {newFiles.map((file, i) => (
                <div key={i} className="relative h-20 w-20 rounded-sm overflow-hidden group border border-oro/40">
                  <img src={URL.createObjectURL(file)} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeNewFile(i)}
                    aria-label="Quitar imagen"
                    className="absolute top-1 right-1 bg-espresso/70 text-marfil rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <IconClose className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <label className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase border border-espresso/20 rounded-full px-5 py-2.5 cursor-pointer hover:border-oro transition-colors">
            + Subir fotos
            <input type="file" accept="image/*" multiple onChange={onFilesSelected} className="hidden" />
          </label>
          <p className="font-sans text-xs text-espresso/45 mt-2">
            La primera foto se usa como imagen principal en la tienda.
          </p>
        </div>

        {/* Switches */}
        <div className="flex flex-wrap gap-6">
          <label className="inline-flex items-center gap-2 font-sans text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={form.bestseller}
              onChange={(e) => onField("bestseller", e.target.checked)}
              className="accent-[var(--color-oro)]"
            />
            Mostrar en Bestsellers
          </label>
          <label className="inline-flex items-center gap-2 font-sans text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={form.activo}
              onChange={(e) => onField("activo", e.target.checked)}
              className="accent-[var(--color-oro)]"
            />
            Visible en la tienda
          </label>
        </div>

        {error && <p className="font-sans text-sm text-terracota">{error}</p>}

        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-3 font-sans text-sm tracking-[0.25em] uppercase bg-espresso text-marfil rounded-full px-8 py-4 hover:bg-oro hover:text-espresso transition-colors duration-300 disabled:opacity-60"
          >
            {saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear producto"}
          </button>
          <Link
            to="/admin"
            className="inline-flex items-center font-sans text-sm tracking-[0.25em] uppercase text-espresso/60 hover:text-oro transition-colors px-4"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

function FieldLabel({ label, required }) {
  return (
    <label className="block font-sans text-xs tracking-[0.2em] uppercase text-espresso/50 mb-2">
      {label}
      {required && <span className="text-terracota"> *</span>}
    </label>
  );
}

function Field({ label, value, onChange, required, placeholder, className = "" }) {
  return (
    <div className={className}>
      <FieldLabel label={label} required={required} />
      <input
        type="text"
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border border-espresso/15 rounded-sm px-3 py-2.5 font-sans font-light text-sm focus:outline-none focus:border-oro"
      />
    </div>
  );
}
