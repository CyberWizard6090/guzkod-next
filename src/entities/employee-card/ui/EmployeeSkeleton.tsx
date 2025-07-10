import './EmployeeCard.scss';
import { Block } from 'shared/ui/block';

export const EmployeeSkeleton = () => {
  return (
    <Block>
      <div className="employee-card">
        <div className="employee-card__photo skeleton-box" />

        <div className="employee-card__info">
          <div className="skeleton-line skeleton-name" />
          <div className="skeleton-line skeleton-position" />
          <div className="skeleton-line skeleton-department" />
          <div className="skeleton-line skeleton-education" />
        </div>
      </div>
    </Block>
  );
};
