import React from 'react';
import './block.scss';
type Props = {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
};

export const Block = ({ children, className }: Props) => {
  return <div className={`block shadow__style ${className}`}>{children}</div>;
};
