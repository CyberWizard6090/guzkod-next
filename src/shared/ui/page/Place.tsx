import React from 'react';
import './defaultPage.scss';
type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export const Page = ({ children }: Props) => {
  return <div className="Page animation-reveal">{children}</div>;
};
