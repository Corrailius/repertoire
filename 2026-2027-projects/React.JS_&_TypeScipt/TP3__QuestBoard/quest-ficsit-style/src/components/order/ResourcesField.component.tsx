import { useFieldArray } from "react-hook-form";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { OrderFormType } from "./orderForm.type";

type ResourcesFieldProps = {
  control: Control<OrderFormType>;
  register: UseFormRegister<OrderFormType>;
  errors: FieldErrors<OrderFormType>;
};

/** Cinq ressources au maximum, seize caractères chacune : ce sont les règles du serveur. */
const MAX_RESOURCES = 5;
const MAX_LENGTH = 16;

/**
 * Une liste de champs qui s'allonge et se raccourcit : `useFieldArray`.
 *
 * Chaque élément a son `field.id`, et c'est **lui** la `key`. Avec l'index,
 * retirer une ressource décale les suivantes et React réutilise le mauvais
 * champ.
 */
const ResourcesField = ({ control, register, errors }: ResourcesFieldProps) => {
  const { fields, append, remove } = useFieldArray({ control, name: "resources" });

  return (
    <div>
      <span className="block text-sm font-medium text-stone-700">
        Ressources requises{" "}
        <span className="font-normal text-stone-400">
          ({fields.length}/{MAX_RESOURCES})
        </span>
      </span>

      <div className="mt-1 space-y-2">
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="flex gap-2">
              <input
                placeholder="Fer"
                className="flex-1 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                {...register(`resources.${index}.value`, {
                  required: "Une ressource vide ne sert à rien.",
                  maxLength: {
                    value: MAX_LENGTH,
                    message: `Seize caractères au maximum.`,
                  },
                  validate: (value, form) =>
                    form.resources.filter((resource) => resource.value === value)
                      .length === 1 || "Cette ressource est en double.",
                })}
              />

              <button
                type="button"
                onClick={() => remove(index)}
                className="cursor-pointer rounded-lg border border-stone-300 px-3 text-sm text-stone-500 transition-colors hover:bg-stone-100"
              >
                Retirer
              </button>
            </div>

            {errors.resources?.[index]?.value && (
              <p className="mt-1 text-sm text-red-500">
                {errors.resources[index]?.value?.message}
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append({ value: "" })}
        disabled={fields.length >= MAX_RESOURCES}
        className="mt-2 cursor-pointer text-sm font-semibold text-amber-600 hover:underline disabled:cursor-not-allowed disabled:text-stone-400 disabled:no-underline"
      >
        Ajouter une ressource
      </button>
    </div>
  );
};

export default ResourcesField;
