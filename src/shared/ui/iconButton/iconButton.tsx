import clsx from 'clsx';

import './iconButton.scss';

type PropsIconButton = {
  readonly Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  isCounterVisible?: boolean;
  variant?: 'primary' | 'secondary';
  counterValue?: number;
  onClick?: (() => void) | ((event: React.MouseEvent<HTMLButtonElement>) => void);
  className?: string;
};

export const IconButton = ({ Icon, variant = 'primary', onClick, className }: PropsIconButton) => {
  return (
    <button
      type="button"
      className={clsx(`icon-button icon-button-${variant}`, className)}
      onClick={onClick}
    >
      <Icon className="icon-button__icon" />
    </button>
  );
};
