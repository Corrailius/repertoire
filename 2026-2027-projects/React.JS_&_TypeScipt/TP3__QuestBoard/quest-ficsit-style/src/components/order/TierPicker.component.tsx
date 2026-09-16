import { TIERS, TIER_LABELS } from "@/stores/order/order.type";
import type { TierType } from "@/stores/order/order.type";

type TierPickerProps = {
  value: TierType;
  onChange: (tier: TierType) => void;
};

/**
 * Quatre boutons plutôt qu'un `<select>`.
 *
 * Ce n'est pas un champ natif du navigateur : react-hook-form ne peut pas le
 * brancher avec `register`. C'est exactement le cas d'usage de `Controller`,
 * qui lui fournit `value` et `onChange`.
 */
const TierPicker = ({ value, onChange }: TierPickerProps) => (
  <div className="mt-1 flex flex-wrap gap-2">
    {TIERS.map((tier) => (
      <button
        key={tier}
        type="button"
        onClick={() => onChange(tier)}
        className={`cursor-pointer rounded-lg border px-3 py-1.5 text-sm transition-colors ${
          value === tier
            ? "border-amber-500 bg-amber-50 font-semibold text-amber-700"
            : "border-stone-300 text-stone-600 hover:bg-stone-50"
        }`}
      >
        {TIER_LABELS[tier]}
      </button>
    ))}
  </div>
);

export default TierPicker;
