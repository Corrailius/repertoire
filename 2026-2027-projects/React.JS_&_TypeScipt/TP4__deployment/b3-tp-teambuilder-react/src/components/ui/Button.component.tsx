import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-red-600 text-white hover:bg-red-500",
  secondary: "border border-red-300 bg-white text-red-600 hover:bg-red-50",
};

const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer rounded-lg px-5 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 disabled:text-gray-400 ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
