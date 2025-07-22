'use client';
import clsx from 'clsx';

import './button.scss';

type PropsButton = {
  children: string | string[] | React.ReactNode;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  variant?: 'primary' | 'secondary' | 'tertiary';
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  onClick?: (() => void) | ((event: React.MouseEvent<HTMLButtonElement>) => void);
};

export const Button = ({
  children,
  Icon,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className,
  onClick,
}: PropsButton) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx('button', `button-${variant}`, disabled && 'button__disabled', className)}
      disabled={disabled}
    >
      {Icon && <Icon />}
      {children}
    </button>
  );
};
