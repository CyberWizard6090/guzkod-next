import clsx from 'clsx';

import './button.scss';

type IButton = {
  children: string | string[];
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  theme?: 'blue' | 'transparent-grey' | 'transparent-blue' | 'mono';
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (() => void) | ((event: React.MouseEvent<HTMLButtonElement>) => void);
};

export const Button = ({
  children,
  Icon,
  theme = 'blue',
  type = 'button',
  disabled = false,
  className,
  onClick,
}: IButton) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx('button', `button-theme__${theme}`, disabled && 'button_disabled', className)}
    >
      {Icon && <Icon />}
      {children}
    </button>
  );
};
