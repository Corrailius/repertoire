import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Page introuvable
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Cette adresse ne correspond à aucune page.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block text-sm text-red-600 transition-colors hover:text-red-500"
      >
        ← Retour au Pokédex
      </Link>
    </section>
  );
};

export default NotFoundPage;
