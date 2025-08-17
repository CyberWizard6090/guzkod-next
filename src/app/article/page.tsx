'use client';

import { ArticleCard, ArticleCardSkeleton } from 'entities/article-card';
import { useEffect, useState, useCallback } from 'react';

import { Article } from 'shared/types/article';
import { Button } from 'shared/ui/button';
import { getArticles } from 'shared/api/articles';
const PAGE_SIZE = 5;

export default function ArticlePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadArticles = useCallback(async (pageNum: number) => {
    setLoading(true);
    setError(null);

    const { data, error } = await getArticles(pageNum, PAGE_SIZE);
    const articles = data?.docs ?? [];
    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    if (!data || articles.length === 0) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    if (data.length < PAGE_SIZE) {
      setHasMore(false);
    }

    setArticles((prev) => [...prev, ...articles]);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadArticles(1);
  }, [loadArticles]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadArticles(nextPage);
    }
  };

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  if (loading && articles.length === 0) {
    return (
      <>
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
      </>
    );
  }

  return (
    <>
      {articles.map((item, index) => (
        <ArticleCard key={`${item.id}-${index}`} article={item} />
      ))}

      {hasMore && (
        <Button onClick={handleLoadMore} disabled={loading}>
          {loading ? 'Загрузка...' : 'Показать предыдущие'}
        </Button>
      )}

      {!hasMore && <div>Больше статей нет</div>}
    </>
  );
}
