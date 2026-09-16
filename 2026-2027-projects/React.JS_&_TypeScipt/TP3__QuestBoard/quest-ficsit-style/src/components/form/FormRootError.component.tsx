type FormRootErrorProps = {
  /** `errors.root?.message`. Rien ne s'affiche s'il est absent. */
  message?: string;
};

/**
 * L'erreur qui ne vise aucun champ : panne, identifiants refusés, session
 * expirée. Elle se pose au-dessus du formulaire, jamais sous un champ.
 */
const FormRootError = ({ message }: FormRootErrorProps) => {
  if (!message) return null;

  return (
    <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
      {message}
    </p>
  );
};

export default FormRootError;
