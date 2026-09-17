/** Les quatre valeurs acceptées par l'API. Le serveur refuse tout le reste. */
export const TIERS = ["EASY", "NORMAL", "HARD", "EPIC"] as const;

export type TierType = (typeof TIERS)[number];

/**
 * L'API parle anglais, l'écran parle FICSIT.
 *
 * Chaque palier correspond à la machine qui le fabrique : plus il faut
 * d'intrants, plus la commande est complexe.
 */
export const TIER_LABELS: Record<TierType, string> = {
  EASY: "Extracteur",
  NORMAL: "Constructeur",
  HARD: "Assembleur",
  EPIC: "Manufacturier",
};

/** Les trois vues du registre. C'est le `scope` de `GET /tasks`. */
export const SCOPES = ["board", "mine", "history"] as const;

export type ScopeType = (typeof SCOPES)[number];

/** Le pionnier tel qu'il apparaît sur une commande. */
export type PioneerType = {
  id: string;
  username: string;
};

/**
 * Une commande de production, telle que l'API la renvoie.
 *
 * Son état se lit sur deux champs, il n'y a pas de booléen `done` :
 * `claimedBy` vide, elle est au tableau. Rempli, elle est en cours.
 * Plus `completedAt`, elle est livrée.
 *
 * Les clés (`difficulty`, `reward`, `tags`…) sont celles de l'API fournie :
 * on ne les renomme pas, seuls les types et l'écran changent de vocabulaire.
 */
export type OrderType = {
  id: string;
  title: string;
  description: string | null;
  difficulty: TierType;
  reward: number;
  tags: string[];
  author: PioneerType;
  claimedBy: PioneerType | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

/** Ce qu'on envoie pour soumettre une commande. */
export type OrderInputType = {
  title: string;
  reward: number;
  description?: string;
  difficulty?: TierType;
  tags?: string[];
};

/** Les filtres de `GET /tasks`, cumulables avec n'importe quel scope. */
export type OrderFiltersType = {
  difficulty?: TierType | "";
  q?: string;
};

/** L'état du store des commandes. */
export type OrderState = {
  orders: OrderType[];
  isLoading: boolean;
  fetchOrders: (scope: ScopeType, filters?: OrderFiltersType) => Promise<void>;
  createOrder: (input: OrderInputType) => Promise<OrderType>;
  claimOrder: (id: string) => Promise<void>;
  deliverOrder: (id: string) => Promise<void>;
};
