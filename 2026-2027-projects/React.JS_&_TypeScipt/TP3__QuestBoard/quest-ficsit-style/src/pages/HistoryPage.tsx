import PageTitle from "@/components/order/PageTitle.component";
import OrderFilters from "@/components/order/OrderFilters.component";
import OrderList from "@/components/order/OrderList.component";
import { useOrders } from "@/hooks/useOrders";

/** `/historique` : les commandes livrées, et ce qu'elles ont rapporté. */
const HistoryPage = () => {
  const { orders, isLoading, filters, setFilters } = useOrders("history");

  /*
   * Le total se calcule à l'affichage, à partir de la liste. Le ranger dans
   * le store créerait une deuxième source de vérité, fausse dès la première
   * commande livrée.
   */
  const total = orders.reduce((somme, order) => somme + order.reward, 0);

  return (
    <>
      <PageTitle
        title="Registre de production"
        subtitle="Les commandes que vous avez livrées."
        aside={
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-center">
            <p className="text-xl font-bold text-amber-700">{total}</p>
            <p className="text-xs text-amber-600">crédits FICSIT</p>
          </div>
        }
      />

      <OrderFilters filters={filters} onChange={setFilters} />

      <OrderList
        orders={orders}
        isLoading={isLoading}
        emptyLabel="Aucune livraison pour l'instant."
      />
    </>
  );
};

export default HistoryPage;
