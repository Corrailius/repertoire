import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="py-20 text-center">
      <p className="text-5xl">🗺️</p>

      <h1 className="mt-4 text-2xl font-bold text-stone-800">
        Cette page n'est sur aucune carte
      </h1>

      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-stone-900 px-5 py-2 text-sm font-semibold text-stone-50 transition-colors hover:bg-stone-700"
      >
        Retour au carnet
      </Link>
    </div>
  );
};

export default NotFoundPage;
