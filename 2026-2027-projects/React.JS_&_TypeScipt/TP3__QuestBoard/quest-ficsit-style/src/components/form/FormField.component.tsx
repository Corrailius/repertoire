import type { UseFormRegisterReturn } from "react-hook-form";

type FormFieldProps = {
  id: string;
  label: string;
  /** Le retour de `register("email", { … })`. Les règles restent à l'appel. */
  registration: UseFormRegisterReturn;
  type?: string;
  placeholder?: string;
  /** `errors.email?.message`, s'il y en a un. */
  error?: string;
};

/**
 * Un champ : son libellé, son input, et son message d'erreur.
 *
 * La bordure et le halo changent selon l'état, le reste ne bouge pas. On
 * compose la chaîne plutôt que de surcharger `border-stone-300` par
 * `border-red-400` : entre deux utilitaires concurrents, c'est l'ordre dans la
 * feuille compilée qui tranche, pas l'ordre dans l'attribut `className`.
 */
const FormField = ({
  id,
  label,
  registration,
  type = "text",
  placeholder,
  error,
}: FormFieldProps) => {
  const inputClasses =
    "mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-stone-800 " +
    "placeholder:text-stone-400 focus:outline-none focus:ring-2 " +
    (error
      ? "border-red-400 focus:border-red-500 focus:ring-red-500/30"
      : "border-stone-300 focus:border-amber-500 focus:ring-amber-500/30");

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-stone-700">
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={inputClasses}
        {...registration}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;
