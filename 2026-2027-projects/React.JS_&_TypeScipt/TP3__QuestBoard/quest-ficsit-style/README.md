# ACCORD DE LICENCE PIONNIER
### Registre de Production FICSIT™ — module logiciel non-officiel, édition « B2 · React & TypeScript »

*« Construct. Automate. Explore & Exploit. »* — devise déposée de FICSIT Inc.

**EN CLONANT, EN INSTALLANT, EN EXÉCUTANT `npm run dev`, OU EN LISANT SIMPLEMENT CES LIGNES JUSQU'AU BOUT, VOUS (CI-APRÈS « LE PIONNIER ») RECONNAISSEZ AVOIR PRIS CONNAISSANCE DE L'INTÉGRALITÉ DU PRÉSENT ACCORD — CE QUE PERSONNE NE FAIT JAMAIS — ET ACCEPTEZ D'Y ÊTRE LIÉ, SANS RÉSERVE, ET SANS ASSISTANCE JURIDIQUE, LAQUELLE N'EST DE TOUTE FAÇON PAS COUVERTE PAR VOTRE CONTRAT.**

---

## Préambule

ATTENDU QUE FICSIT Inc. étend ses opérations vers la planète MASSAGE-2(A-B)b, système binaire d'Akycha, dans le cadre du programme *Project Assembly* ;

ATTENDU QU'il devient nécessaire de tracer, d'assigner et de livrer les Commandes de Production sans recourir à un tableur partagé, une pratique que la Direction juge « incompatible avec la vision FICSIT » ;

ATTENDU QUE le Pionnier a librement souscrit à un contrat d'engagement dont les clauses exactes demeurent, comme il se doit, volontairement floues ;

ATTENDU QUE toute ressemblance avec un TP noté du module *Formulaires et gestion d'état* (B2 · Ynov) est **strictement contractuelle** et ne saurait engager la responsabilité de qui que ce soit ;

IL EST CONVENU CE QUI SUIT.

---

## Article 1 — Définitions

| Terme du présent Accord | Signifie, en langage de sous-traitant |
| --- | --- |
| **le Registre** | l'application web objet du présent dépôt (React 19, TypeScript, Tailwind CSS v4, Zustand, react-hook-form, axios) |
| **le Pionnier** | vous. Toute personne exécutant le code, y compris par accident |
| **ADA** | l'intelligence embarquée qui, dans l'univers FICSIT, vous parle constamment. Ici, elle a été remplacée par des messages `toast` |
| **une Commande de Production** | l'unité de travail du Registre : titre, description, Palier, récompense, Ressources requises |
| **le Tableau** | la liste des Commandes que personne n'a encore prises en charge (`GET /tasks?scope=board`) |
| **la Passerelle d'Authentification** | les écrans `/connexion` et `/inscription`, hérités d'un accord antérieur (voir Article 5) |
| **le Jeton** | ce qui prouve au serveur que le Pionnier a le droit d'entrer. Ne prouve rien sur son identité |

---

## Article 2 — Objet de l'Accord

Le Registre permet au Pionnier de :

1. Consulter **le Tableau** — les Commandes libres, filtrables par Palier et par titre ;
2. **Prendre en charge** une Commande — elle quitte le Tableau et rejoint « Mes commandes » ;
3. **Livrer** une Commande prise en charge — elle rejoint le Registre de Production et déclenche le versement des Crédits FICSIT ;
4. **Soumettre** une nouvelle Commande, laquelle rejoint le Tableau à son tour.

FICSIT Inc. rappelle que ce cycle constitue l'intégralité de la proposition de valeur. Toute attente supplémentaire relève de l'optimisme du Pionnier, non d'une clause de ce contrat.

---

## Article 3 — Conditions préalables à l'engagement

Le Pionnier certifie disposer, avant toute exécution :

- **3.1.** Node.js 18 ou supérieur, ainsi que npm ;
- **3.2.** Un terminal, de préférence deux ouverts simultanément (voir Article 4) ;
- **3.3.** L'API fournie séparément, laquelle est livrée finie et ne fait l'objet d'aucune modification autorisée en vertu du présent Accord ;
- **3.4.** Une tolérance raisonnable à la couleur ambre.

