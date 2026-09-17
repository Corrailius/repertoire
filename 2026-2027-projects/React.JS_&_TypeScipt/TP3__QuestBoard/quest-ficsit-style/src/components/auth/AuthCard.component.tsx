import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

/** La carte blanche commune aux deux formulaires d'authentification. */
const AuthCard = ({ title, subtitle, children }: AuthCardProps) => (
  <div className="mx-auto w-full max-w-md rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
    <h2 className="text-lg font-bold text-stone-900">{title}</h2>
    <p className="mt-1 text-sm text-stone-500">{subtitle}</p>

    {children}
  </div>
);

export default AuthCard;
