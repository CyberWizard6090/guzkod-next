import React, { ReactNode } from 'react';

type Align = 'left' | 'center' | 'right';

type AlignWrapperProps = {
  align?: Align;
  children: ReactNode;
};

const AlignWrapper = ({ align = 'left', children }: AlignWrapperProps) => {
  let justifyContent: string;

  switch (align) {
    case 'center':
      justifyContent = 'center';
      break;
    case 'right':
      justifyContent = 'flex-end';
      break;
    case 'left':
    default:
      justifyContent = 'flex-start';
  }

  return <div style={{ display: 'flex', justifyContent }}>{children}</div>;
};

export default AlignWrapper;
