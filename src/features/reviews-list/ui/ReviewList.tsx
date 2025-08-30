'use client';

import { useState, useEffect, useCallback } from 'react';
import { getReviews } from 'shared/api/review';
import { Review, ReviewCard, ReviewSkeleton } from 'entities/review-card';
import { EmptyState } from 'shared/ui/empty-state';
import { VerticalContainer } from 'shared/ui/vertical-container';

const PAGE_SIZE = 10;

export const ReviewList = () => {
  const [data, setData] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadPage = useCallback(async (pageNum: number) => {
    setLoading(true);
    setError(null);

    const { data: newData, error: loadError } = await getReviews(pageNum, PAGE_SIZE);

    if (loadError) {
      setError(loadError);
      setHasMore(false);
      setLoading(false);
      return;
    }

    if (!newData || !Array.isArray(newData)) {
      setError(new Error('No data received'));
      setHasMore(false);
      setLoading(false);
      return;
    }

    if (newData.length === 0 || newData.length < PAGE_SIZE) {
      setHasMore(false);
    }

    setData((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));
      const uniqueNew = newData.filter((item) => !existingIds.has(item.id));
      return [...prev, ...uniqueNew];
    });

    setLoading(false);
  }, []);

  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  useEffect(() => {
    const onScroll = () => {
      if (!hasMore || loading) return;
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 1) loadPage(page);
  }, [page, loadPage]);

  if (error) console.error(error);

  if (data.length === 0 && !loading) {
    return (
      <EmptyState title="Мы ценим ваше мнение" description="На этой странице пока нет отзывов..." />
    );
  }

  return (
    <VerticalContainer>
      {data.map((review) => (
        <ReviewCard key={review.id} {...review} />
      ))}
      {loading && [...Array(3)].map((_, i) => <ReviewSkeleton key={i} />)}
    </VerticalContainer>
  );
};
