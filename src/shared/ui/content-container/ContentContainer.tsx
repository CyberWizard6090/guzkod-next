import clsx from 'clsx';
import styles from './ContentContainer.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const ContentContainer = ({ children, className }: Props) => {
  return <div className={clsx(styles.contentContainer, className)}>{children}</div>;
};
