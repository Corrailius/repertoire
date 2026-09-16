import { TIER_LABELS, type TierType } from "@/stores/order/order.type";

type TierBadgeProps = {
  difficulty: TierType;
};

/** Une couleur par palier. Le libellé vient du type, jamais écrit en dur. */
const COLORS: Record<TierType, string> = {
  EASY: "bg-emerald-100 text-emerald-700",
  NORMAL: "bg-sky-100 text-sky-700",
  HARD: "bg-orange-100 text-orange-700",
  EPIC: "bg-violet-100 text-violet-700",
};

const TierBadge = ({ difficulty }: TierBadgeProps) => (
  <span
    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${COLORS[difficulty]}`}
  >
    {TIER_LABELS[difficulty]}
  </span>
);

export default TierBadge;
