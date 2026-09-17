import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthCard from "./AuthCard.component";
import FormField from "../form/FormField.component";
import FormRootError from "../form/FormRootError.component";
import SubmitButton from "../form/SubmitButton.component";
import type { ErrorWithField } from "@/stores/auth/auth.api";
import { useAuthStore } from "@/stores/auth/auth.store";

/** Le contrat du formulaire : quatre champs, tous `string`. */
type RegisterFormType = {
  email: string;
  username: string;
  password: string;
  confirmation: string;
};

const RegisterForm = () => {
  const { isLoading, register: registerMembre } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormType>({
    defaultValues: { email: "", username: "", password: "", confirmation: "" },
  });

  // La confirmation n'est pas dans les paramètres : elle ne part donc pas.
  const onSubmit = async ({ email, username, password }: RegisterFormType) => {
    try {
      const user = await registerMembre({ email, username, password });
      toast.success(`Bienvenue dans la guilde, ${user.username}.`);
      navigate("/");
    } catch (error) {
      const { field, message } = error as ErrorWithField;
      if (field) setError(field as keyof RegisterFormType, { message });
      else setError("root", { message });
    }
  };

  return (
    <AuthCard
      title="Rejoindre la guilde"
      subtitle="Quatre champs, quatre règles, zéro state à vous."
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormRootError message={errors.root?.message} />

        <div className="mt-6 space-y-4">
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="aria@guilde.fr"
            error={errors.email?.message}
            registration={register("email", {
              required: "L'email est obligatoire.",
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i,
                message: "Cet email n'a pas une forme valide.",
              },
            })}
          />

          <FormField
            id="username"
            label="Nom d'aventurier"
            placeholder="Aria"
            error={errors.username?.message}
            registration={register("username", {
              required: "Le nom d'aventurier est obligatoire.",
              minLength: { value: 3, message: "Trois caractères au minimum." },
              maxLength: { value: 20, message: "Vingt caractères au maximum." },
            })}
          />

          <FormField
            id="password"
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            registration={register("password", {
              required: "Le mot de passe est obligatoire.",
              minLength: { value: 8, message: "Huit caractères au minimum." },
              pattern: { value: /[0-9]/, message: "Il faut au moins un chiffre." },
            })}
          />

          <FormField
            id="confirmation"
            label="Confirmation du mot de passe"
            type="password"
            placeholder="••••••••"
            error={errors.confirmation?.message}
            registration={register("confirmation", {
              required: "Confirmez votre mot de passe.",
              validate: (value, form) =>
                value === form.password || "Les deux mots de passe diffèrent.",
            })}
          />
        </div>

        <SubmitButton
          isLoading={isLoading}
          label="Rejoindre la guilde"
          loadingLabel="Inscription en cours…"
        />
      </form>
    </AuthCard>
  );
};

export default RegisterForm;
