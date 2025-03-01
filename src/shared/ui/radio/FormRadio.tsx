import React from 'react';
import './radio.scss';
type Props = {
  Name: string;
  children?: React.ReactNode;
};

export const FormRadio = ({ children, Name }: Props) => {
  return (
    <div className="Radio-Form">
      <fieldset>
        <legend>{Name}</legend>
        <form> {children}</form>
      </fieldset>
    </div>
  );
};
