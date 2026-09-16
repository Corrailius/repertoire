import { useEffect, useState } from "react";
import { useOrderStore } from "@/stores/order/order.store";
import type { OrderFiltersType, ScopeType } from "@/stores/order/order.type";

/**
 * Ce que les trois écrans du registre ont en commun : une vue, deux filtres,
 * et un rechargement dès que l'un des deux bouge.
 *
 * Les filtres sont un état de page, pas de store : ils meurent avec l'écran.
 */
export const useOrders = (scope: ScopeType) => {
  const { orders, isLoading, fetchOrders } = useOrderStore();
  const [filters, setFilters] = useState<OrderFiltersType>({});

  useEffect(() => {
    fetchOrders(scope, filters);
  }, [scope, filters, fetchOrders]);

  return { orders, isLoading, filters, setFilters };
};
