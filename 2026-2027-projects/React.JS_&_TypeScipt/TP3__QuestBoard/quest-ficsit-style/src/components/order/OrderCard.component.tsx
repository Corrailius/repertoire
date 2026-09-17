import type { ReactNode } from "react";
import TierBadge from "./TierBadge.component";
import type { OrderType } from "@/stores/order/order.type";

type OrderCardProps = {
  order: OrderType;
  /** Le bouton d'action, différent sur chaque écran. Aucun si la commande est livrée. */
  action?: ReactNode;
};

/** Une commande, affichée de la même façon sur les trois écrans. */
const OrderCard = ({ order, action }: OrderCardProps) => (
  <article className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
    <div className="flex items-start gap-3">
      <h3 className="flex-1 font-semibold text-stone-900">{order.title}</h3>
      <TierBadge difficulty={order.difficulty} />
    </div>

    {order.description && (
      <p className="mt-1 text-sm text-stone-600">{order.description}</p>
    )}

    {order.tags.length > 0 && (
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {order.tags.map((resource) => (
          <li
            key={resource}
            className="rounded-md bg-stone-100 px-2 py-0.5 text-xs text-stone-500"
          >
            {resource}
          </li>
        ))}
      </ul>
    )}

    <div className="mt-3 flex items-center gap-3 border-t border-stone-100 pt-3">
      <span className="text-sm font-semibold text-amber-600">
        {order.reward} crédits FICSIT
      </span>

      <span className="text-xs text-stone-400">
        soumise par {order.author.username}
      </span>

      {action && <div className="ml-auto">{action}</div>}
    </div>
  </article>
);

export default OrderCard;
