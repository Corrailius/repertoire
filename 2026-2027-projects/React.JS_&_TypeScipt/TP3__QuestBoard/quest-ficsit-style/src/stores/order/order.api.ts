import axios from "axios";
import httpClient from "@/lib/http";
import type { ErrorWithField } from "@/stores/auth/auth.api";
import type {
  OrderFiltersType,
  OrderInputType,
  OrderType,
  ScopeType,
} from "./order.type";

/** Le corps d'erreur de l'API : `{ error: { message, field } }`. */
type ApiErrorData = { message?: string; field?: string };

/** Normalise une erreur axios en `Error` portant le champ visé. Voir `auth.api`. */
function mapAndThrow(error: unknown): never {
  if (axios.isAxiosError(error) && error.response) {
    const data = error.response.data?.error as ApiErrorData | undefined;
    const err: ErrorWithField = new Error(
      data?.message || "Une erreur est survenue"
    );
    err.field = data?.field;
    throw err;
  }
  throw new Error("FICSIT n'a pas répondu. Réessayez.");
}

/**
 * `GET /tasks?scope=…` : les trois vues du registre.
 *
 * L'endpoint et ses paramètres (`scope`, `difficulty`, `q`) sont ceux de
 * l'API fournie, on n'y touche pas : `board` liste les commandes que
 * personne n'a prises, `mine` celles qu'on a prises, `history` celles qu'on
 * a livrées. Les filtres se cumulent.
 */
export const getOrdersApi = async (
  scope: ScopeType,
  filters: OrderFiltersType = {}
): Promise<OrderType[]> => {
  try {
    const { data } = await httpClient.get<OrderType[]>("/tasks", {
      params: {
        scope,
        // Un filtre vide n'est pas envoyé : axios ignore les `undefined`.
        difficulty: filters.difficulty || undefined,
        q: filters.q || undefined,
      },
    });
    return data;
  } catch (error) {
    mapAndThrow(error);
  }
};

/** `POST /tasks` : soumettre une commande. Elle part au tableau, personne ne l'a prise. */
export const createOrderApi = async (
  input: OrderInputType
): Promise<OrderType> => {
  try {
    const { data } = await httpClient.post<OrderType>("/tasks", input);
    return data;
  } catch (error) {
    mapAndThrow(error);
  }
};

/** `POST /tasks/:id/claim` : prendre une commande en charge. Sans corps. 409 si un autre pionnier vous a doublé. */
export const claimOrderApi = async (id: string): Promise<OrderType> => {
  try {
    const { data } = await httpClient.post<OrderType>(`/tasks/${id}/claim`);
    return data;
  } catch (error) {
    mapAndThrow(error);
  }
};

/** `POST /tasks/:id/complete` : livrer sa commande. Sans corps. */
export const deliverOrderApi = async (id: string): Promise<OrderType> => {
  try {
    const { data } = await httpClient.post<OrderType>(`/tasks/${id}/complete`);
    return data;
  } catch (error) {
    mapAndThrow(error);
  }
};
