import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthCard from "./AuthCard.component";
import FormField from "../form/FormField.component";
import FormRootError from "../form/FormRootError.component";
import SubmitButton from "../form/SubmitButton.component";
import type { ErrorWithField } from "@/stores/auth/auth.api";
import { useAuthStore } from "@/stores/auth/auth.store";

type LoginFormType = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { isLoading, login } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormType) => {
    try {
      const user = await login(data);
      toast.success(`Content de vous revoir, ${user.username}.`);
      navigate("/");
    } catch (error) {
      /*
       * Le 401 n'a pas de `field` : on ne dit pas au visiteur lequel des deux
       * est faux. Tout tombe donc dans le bandeau, et c'est voulu.
       */
      const { field, message } = error as ErrorWithField;
      if (field) setError(field as keyof LoginFormType, { message });
      else setError("root", { message });
    }
  };

  return (
    <AuthCard
      title="Reprendre l'aventure"
      subtitle="Deux champs, et le serveur a le dernier mot."
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
            id="password"
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            registration={register("password", {
              required: "Le mot de passe est obligatoire.",
            })}
          />
        </div>

        <SubmitButton
          isLoading={isLoading}
          label="Entrer dans la guilde"
          loadingLabel="Connexion en cours…"
        />
      </form>
    </AuthCard>
  );
};

export default LoginForm;
