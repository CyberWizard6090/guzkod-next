import './VacancyCard.scss';
import { Block } from 'shared/ui/block';

export const VacancySkeleton = () => {
  return (
    <Block>
      <div className="vacancy-card">
        <div className="vacancy-card__info">
          <div className="skeleton-line skeleton-title" />
          <div className="skeleton-line skeleton-department" />
          <div className="skeleton-line skeleton-location" />
          <div className="skeleton-line skeleton-salary" />
          <div className="skeleton-line skeleton-description" />
        </div>
      </div>
    </Block>
  );
};
