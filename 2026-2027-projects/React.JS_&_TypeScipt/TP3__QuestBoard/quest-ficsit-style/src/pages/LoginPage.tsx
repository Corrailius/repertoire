import { Link, Navigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm.component";
import { useAuthStore } from "@/stores/auth/auth.store";

const LoginPage = () => {
  const { user } = useAuthStore();

  if (user) return <Navigate to="/" replace />;

  return (
    <>
      <LoginForm />

      <p className="mt-4 text-center text-sm text-stone-500">
        Pas encore de la guilde ?{" "}
        <Link to="/inscription" className="font-semibold text-amber-600 hover:underline">
          Rejoignez-la
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
