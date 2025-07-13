import './CardRead.scss';
import clsx from 'clsx';

export const CardReadSkeleton = () => {
  return (
    <div className={clsx('CardRead', 'CardRead--skeleton', 'shadow')}>
      <div className="CardRead__img-wrap CardRead__img-wrap--skeleton" />
      <div className="CardRead__content CardRead__content--skeleton">
        <div className="CardRead__top-bar CardRead__top-bar--skeleton">
          <div className="CardRead__wrap-date CardRead__wrap-date--skeleton" />
          <div className="CardRead__type CardRead__type--skeleton" />
        </div>
        <div className="CardRead__title CardRead__title--skeleton" />
        <div className="CardRead__text-container CardRead__text-container--skeleton">
          <div className="CardRead__text-line CardRead__text-line--skeleton" />
          <div className="CardRead__text-line CardRead__text-line--skeleton" />
          <div className="CardRead__text-line CardRead__text-line--skeleton" />
          <div className="CardRead__text-line CardRead__text-line--skeleton" />
          <div className="CardRead__text-line CardRead__text-line--skeleton" />
        </div>
      </div>
    </div>
  );
};
