/** L'aventurier tel que l'API le renvoie. Jamais son mot de passe. */
export type UserType = {
  id: string;
  email: string;
  username: string;
};

/** Ce que renvoient `POST /auth/register` et `POST /auth/login`. */
export type AuthResponseType = {
  token: string;
  user: UserType;
};

/** Ce qu'on envoie à `POST /auth/register`. Pas de confirmation : elle reste au navigateur. */
export type RegisterInputType = {
  email: string;
  username: string;
  password: string;
};

/** Ce qu'on envoie à `POST /auth/login`. */
export type LoginInputType = {
  email: string;
  password: string;
};

/** L'état du store d'authentification. */
export type AuthState = {
  user: UserType | null;
  token: string | null;
  isLoading: boolean;
  /** Vrai tant qu'on ne sait pas encore si une session existe. */
  isCheckingAuth: boolean;
  register: (input: RegisterInputType) => Promise<UserType>;
  login: (input: LoginInputType) => Promise<UserType>;
  logout: () => void;
  /** Restaure la session au démarrage, si un token traîne dans le localStorage. */
  checkAuth: () => Promise<void>;
};
