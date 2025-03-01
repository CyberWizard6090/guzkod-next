import React from 'react';
import './block.scss';
type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export const Block = ({ children }: Props) => {
  return <div className="block shadow__style">{children}</div>;
};
