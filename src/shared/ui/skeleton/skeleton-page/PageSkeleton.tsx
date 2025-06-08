import './PageSkeleton.scss';

export const PageSkeleton = () => {
  return (
    <div className="page-skeleton">
      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line skeleton-subtitle" />

      <div className="skeleton-section">
        <div className="skeleton-box skeleton-block" />
        <div className="skeleton-box skeleton-block" />
        <div className="skeleton-box skeleton-block" />
      </div>

      <div className="skeleton-paragraph">
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line short" />
      </div>
    </div>
  );
};
