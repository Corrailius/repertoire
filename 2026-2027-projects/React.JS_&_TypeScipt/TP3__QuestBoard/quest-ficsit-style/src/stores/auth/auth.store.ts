import { create } from "zustand";
import { TOKEN_KEY } from "@/lib/http";
import { loginApi, meApi, registerApi } from "./auth.api";
import type { AuthState } from "./auth.type";

/**
 * Ce qui survit à la fermeture du formulaire : l'aventurier connecté et son
 * token. Aucun champ de saisie n'a rien à faire ici, react-hook-form les tient.
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true,

  register: async (input) => {
    set({ isLoading: true });
    try {
      const { token, user } = await registerApi(input);
      localStorage.setItem(TOKEN_KEY, token);
      set({ token, user });
      return user;
    } finally {
      // Succès ou échec, le loader retombe. C'est tout l'intérêt du finally.
      set({ isLoading: false });
    }
  },

  login: async (input) => {
    set({ isLoading: true });
    try {
      const { token, user } = await loginApi(input);
      localStorage.setItem(TOKEN_KEY, token);
      set({ token, user });
      return user;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ token: null, user: null });
  },

  /*
   * Appelée une fois au démarrage de l'application.
   *
   * Le token survit au rechargement, l'utilisateur non : on le redemande au
   * serveur. Tant que la réponse n'est pas là, `isCheckingAuth` reste vrai,
   * et l'écran n'affiche rien. Sans ça, la route protégée renverrait sur
   * /connexion avant même que la réponse arrive.
   *
   * En développement, StrictMode l'appelle deux fois. C'est un GET sans effet
   * de bord, ça ne pose pas de problème.
   */
  checkAuth: async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      set({ isCheckingAuth: false });
      return;
    }

    try {
      const user = await meApi();
      set({ token, user });
    } catch {
      // Token expiré, ou compte supprimé : on repart propre.
      localStorage.removeItem(TOKEN_KEY);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
