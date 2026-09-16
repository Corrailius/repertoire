# Registre FICSIT — le front

Le TP **Formulaires et gestion d'état** (B2 · React & TypeScript).

Le projet est monté, câblé, et vide. Vous écrivez les formulaires et les stores.

## Démarrer

**1. L'API, dans son propre dépôt.** Elle est livrée finie, vous n'y touchez pas.
Vous la clonez une fois, vous la lancez, et vous la laissez tourner dans son coin.

```bash
git clone <url-du-depot-api> carnet-de-quetes-api
cd carnet-de-quetes-api
npm install
npm run setup      # génère le client Prisma, crée la base, la remplit
npm run dev        # http://localhost:4000
```

Vérifiez qu'elle répond : <http://localhost:4000/health> doit afficher
`{"ok":true}`. Laissez ce terminal ouvert.

**2. Votre fichier `.env`.** Il n'est pas dans le dépôt — chacun crée le sien,
à la racine de ce projet-ci :

```bash
cp .env.example .env
```

Une seule variable, `VITE_API_URL=http://localhost:4000`. Vite n'expose au
navigateur que ce qui commence par `VITE_`, et il ne relit le fichier qu'au
démarrage : **toute modification du `.env` demande de relancer `npm run dev`**.

**3. Le front**, dans un second terminal :

```bash
npm install
npm install react-hook-form axios
npm run dev        # http://localhost:5173
```

Deux processus, deux ports, deux terminaux : c'est la situation normale d'une
application web. Le front ne sert que des fichiers, l'API ne sert que des données.

## Ce qui est déjà là

| | |
| --- | --- |
| Vite, React 19, TypeScript | configurés, `npm run dev` marche tout de suite |
| Tailwind CSS | v4, via `@tailwindcss/vite`. Une ligne dans `index.css`, rien d'autre |
| React Router | les cinq routes sont déclarées dans `App.tsx` |
| Zustand | installé, aucun store écrit |
| `src/types/order.type.ts` | `OrderType`, les paliers et leurs libellés |
| `Layout.component.tsx` | l'en-tête et la navigation |
| L'alias `@/` | `@/lib/http` plutôt que `../../lib/http` |

**`react-hook-form` et `axios` ne sont pas installés.** C'est votre premier
`npm install`. Le client HTTP non plus n'existe pas : vous l'écrivez, il fait
trois lignes.

## Ce que vous écrivez

**Les stores**, dans `src/stores/`, à créer. **Un dossier par domaine, trois
fichiers dedans**, comme dans une vraie application :

```
src/lib/http.ts                 l'instance axios : baseURL, et le token plus tard
src/stores/auth/auth.api.ts     registerApi, loginApi : les appels, rien d'autre
src/stores/auth/auth.store.ts   le token, l'aventurier connecté, login/register/logout
src/stores/auth/auth.type.ts    UserType, AuthResponseType, AuthState
src/stores/order/…               les trois mêmes, pour les commandes
```

`api` appelle · `store` retient · `type` décrit. Aucun composant n'importe
axios : il appelle le store, qui appelle l'`api`.

**Les formulaires**, par difficulté croissante.

| Page | Ce qu'on y découvre |
| --- | --- |
| `/connexion` | `useForm`, `register`, `handleSubmit`, `formState` |
| `/inscription` | les règles de validation, la confirmation, le 409 |
| `/commandes/nouvelle` | `Controller` sur le palier, `useFieldArray` sur les ressources |

Une commande a cinq champs : titre, description, palier, **récompense** en
crédits FICSIT, ressources. Attention à la récompense : un input rend une chaîne, il
faut `valueAsNumber: true` dans le `register`, sinon l'API répond 400.

**Les trois écrans du registre.** Ce sont trois lectures de la même table,
via `GET /tasks?scope=`. Un seul store, une seule fonction d'appel.

| Écran | `scope` | Ce qu'on y fait |
| --- | --- | --- |
| Le tableau | `board` | les commandes que personne n'a prises. On en **prend une en charge** |
| Mes commandes | `mine` | celles qu'on a prises en charge. On les **livre** |
| Le registre | `history` | celles qu'on a livrées, et le **total en crédits FICSIT** |

