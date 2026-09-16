type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p className="rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center text-sm font-medium text-red-700">
      {message}
    </p>
  );
};

export default ErrorMessage;