Le non-respect de l'Article 3.1 engage la seule responsabilité du Pionnier, y compris moralement.

---

## Article 4 — Procédure d'intégration (« Onboarding »)

**4.1. L'API, dans son propre dépôt.** Elle est livrée finie ; le Pionnier ne la modifie pas, ne la questionne pas, et la laisse tourner dans son coin, tel un système hérité que personne n'ose éteindre.

```bash
git clone <url-du-depot-api> registre-ficsit-api
cd registre-ficsit-api
npm install
npm run setup      # génère le client Prisma, crée la base, la remplit
npm run dev        # http://localhost:4000
```

Le Pionnier vérifie que l'API répond : <http://localhost:4000/health> doit afficher `{"ok":true}`. Ce terminal reste ouvert pour la durée de l'engagement.

**4.2. Le fichier `.env`, propre à chaque Pionnier.** Il n'est pas versionné — chacun établit le sien, à la racine du présent projet :

```bash
cp .env.example .env
```

Une seule variable, `VITE_API_URL=http://localhost:4000`. Vite n'expose au navigateur que ce qui commence par `VITE_`, et ne relit ce fichier qu'au démarrage : **toute modification exige un redémarrage de `npm run dev`**, sans exception, sans recours.

**4.3. Le Registre lui-même**, dans un second terminal :

```bash
npm install
npm run dev        # http://localhost:5173
```

Deux processus, deux ports, deux terminaux : FICSIT Inc. confirme qu'il s'agit là d'une situation normale, et non d'un dysfonctionnement du poste de travail.

---

## Article 5 — Anomalie connue concernant la Passerelle d'Authentification

Le Pionnier pourra constater que les écrans `/connexion` et `/inscription` font encore référence à une entité tierce désignée « la Guilde », ainsi qu'à la notion d'« aventurier ». Cette terminologie est **antérieure** à la présente réorganisation et provient d'un accord de fusion resté, à ce jour, non finalisé.

FICSIT Inc. ne confirme ni n'infirme l'existence de ladite Guilde. Le Jeton qu'elle délivre reste néanmoins pleinement valide sur toutes les routes `/tasks` du Registre : le Pionnier est donc invité à s'y connecter sans poser de question, dans la plus pure tradition FICSIT.

---

## Article 6 — Cycle de vie d'une Commande

Une Commande n'a pas d'état booléen. Son état se déduit de deux champs, conformément au schéma renvoyé par l'API :

| `claimedBy` | `completedAt` | État observable |
| --- | --- | --- |
| `null` | `null` | au Tableau, libre |
| rempli | `null` | en cours, chez son Pionnier |
| rempli | rempli | livrée, au Registre |

| Écran | `scope` | Action disponible |
| --- | --- | --- |
| Le tableau (`/tableau`) | `board` | **Prendre en charge** — `POST /tasks/:id/claim`, sans corps |
| Mes commandes (`/`) | `mine` | **Livrer** — `POST /tasks/:id/complete`, sans corps |
| Le registre (`/historique`) | `history` | consultation seule, total en Crédits FICSIT inclus |

**6.1.** Si un autre Pionnier prend en charge la Commande en même temps que vous, le serveur répond `409`. FICSIT Inc. considère ceci comme une preuve de la vigueur de la concurrence interne, et non comme un défaut du Registre.

---

## Article 7 — Rémunération (Crédits FICSIT)

Toute Commande porte une récompense, exprimée en Crédits FICSIT, dont la valeur légale et l'usage réel restent à la discrétion de la Direction. Le champ correspondant du formulaire (`/commandes/nouvelle`) exige `valueAsNumber: true` dans le `register` : un `<input type="number">` renvoie une chaîne de caractères par défaut, et le serveur rejette toute chaîne avec un code `400`, sans commentaire.

Bornes contractuelles : un Crédit FICSIT au minimum, mille au maximum. FICSIT Inc. rappelle qu'aucune de ces sommes n'est indexée sur quoi que ce soit.

---

## Article 8 — Ressources requises

