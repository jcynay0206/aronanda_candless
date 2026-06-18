import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import WaxDivider from "../../components/WaxDivider";

export default function AdminLogin() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(location.state?.from?.pathname ?? "/admin", { replace: true });
    } catch (err) {
      setError("Correo o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-espresso flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-display text-3xl tracking-[0.2em] text-marfil mb-3">ARONANDA</p>
          <WaxDivider tone="marfil" className="max-w-[120px] mx-auto mb-3" />
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-oro-soft">
            Panel de administración
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block font-sans text-xs tracking-[0.2em] uppercase text-marfil/50 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-marfil/20 rounded-sm px-4 py-3 font-sans text-marfil text-sm focus:outline-none focus:border-oro"
            />
          </div>
          <div>
            <label className="block font-sans text-xs tracking-[0.2em] uppercase text-marfil/50 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-marfil/20 rounded-sm px-4 py-3 font-sans text-marfil text-sm focus:outline-none focus:border-oro"
            />
          </div>

          {error && <p className="font-sans text-sm text-terracota">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full font-sans text-sm tracking-[0.25em] uppercase bg-oro text-espresso rounded-full px-6 py-3.5 hover:bg-oro-soft transition-colors duration-300 disabled:opacity-60"
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
