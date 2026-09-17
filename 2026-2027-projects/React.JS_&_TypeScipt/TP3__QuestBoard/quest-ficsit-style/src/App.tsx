import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.component";
import ProtectedRoute from "./components/ProtectedRoute.component";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrdersPage from "./pages/OrdersPage";
import BoardPage from "./pages/BoardPage";
import HistoryPage from "./pages/HistoryPage";
import OrderFormPage from "./pages/OrderFormPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuthStore } from "@/stores/auth/auth.store";

const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  /*
   * Tant qu'on ne sait pas si une session existe, on n'affiche rien.
   * « Pas de session » et « je ne sais pas encore » sont deux états distincts,
   * et les confondre ferait clignoter l'écran de connexion à chaque F5.
   */
  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-100 text-sm text-stone-400">
        Ouverture du registre…
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Les écrans du registre : session obligatoire. */}
          <Route element={<ProtectedRoute />}>
            <Route index element={<OrdersPage />} />
            <Route path="tableau" element={<BoardPage />} />
            <Route path="historique" element={<HistoryPage />} />
            <Route path="commandes/nouvelle" element={<OrderFormPage />} />
          </Route>

          <Route path="connexion" element={<LoginPage />} />
          <Route path="inscription" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
