import './ReviewCard.scss';

export const ReviewSkeleton = () => {
  return (
    <div className="review-card__block animation-reveal">
      <div className="review-card">
        <div className="skeleton-line skeleton-date" />
        <div className="skeleton-line skeleton-author" />
        <div className="skeleton-line skeleton-meta" />
        <div className="skeleton-line skeleton-feedback" />
        <div className="skeleton-line skeleton-feedback" />
      </div>
    </div>
  );
};
