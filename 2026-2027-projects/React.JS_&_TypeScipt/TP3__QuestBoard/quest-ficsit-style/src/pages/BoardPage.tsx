import { toast } from "sonner";
import ActionButton from "@/components/order/ActionButton.component";
import PageTitle from "@/components/order/PageTitle.component";
import OrderFilters from "@/components/order/OrderFilters.component";
import OrderList from "@/components/order/OrderList.component";
import { useOrders } from "@/hooks/useOrders";
import { useOrderStore } from "@/stores/order/order.store";
import type { OrderType } from "@/stores/order/order.type";

/** `/tableau` : les commandes que personne n'a prises. On en prend une ici. */
const BoardPage = () => {
  const { orders, isLoading, filters, setFilters } = useOrders("board");
  const { claimOrder } = useOrderStore();

  const onClaim = async (order: OrderType) => {
    try {
      await claimOrder(order.id);
      toast.success(`« ${order.title} » est assignée à vous.`);
    } catch (error) {
      // 409 : un autre pionnier a été plus rapide.
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <PageTitle
        title="Le tableau des commandes"
        subtitle="Les commandes que personne n'a encore prises en charge."
      />

      <OrderFilters filters={filters} onChange={setFilters} />

      <OrderList
        orders={orders}
        isLoading={isLoading}
        emptyLabel="Le tableau est vide. Soumettez une commande."
        renderAction={(order) => (
          <ActionButton label="Prendre en charge" onClick={() => onClaim(order)} />
        )}
      />
    </>
  );
};

export default BoardPage;
