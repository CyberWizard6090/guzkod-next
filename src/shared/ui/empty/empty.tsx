import React from 'react';
import { ReactComponent as Icon } from 'shared/assets/svg/empty-white-box-svgrepo-com.svg';
import './empty.scss';
type Props = {
  text: string;
};

export const Empty = ({ text }: Props) => {
  return (
    <div className="empty">
      <div className="empty-content">
        <div className="empty-icon">
          <Icon />
        </div>
        <div className="empty-text">
          <h3>{text}</h3>
        </div>
      </div>
    </div>
  );
};
