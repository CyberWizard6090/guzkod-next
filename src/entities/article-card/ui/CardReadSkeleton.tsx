import clsx from 'clsx';
import cardStyles from './ArticleCard.module.scss';
import skeletonStyles from './ArticleCardSkeleton.module.scss';

export const ArticleCardSkeleton = () => {
  return (
    <div className={clsx(cardStyles['article-card'], skeletonStyles['article-card--skeleton'], 'shadow')}>
      <div className={clsx(cardStyles['article-card__img-wrap'], skeletonStyles['article-card__img-wrap--skeleton'])} />
      <div className={clsx(cardStyles['article-card__content'], skeletonStyles['article-card__content--skeleton'])}>
        <div className={clsx(cardStyles['article-card__top-bar'], skeletonStyles['article-card__top-bar--skeleton'])}>
          <div className={clsx(cardStyles['article-card__wrap-date'], skeletonStyles['article-card__wrap-date--skeleton'])} />
          <div className={clsx(cardStyles['article-card__type'], skeletonStyles['article-card__type--skeleton'])} />
        </div>
        <div className={clsx(cardStyles['article-card__title'], skeletonStyles['article-card__title--skeleton'])} />
        <div className={clsx(cardStyles['article-card__text-container'], skeletonStyles['article-card__text-container--skeleton'])}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className={clsx(cardStyles['article-card__text-line'], skeletonStyles['article-card__text-line--skeleton'])} />
          ))}
        </div>
      </div>
    </div>
  );
};
