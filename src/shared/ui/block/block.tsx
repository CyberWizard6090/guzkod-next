import React from 'react';
import styles from './block.module.scss';

import clsx from 'clsx';
type Props = {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
};

export const Block = ({ children, className }: Props) => {
  return <div className={clsx(styles.block, 'shadow', className)}>{children}</div>;
};
