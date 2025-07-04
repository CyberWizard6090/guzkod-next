'use client';
import React from 'react';
import IconStar from 'shared/assets/svg/bootstrap-icons-1.11.2/star.svg';
import IconStarFill from 'shared/assets/svg/bootstrap-icons-1.11.2/star-fill.svg';
import './StarRating.scss';

type StarRatingProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  max?: number;
};

export const StarRating = ({ name, value, onChange, label, max = 5 }: StarRatingProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="star-rating" role="radiogroup" aria-labelledby={`${name}-label`}>
      {label && (
        <label id={`${name}-label`} className="star-rating__label">
          {label}
        </label>
      )}
      <div className="star-rating__star-group">
        {[...Array(max)].map((_, i) => {
          const val = (i + 1).toString();
          return (
            <label key={val} className="star-rating__star">
              <input
                type="radio"
                name={name}
                value={val}
                checked={value === val}
                onChange={handleChange}
              />
              <span className="star-rating__icon">
                {+value >= i + 1 ? (
                  <IconStarFill className={'star-rating__icon--fill'} />
                ) : (
                  <IconStar />
                )}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
