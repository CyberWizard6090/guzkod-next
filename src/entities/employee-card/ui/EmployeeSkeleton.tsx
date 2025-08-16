import clsx from 'clsx';
import cardStyles from './EmployeeCard.module.scss';
import skeletonStyles from './EmployeeCardSkeleton.module.scss';
import { Block } from 'shared/ui/block';

export const EmployeeSkeleton = () => {
  return (
    <Block className={clsx(cardStyles['employee-card__block'], 'animation-reveal')}>
      <div className={clsx(cardStyles['employee-card'], skeletonStyles['employee-card--skeleton'])}>
        <div
          className={clsx(
            cardStyles['employee-card__photo'],
            skeletonStyles['employee-card__photo--skeleton'],
          )}
        />
        <div className={clsx(cardStyles['employee-card__info'])}>
          <div
            className={clsx(
              cardStyles['employee-card__name'],
              skeletonStyles['employee-card__name--skeleton'],
            )}
          />
          <div
            className={clsx(
              cardStyles['employee-card__position'],
              skeletonStyles['employee-card__position--skeleton'],
            )}
          />
          <div
            className={clsx(
              cardStyles['employee-card__department'],
              skeletonStyles['employee-card__department--skeleton'],
            )}
          />
          <div
            className={clsx(
              cardStyles['employee-card__education'],
              skeletonStyles['employee-card__education--skeleton'],
            )}
          />
        </div>
      </div>
    </Block>
  );
};
