import type { ReactNode } from "react";
import OrderCard from "./OrderCard.component";
import type { OrderType } from "@/stores/order/order.type";

type OrderListProps = {
  orders: OrderType[];
  isLoading: boolean;
  /** Ce qu'on affiche quand la liste est vide, une fois le chargement fini. */
  emptyLabel: string;
  /** Le bouton d'action de chaque carte. Absent sur le registre. */
  renderAction?: (order: OrderType) => ReactNode;
};

/**
 * La liste des commandes, avec ses deux cas particuliers : le chargement, et
 * la liste vide. Les trois écrans passent par elle.
 */
const OrderList = ({
  orders,
  isLoading,
  emptyLabel,
  renderAction,
}: OrderListProps) => {
  if (isLoading) {
    return <p className="py-10 text-center text-sm text-stone-400">Chargement…</p>;
  }

  if (orders.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-stone-300 py-10 text-center text-sm text-stone-500">
        {emptyLabel}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} action={renderAction?.(order)} />
      ))}
    </div>
  );
};

export default OrderList;
