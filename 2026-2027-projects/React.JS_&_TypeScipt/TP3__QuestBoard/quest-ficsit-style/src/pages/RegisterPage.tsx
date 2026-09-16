import { Link, Navigate } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm.component";
import { useAuthStore } from "@/stores/auth/auth.store";

const RegisterPage = () => {
  const { user } = useAuthStore();

  if (user) return <Navigate to="/" replace />;

  return (
    <>
      <RegisterForm />

      <p className="mt-4 text-center text-sm text-stone-500">
        Déjà membre ?{" "}
        <Link to="/connexion" className="font-semibold text-amber-600 hover:underline">
          Connectez-vous
        </Link>
      </p>
    </>
  );
};

export default RegisterPage;
