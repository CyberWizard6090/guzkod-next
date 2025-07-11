'use client';

import { useEffect, useState, useCallback } from 'react';
import { getReviews } from 'shared/api/review';
import { Review, ReviewCard, ReviewSkeleton } from 'entities/review-card';
import Link from 'next/link';
import { Block } from 'shared/ui/block';
import { Button } from 'shared/ui/button';
import { EmptyPageStub } from 'shared/ui/empty-page-stub';
import { Page } from 'shared/ui/page';
import AlignWrapper from 'shared/ui/align-wrapper';

const PAGE_SIZE = 10;

export default function ReviewsPage() {
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

    if (newData.length === 0) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    if (newData.length < PAGE_SIZE) {
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
    console.error('error', error);

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    if (page === 1) return;
    loadPage(page);
  }, [page, loadPage]);

  return (
    <Page>
      <Block>
        <h2>Оставьте свой отзыв</h2>
        <p>Нам важно ваше мнение! Пожалуйста, поделитесь своим опытом.</p>
        <AlignWrapper align={'right'}>
          <Link href={'/reviews/form'}>
            <Button>Оставить отзыв</Button>
          </Link>
        </AlignWrapper>
      </Block>

      {data.length === 0 && !loading ? (
        <Block>
          <EmptyPageStub
            title="Мы ценим ваше мнение"
            description="На этой странице пока нет отзывов, но мы будем рады, если вы станете первым, кто поделится своим опытом получения медицинской помощи в нашем учреждении."
          />
        </Block>
      ) : (
        <h2>Отзывы</h2>
      )}

      {data.map((review) => (
        <ReviewCard key={review.id} {...review} />
      ))}

      {loading && [...Array(3)].map((_, i) => <ReviewSkeleton key={`skeleton-${i}`} />)}
    </Page>
  );
}
