import './CardRead.scss';
import clsx from 'clsx';

export const CardReadSkeleton = () => {
  return (
    <div className={clsx('card-read', 'card-read--skeleton', 'shadow')}>
      <div className="card-read__img-wrap card-read__img-wrap--skeleton" />
      <div className="card-read__content card-read__content--skeleton">
        <div className="card-read__top-bar card-read__top-bar--skeleton">
          <div className="card-read__wrap-date card-read__wrap-date--skeleton" />
          <div className="card-read__type card-read__type--skeleton" />
        </div>
        <div className="card-read__title card-read__title--skeleton" />
        <div className="card-read__text-container card-read__text-container--skeleton">
          <div className="card-read__text-line card-read__text-line--skeleton" />
          <div className="card-read__text-line card-read__text-line--skeleton" />
          <div className="card-read__text-line card-read__text-line--skeleton" />
          <div className="card-read__text-line card-read__text-line--skeleton" />
          <div className="card-read__text-line card-read__text-line--skeleton" />
        </div>
      </div>
    </div>
  );
};
