type LoaderProps = {
  message?: string;
};

const Loader = ({ message = "Chargement…" }: LoaderProps) => {
  return (
    <p className="py-16 text-center text-sm text-gray-500">{message}</p>
  );
};

export default Loader;
