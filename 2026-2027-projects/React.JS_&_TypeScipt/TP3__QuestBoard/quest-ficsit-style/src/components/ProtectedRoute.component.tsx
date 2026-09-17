import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/auth/auth.store";

/**
 * Les écrans du carnet exigent une session.
 *
 * `checkAuth` a déjà répondu quand ce composant s'affiche : `App` n'a rien
 * rendu tant que `isCheckingAuth` était vrai. Ici, `user` vide veut donc
 * bien dire « pas connecté », et non « on ne sait pas encore ».
 */
const ProtectedRoute = () => {
  const { user } = useAuthStore();

  if (!user) return <Navigate to="/connexion" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
