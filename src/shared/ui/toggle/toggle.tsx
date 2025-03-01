import React from 'react';
import './toggle.scss';

export const Toggle = () => {
  return (
    <div className="checkbox_item citem_1 Toggle">
      <label className="checkbox_wrap">
        <input type="checkbox" name="checkbox" className="checkbox_inp" />
        <span className="checkbox_mark"></span>
      </label>
    </div>
  );
};
