import clsx from "clsx";
import Link from "next/link";

type ButtonVariants = "primary" | "secondary" | "cartButton" | "proceed";

interface SharedProps {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariants;
  url?: string;
}

type ButtonProps = SharedProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = SharedProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button(props: ButtonProps | AnchorProps) {
  const { children, className, variant = "primary", url, ...rest } = props;

  const baseStyles =
    "flex h-10 items-center justify-center text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer";

  const variantStyles = {
    primary:
      "text-white rounded-lg px-4 bg-[var(--primary)] hover:bg-[var(--primary-light)] focus-visible:outline-[var(--primary)] active:bg-[var(--primary-dark)]",
    secondary:
      "text-white rounded-lg px-4 bg-[var(--secondary)] hover:bg-[var(--secondary-light)] focus-visible:outline-[var(--secondary)] active:bg-[var(--secondary--dark)]",
    cartButton:
      "bg-gray-100 hover:bg-gray-200 p-4 rounded-full shadow-md text-black",
    proceed: "bg-green-600 hover:bg-green-700 text-white rounded-lg px-4",
  };

  if (url) {
    // If a URL is provided this will be an anchor link
    const anchorRest = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link
        href={url}
        passHref
        className={clsx(baseStyles, variantStyles[variant], className)}
        {...anchorRest}
      >
        {children}
      </Link>
    );
  }

  // Otherwise, this will be a button
  const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...buttonRest}
    >
      {children}
    </button>
  );
}
