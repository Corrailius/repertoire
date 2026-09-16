type SubmitButtonProps = {
  isLoading: boolean;
  label: string;
  loadingLabel: string;
};

/**
 * Le bouton d'envoi. Désactivé pendant la requête, et son texte change : un
 * bouton grisé qui garde le même libellé laisse croire que le clic n'a pas pris.
 */
const SubmitButton = ({ isLoading, label, loadingLabel }: SubmitButtonProps) => (
  <button
    type="submit"
    disabled={isLoading}
    className="mt-6 w-full cursor-pointer rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-stone-900 transition-colors hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500"
  >
    {isLoading ? loadingLabel : label}
  </button>
);

export default SubmitButton;
