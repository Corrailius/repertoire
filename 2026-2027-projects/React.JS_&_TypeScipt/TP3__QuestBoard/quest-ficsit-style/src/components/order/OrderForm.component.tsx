import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import TierPicker from "./TierPicker.component";
import ResourcesField from "./ResourcesField.component";
import FormField from "../form/FormField.component";
import FormRootError from "../form/FormRootError.component";
import SubmitButton from "../form/SubmitButton.component";
import type { OrderFormType } from "./orderForm.type";
import type { ErrorWithField } from "@/stores/auth/auth.api";
import { useOrderStore } from "@/stores/order/order.store";

/** Soumettre une commande. Elle part au tableau, personne ne l'a prise. */
const OrderForm = () => {
  const { isLoading, createOrder } = useOrderStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<OrderFormType>({
    defaultValues: {
      title: "",
      description: "",
      difficulty: "NORMAL",
      reward: 10,
      resources: [],
    },
  });

  const onSubmit = async ({
    title,
    description,
    difficulty,
    reward,
    resources,
  }: OrderFormType) => {
    try {
      await createOrder({
        title,
        difficulty,
        reward,
        description: description || undefined,
        // On repasse de `{ value }[]` à `string[]`, sous la clé `tags`
        // attendue par l'API : le nom change à l'écran, pas sur le fil.
        tags: resources.map((resource) => resource.value),
      });
      toast.success("Commande affichée au tableau des commandes.");
      navigate("/tableau");
    } catch (error) {
      const { field, message } = error as ErrorWithField;
      if (field) setError(field as keyof OrderFormType, { message });
      else setError("root", { message });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mx-auto w-full max-w-xl rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-bold text-stone-900">Soumettre une commande</h2>
      <p className="mt-1 text-sm text-stone-500">
        Elle rejoindra le tableau, et n'importe quel pionnier pourra la
        prendre en charge.
      </p>

      <FormRootError message={errors.root?.message} />

      <div className="mt-6 space-y-4">
        <FormField
          id="title"
          label="Titre"
          placeholder="Produire 500 plaques d'acier renforcé"
          error={errors.title?.message}
          registration={register("title", {
            required: "Une commande a besoin d'un titre.",
            minLength: { value: 3, message: "Trois caractères au minimum." },
            maxLength: {
              value: 80,
              message: "Quatre-vingts caractères au maximum.",
            },
          })}
        />

        <FormField
          id="description"
          label="Description"
          placeholder="Prévoir un stock tampon avant le prochain palier de l'Ascenseur Spatial."
          error={errors.description?.message}
          registration={register("description", {
            maxLength: { value: 500, message: "Cinq cents caractères au maximum." },
          })}
        />

        <div>
          <span className="block text-sm font-medium text-stone-700">
            Palier de production
          </span>

          <Controller
            name="difficulty"
            control={control}
            render={({ field }) => (
              <TierPicker value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <FormField
          id="reward"
          label="Récompense, en crédits FICSIT"
          type="number"
          placeholder="50"
          error={errors.reward?.message}
          registration={register("reward", {
            // Sans ceci, un input rend une chaîne et le serveur répond 400.
            valueAsNumber: true,
            required: "Une commande sans récompense ne trouvera pas de pionnier.",
            min: { value: 1, message: "Un crédit FICSIT au minimum." },
            max: { value: 1000, message: "Mille crédits FICSIT au maximum." },
          })}
        />

        <ResourcesField control={control} register={register} errors={errors} />
      </div>

      <SubmitButton
        isLoading={isLoading}
        label="Afficher au tableau"
        loadingLabel="Publication…"
      />
    </form>
  );
};

export default OrderForm;
