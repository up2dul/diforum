import clsx from 'clsx';

type ButtonProps = {
  isSubmit?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ isSubmit, children, onClick }: ButtonProps) => (
  <button
    type={isSubmit ? 'submit' : 'button'}
    className={clsx(
      'rounded-xl bg-green-600 px-8 py-1.5',
      'font-medium text-como-50',
      'shadow-lg transition-colors hover:bg-green-800',
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
