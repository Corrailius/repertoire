import { toast } from "sonner";
import ActionButton from "@/components/order/ActionButton.component";
import PageTitle from "@/components/order/PageTitle.component";
import OrderFilters from "@/components/order/OrderFilters.component";
import OrderList from "@/components/order/OrderList.component";
import { useOrders } from "@/hooks/useOrders";
import { useOrderStore } from "@/stores/order/order.store";
import type { OrderType } from "@/stores/order/order.type";

/** `/` : les commandes qu'on a prises en charge. On les livre ici. */
const OrdersPage = () => {
  const { orders, isLoading, filters, setFilters } = useOrders("mine");
  const { deliverOrder } = useOrderStore();

  const onDeliver = async (order: OrderType) => {
    try {
      await deliverOrder(order.id);
      toast.success(`Commande livrée. +${order.reward} crédits FICSIT.`);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <PageTitle
        title="Mes commandes"
        subtitle="Celles que vous avez prises en charge. Livrez-les une fois terminées."
      />

      <OrderFilters filters={filters} onChange={setFilters} />

      <OrderList
        orders={orders}
        isLoading={isLoading}
        emptyLabel="Aucune commande en cours. Direction le tableau des commandes."
        renderAction={(order) => (
          <ActionButton label="Livrer" onClick={() => onDeliver(order)} />
        )}
      />
    </>
  );
};

export default OrdersPage;