Prendre en charge et livrer ne sont pas des `PATCH` : ce sont `POST /tasks/:id/claim`
et `POST /tasks/:id/complete`, sans corps.

**Les filtres**, cumulables avec n'importe quel écran : palier, et
recherche par titre. Aucune valeur calculable ne se range dans un state, le
total du registre compris.

**La route protégée**, sans token, `/` renvoie sur `/connexion`.

## Rester connecté

Les deux premiers points ne sont pas optionnels : sans eux, aucune route
`/tasks` ne vous répondra.

**1. Le token dans le `localStorage`.** À la connexion et à l'inscription vous
l'écrivez, à la déconnexion vous l'effacez. Deux lignes dans le store.

**2. L'intercepteur, dans `lib/http.ts`.** Il pose le token sur chaque requête
sortante, une fois pour toutes :

```ts
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("registre-ficsit-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

Sans lui, il faudrait recopier l'en-tête dans chacune de vos fonctions d'appel.

**3. Bonus : survivre au F5.** Un token dans le `localStorage` ne suffit pas.
Au rechargement vous savez que vous avez un token, mais pas **qui** vous êtes :
l'utilisateur, lui, n'est pas stocké. C'est à ça que sert `GET /auth/me`.
Appelez-la une fois au démarrage si un token existe, et remplissez le store
avec ce qu'elle renvoie.

Ce bonus cache un piège, et c'est tout son intérêt. Pendant que `/auth/me` est
en vol, `user` vaut encore `null` : votre route protégée vous renvoie donc sur
`/connexion` avant même que la réponse arrive. Il faut un troisième état.

```
user = null,  isCheckingAuth = true    je ne sais pas encore  →  n'affichez rien
user = null,  isCheckingAuth = false   pas de session         →  /connexion
user = { … }                            connecté               →  la page
```

« Je n'ai pas de session » et « je ne sais pas encore si j'en ai une » sont deux
choses différentes. Les confondre est le bug le plus courant de tout écran
d'authentification.

**Pourquoi pas un cookie ?** Un cookie posé en JavaScript n'est pas plus sûr
qu'un `localStorage` : même exposition au XSS. Le cookie qui protège vraiment
est le `httpOnly`, posé par le serveur, et il demande de modifier l'API et sa
configuration CORS. Ce n'est pas le sujet de cette séance.

## Les deux règles du sujet

**Un champ de formulaire n'est jamais dans un store.** `email`, `password`,
`title`, `tags` : react-hook-form les tient, personne d'autre. Le store ne
reçoit que ce qui survit à la page — le token, l'utilisateur, les commandes.

**Le serveur a le dernier mot.** Vos règles côté client évitent un aller-retour
inutile, elles ne remplacent pas celles du serveur. Quand il répond quand même
une erreur, elle doit s'afficher **sur le bon champ** :

```ts
catch (error) {
  if (error instanceof ApiError && error.field) {
    setError(error.field as keyof FormType, { message: error.message });
  } else {
    setError("root", { message: "..." });
  }
}
```

Le tableau des règles du serveur et la liste des routes sont dans le
README du dépôt de l'API.

## Structure

```
src/
├── App.tsx                        les routes
├── types/order.type.ts             OrderType, OrderInputType, les paliers
├── components/
│   ├── Layout.component.tsx       en-tête + <Outlet />
│   └── Consigne.component.tsx     l'échafaudage, à supprimer à la fin
├── pages/                         les cinq pages, vides
├── lib/                           à créer : http.ts
└── stores/                        à créer : auth/ et order/
```

## Vérifier

```bash
npm run lint
npm run build
```

Les deux doivent passer avant de rendre.

## Voir vivre les états de chargement

Côté API, `SLOW_MS=1200 npm run dev` ralentit chaque requête de 1,2 seconde.
De quoi vérifier que `isSubmitting` désactive bien le bouton, et qu'un double
clic n'envoie pas deux commandes.
