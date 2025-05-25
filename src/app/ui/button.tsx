import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, className, variant = 'primary', ...rest }: ButtonProps) {
  const baseStyles =
    'flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

  const variantStyles = {
    primary:
      'bg-[var(--primary)] hover:bg-[var(--primary-light)] focus-visible:outline-[var(--primary)] active:bg-[var(--primary-dark)]',
    secondary:
      'bg-[var(--secondary)] hover:bg-[var(--secondary-light)] focus-visible:outline-[var(--secondary)] active:bg-[var(--secondary--dark)]',
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