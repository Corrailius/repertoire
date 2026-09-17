import { create } from "zustand";
import {
  claimOrderApi,
  createOrderApi,
  deliverOrderApi,
  getOrdersApi,
} from "./order.api";
import type { OrderState } from "./order.type";

/**
 * Les commandes affichées à l'écran, et rien d'autre.
 *
 * Le store retient la liste de la vue en cours. Les filtres, eux, restent
 * dans la page : ce sont des champs de saisie, ils meurent avec l'écran.
 */
export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  isLoading: false,

  fetchOrders: async (scope, filters) => {
    set({ isLoading: true });
    try {
      const orders = await getOrdersApi(scope, filters);
      set({ orders });
    } finally {
      set({ isLoading: false });
    }
  },

  createOrder: async (input) => {
    set({ isLoading: true });
    try {
      return await createOrderApi(input);
    } finally {
      set({ isLoading: false });
    }
  },

  /*
   * Prendre une commande la fait quitter le tableau, la livrer la fait
   * quitter « mes commandes ». Dans les deux cas elle sort de la vue
   * affichée : on la retire de la liste plutôt que de tout recharger.
   */
  claimOrder: async (id) => {
    await claimOrderApi(id);
    set({ orders: get().orders.filter((order) => order.id !== id) });
  },

  deliverOrder: async (id) => {
    await deliverOrderApi(id);
    set({ orders: get().orders.filter((order) => order.id !== id) });
  },
}));
