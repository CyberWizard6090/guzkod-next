'use client';

import React from 'react';
import clsx from 'clsx';
import styles from './Pagination.module.scss';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
}) => {
  if (totalPages <= 1) return null;

  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const paginationRange = React.useMemo<(number | string)[]>(() => {
    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      return range(1, totalPages);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    const firstPage = 1;
    const lastPage = totalPages;

    if (!showLeftDots && showRightDots) {
      const leftRange = range(1, 3 + 2 * siblingCount);
      return [...leftRange, '...', totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightRange = range(totalPages - (3 + 2 * siblingCount) + 1, totalPages);
      return [firstPage, '...', ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = range(leftSibling, rightSibling);
      return [firstPage, '...', ...middleRange, '...', lastPage];
    }

    return [];
  }, [totalPages, currentPage, siblingCount]);

  return (
    <nav className={styles.pagination} aria-label="Пагинация">
      <button
        className={clsx(
          styles['pagination__button'],
          currentPage === 1 && styles['pagination__button--disabled']
        )}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        «
      </button>

      {paginationRange.map((page, idx) =>
        page === '...' ? (
          <span key={`dots-${idx}`} className={styles['pagination__dots']}>
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            className={clsx(
              styles['pagination__button'],
              page === currentPage && styles['pagination__button--active']
            )}
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </button>
        )
      )}

      <button
        className={clsx(
          styles['pagination__button'],
          currentPage === totalPages && styles['pagination__button--disabled']
        )}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </nav>
  );
};
