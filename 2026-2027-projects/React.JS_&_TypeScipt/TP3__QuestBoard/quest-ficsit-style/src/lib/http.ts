import axios from "axios";

/** La clé du token dans le `localStorage`. Le store écrit, l'intercepteur lit. */
export const TOKEN_KEY = "registre-ficsit-token";

/**
 * L'instance axios partagée par tous les fichiers `*.api.ts`.
 *
 * Elle évite de réécrire l'URL de l'API à chaque appel :
 * `httpClient.post("/auth/register")` part sur `http://localhost:4000/auth/register`.
 */
export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/**
 * Le token part sur chaque requête sortante, une fois pour toutes.
 *
 * Sans lui, il faudrait recopier l'en-tête dans chacune des fonctions d'appel,
 * et toutes les routes `/tasks` répondraient 401.
 */
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default httpClient;
