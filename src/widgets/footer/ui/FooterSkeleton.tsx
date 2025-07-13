'use client';
import './Footer.scss';
import clsx from 'clsx';

export const FooterSkeleton = () => {
  return (
    <footer className={clsx('footer', 'shadow')}>
      <div className="footer-container">
        {[1, 2, 3].map((col) => (
          <div key={col} className="footer-column">
            <div className="footer-title skeleton-box" />
            <ul className="footer-links">
              {[1, 2, 3].map((item) => (
                <li key={item}>
                  <div className="footer-link skeleton-box" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};
