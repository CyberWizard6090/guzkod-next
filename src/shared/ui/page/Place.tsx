import React from 'react';
import './defaultPage.scss';
type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export const Page = ({ children }: Props) => {
  return (
    <div className="Page animation-reveal">
      <div className="Page__body shadow__style">
        <div className="Page__content">{children}</div>
      </div>
    </div>
  );
};
