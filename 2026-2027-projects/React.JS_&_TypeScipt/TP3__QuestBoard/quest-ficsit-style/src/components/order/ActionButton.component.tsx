type ActionButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

/** Le bouton d'action d'une carte : prendre une commande en charge, ou la livrer. */
const ActionButton = ({ label, onClick, disabled }: ActionButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="cursor-pointer rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-semibold text-stone-900 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400"
  >
    {label}
  </button>
);

export default ActionButton;
