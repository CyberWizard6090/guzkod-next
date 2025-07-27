import { ReactNode } from 'react';
import styles from './SectionTitle.module.scss';
import clsx from 'clsx';

type SectionTitleProps = {
  children: ReactNode;
  className?: string;
};

export const SectionTitle = ({ children, className }: SectionTitleProps) => {
  return (
    <h2 className={clsx(styles.title, className)}>
      {children}
    </h2>
  );
};
