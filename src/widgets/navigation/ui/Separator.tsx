import React from 'react';
type Props = {
  label: string;
};
export const Separator = ({ label }: Props) => {
  return (
    <div className="nav_menu-content-separator">
      <div>{label}</div>
    </div>
  );
};
