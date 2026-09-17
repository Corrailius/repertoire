import axios from "axios";
import httpClient from "@/lib/http";
import type {
  AuthResponseType,
  LoginInputType,
  RegisterInputType,
  UserType,
} from "./auth.type";

/** Le corps d'erreur de l'API : `{ error: { message, field } }`. */
type ApiErrorData = { message?: string; field?: string };

/**
 * Une erreur d'appel, avec le champ visé quand il y en a un.
 *
 * `field` n'est posé que si l'erreur vise un champ précis (`"email"`), ce qui
 * permet d'écrire dans le formulaire :
 *
 *     const { field, message } = error as ErrorWithField;
 *     if (field) setError(field, { message });
 *     else       setError("root", { message });
 */
export type ErrorWithField = Error & { field?: string };

/**
 * Normalise une erreur axios en `Error` portant le champ visé.
 *
 * Deux cas très différents : le serveur a répondu une erreur (il y a un corps,
 * donc un message et parfois un `field`), ou il n'a pas répondu du tout :
 * éteint, injoignable. Le second n'a jamais de `field`.
 */
function mapAndThrow(error: unknown): never {
  if (axios.isAxiosError(error) && error.response) {
    const data = error.response.data?.error as ApiErrorData | undefined;
    const err: ErrorWithField = new Error(
      data?.message || "Une erreur est survenue"
    );
    err.field = data?.field;
    throw err;
  }
  throw new Error("La guilde n'a pas répondu. Réessayez.");
}

/** `POST /auth/register` : crée le compte et renvoie le token + l'aventurier. */
export const registerApi = async (
  input: RegisterInputType
): Promise<AuthResponseType> => {
  try {
    const { data } = await httpClient.post<AuthResponseType>(
      "/auth/register",
      input
    );
    return data;
  } catch (error) {
    mapAndThrow(error);
  }
};

/**
 * `POST /auth/login` : ouvre la session.
 *
 * Le 401 n'a jamais de `field` : on ne dit pas au visiteur lequel des deux
 * est faux, sinon on lui apprend quels emails existent.
 */
export const loginApi = async (
  input: LoginInputType
): Promise<AuthResponseType> => {
  try {
    const { data } = await httpClient.post<AuthResponseType>(
      "/auth/login",
      input
    );
    return data;
  } catch (error) {
    mapAndThrow(error);
  }
};

/**
 * `GET /auth/me` : qui suis-je ?
 *
 * Le token dit qu'on a le droit d'entrer, pas à quel nom. Seul le serveur peut
 * rendre l'utilisateur, et c'est ce qui permet de restaurer une session après
 * un rechargement de page.
 */
export const meApi = async (): Promise<UserType> => {
  try {
    const { data } = await httpClient.get<{ user: UserType }>("/auth/me");
    return data.user;
  } catch (error) {
    mapAndThrow(error);
  }
};
