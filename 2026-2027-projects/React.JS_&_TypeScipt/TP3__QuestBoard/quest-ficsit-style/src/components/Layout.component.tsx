import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { useAuthStore } from "@/stores/auth/auth.store";

const links = [
  { to: "/", label: "Mes commandes", end: true },
  { to: "/tableau", label: "Le tableau", end: false },
  { to: "/historique", label: "Registre", end: false },
  { to: "/commandes/nouvelle", label: "Nouvelle commande", end: false },
];

const Layout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/connexion");
  };

  return (
    <div className="flex min-h-screen flex-col bg-stone-100">
      <header className="bg-stone-900 shadow-md">
        <div className="mx-auto flex w-full max-w-4xl items-center gap-4 px-6 py-4">
          <span className="text-xl">🏭</span>

          <span className="text-xl font-bold tracking-tight text-stone-50">
            Registre FICSIT
          </span>

          {/* La navigation n'a de sens qu'une fois connecté. */}
          {user && (
            <nav className="ml-4 flex gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "bg-amber-500 font-semibold text-stone-900"
                        : "text-stone-300 hover:bg-stone-800"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          )}

          {user ? (
            <div className="ml-auto flex items-center gap-3">
              <span className="text-sm text-stone-300">{user.username}</span>

              <button
                type="button"
                onClick={onLogout}
                className="cursor-pointer rounded-lg border border-stone-700 px-3 py-1.5 text-sm text-stone-300 transition-colors hover:bg-stone-800"
              >
                Se déconnecter
              </button>
            </div>
          ) : (
            <NavLink
              to="/connexion"
              className="ml-auto rounded-lg px-3 py-1.5 text-sm text-stone-300 transition-colors hover:bg-stone-800"
            >
              Se connecter
            </NavLink>
          )}
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-stone-200 bg-white py-4 text-center text-xs text-stone-400">
        React &amp; TypeScript · B2 Ynov
      </footer>

      {/* Un seul Toaster pour toute l'application. */}
      <Toaster position="bottom-right" richColors />
    </div>
  );
};

export default Layout;
