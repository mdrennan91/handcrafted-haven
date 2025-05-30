import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "cartButton" | "proceed";
}

export function Button({
  children,
  className,
  variant = "primary",
  ...rest
}: ButtonProps) {
  const baseStyles =
    "flex h-10 items-center justify-center text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer";

  const variantStyles = {
    primary:
      "text-white rounded-lg px-4 bg-[var(--primary)] hover:bg-[var(--primary-light)] focus-visible:outline-[var(--primary)] active:bg-[var(--primary-dark)]",
    secondary:
      "text-white rounded-lg px-4 bg-[var(--secondary)] hover:bg-[var(--secondary-light)] focus-visible:outline-[var(--secondary)] active:bg-[var(--secondary--dark)]",
    cartButton:
      "absolute bottom-4 right-4 bg-gray-100 hover:bg-gray-200 p-4 rounded-full shadow-md text-black",
    proceed: "bg-green-600 hover:bg-green-700 text-white rounded-lg px-4",
  };

  return (
    <button
      {...rest}
      className={clsx(baseStyles, variantStyles[variant], className)}
    >
      {children}
    </button>
  );
}
