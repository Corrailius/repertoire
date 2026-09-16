import { TIERS, TIER_LABELS } from "@/stores/order/order.type";
import type { OrderFiltersType } from "@/stores/order/order.type";

type OrderFiltersProps = {
  filters: OrderFiltersType;
  onChange: (filters: OrderFiltersType) => void;
};

/**
 * Les deux filtres, cumulables. Ils vivent dans la page qui les affiche, pas
 * dans le store : personne d'autre n'en a besoin.
 */
const OrderFilters = ({ filters, onChange }: OrderFiltersProps) => (
  <div className="mb-4 flex flex-wrap gap-3">
    <input
      type="search"
      value={filters.q ?? ""}
      onChange={(event) => onChange({ ...filters, q: event.target.value })}
      placeholder="Chercher un titre…"
      className="flex-1 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
    />

    <select
      value={filters.difficulty ?? ""}
      onChange={(event) =>
        onChange({
          ...filters,
          difficulty: event.target.value as OrderFiltersType["difficulty"],
        })
      }
      className="cursor-pointer rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
    >
      <option value="">Tous les paliers</option>
      {TIERS.map((tier) => (
        <option key={tier} value={tier}>
          {TIER_LABELS[tier]}
        </option>
      ))}
    </select>
  </div>
);

export default OrderFilters;