Chaque Commande peut lister jusqu'à **cinq** Ressources requises, de **seize caractères** chacune — limites fixées unilatéralement par le serveur et non négociables par le présent Accord. Techniquement, cette liste repose sur `useFieldArray` : chaque ligne possède un `field.id` stable, lequel sert de `key` React. L'index de la ligne, lui, ne sert jamais de `key` : retirer une Ressource décalerait les suivantes, et React réutiliserait le mauvais champ — un vice caché que FICSIT Inc. ne saurait couvrir.

---

## Article 9 — Paliers de Production

En lieu et place d'une « difficulté », chaque Commande est classée selon la machine qu'elle mobilise, par complexité croissante :

| Palier | Machine de référence | Code interne (non modifiable) |
| --- | --- | --- |
| Extracteur | extraction brute | `EASY` |
| Constructeur | une entrée, une sortie | `NORMAL` |
| Assembleur | deux entrées | `HARD` |
| Manufacturier | jusqu'à quatre entrées | `EPIC` |

Le Pionnier notera que ces quatre valeurs (`EASY`, `NORMAL`, `HARD`, `EPIC`) circulent telles quelles jusqu'au serveur. Seul leur habillage a été renégocié dans le cadre du présent Accord ; leur dénomination technique reste la propriété exclusive de l'API et ne fait l'objet d'aucune concession.

---

## Article 10 — Garanties, exclusions et responsabilité

**10.1.** Le Registre est fourni « en l'état », sans garantie d'aucune sorte, y compris de qualité marchande, d'adéquation à un objectif particulier, ou de résistance à un double clic. C'est précisément pour cette dernière raison que le bouton d'action se désactive pendant l'envoi (`isSubmitting` / `disabled`) : FICSIT Inc. n'indemnisera aucune Commande créée en double.

**10.2.** Avant toute livraison au sens du présent Accord, le Pionnier exécute :

```bash
npm run lint
npm run build
```

Les deux doivent aboutir sans erreur. FICSIT Inc. décline toute responsabilité pour les Commandes — logicielles ou contractuelles — rendues sans que cette clause ait été respectée.

**10.3.** Pour observer les états de chargement dans des conditions représentatives d'une liaison interplanétaire, l'API accepte `SLOW_MS=1200 npm run dev`, qui ralentit chaque requête de 1,2 seconde. Toute lenteur perçue en dehors de ce mode relève d'un incident distinct, à documenter séparément.

---

## Article 11 — Résiliation

L'engagement du Pionnier prend fin par la déconnexion, laquelle efface le Jeton du `localStorage` et met immédiatement un terme à l'accès aux routes `/tasks`. FICSIT Inc. rappelle qu'un Jeton effacé ne dit toujours rien sur l'identité du Pionnier : c'est précisément pour cela que `GET /auth/me` est rappelée à chaque démarrage, tant qu'un Jeton subsiste.

---

## Annexe A — Architecture technique

```
src/
├── App.tsx                        les routes
├── components/
│   ├── Layout.component.tsx       en-tête + navigation
│   ├── auth/                      Passerelle d'Authentification (voir Art. 5, non modifiée)
│   ├── form/                      FormField, FormRootError, SubmitButton — génériques
│   └── order/                     TierBadge, TierPicker, ResourcesField, OrderForm…
├── hooks/useOrders.ts              ce que les trois écrans ont en commun
├── pages/                          BoardPage, OrdersPage, HistoryPage, OrderFormPage…
├── lib/http.ts                     l'instance axios, le Jeton, l'intercepteur
└── stores/
    ├── auth/                      inchangé (voir Art. 5)
    └── order/                     order.type.ts, order.api.ts, order.store.ts
```

---

## Article 12 — Droit applicable

Le présent Accord est régi par le barème de notation du module **Formulaires et gestion d'état** (B2 · Ynov), à l'exclusion de tout autre droit, y compris interplanétaire. Tout litige relatif à son interprétation sera tranché en séance, oralement, sans possibilité d'appel.

---

*Fait à Sector 7, en un nombre d'exemplaires que FICSIT Inc. ne communique pas.*

**Pour FICSIT Inc.**
*C. Parks — Directrice Générale*

**Pour le Pionnier**
*En exécutant `npm run dev`, le Pionnier appose au présent Accord sa signature numérique, incontestable, et irréversible.*
