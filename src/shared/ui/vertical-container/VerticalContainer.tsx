import React from 'react';
import './VerticalContainer.scss';
type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export const VerticalContainer = ({ children }: Props) => {
  return <div className="vertical-container">{children}</div>;
};
