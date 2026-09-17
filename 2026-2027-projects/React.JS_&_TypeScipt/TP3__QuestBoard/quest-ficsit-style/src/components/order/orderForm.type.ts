import type { TierType } from "@/stores/order/order.type";

/**
 * Le contrat du formulaire de commande.
 *
 * `resources` n'est pas un `string[]` mais une liste d'objets :
 * `useFieldArray` a besoin que chaque élément soit un objet pour lui
 * attribuer un `id` stable. On la repasse en `string[]`, sous la clé `tags`
 * attendue par l'API, au moment de l'envoi — le nom change à l'écran, pas
 * sur le fil.
 */
export type OrderFormType = {
  title: string;
  description: string;
  difficulty: TierType;
  reward: number;
  resources: { value: string }[];
};
