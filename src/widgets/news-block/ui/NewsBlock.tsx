'use client';
import { useEffect, useState } from 'react';
import { CardRead, CardReadSkeleton } from 'entities/card-read';
import { SectionTitle } from 'shared/ui/section-title';
import { getArticles } from 'shared/api/articles';
import type { Article } from 'shared/types/article';
import styles from './NewsBlock.module.scss';
import { Block } from 'shared/ui/block';

export const NewsBlock = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    setError(null);

    getArticles(1, 3).then(({ data, error: apiError }) => {
      if (!mounted) return;

      if (apiError) {
        setError('Ошибка загрузки новостей');
        setArticles([]);
      } else {
        setArticles(data?.docs || []);
      }
      setIsLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className={styles['news-block']}>
      <SectionTitle>Новости</SectionTitle>

      {isLoading ? (
        <div className={styles['news-block__wrap']}>
          <CardReadSkeleton />
          <CardReadSkeleton />
          <CardReadSkeleton />
        </div>
      ) : error ? (
        <Block>
          <p className={styles['news-block__error']}>{error}</p>
        </Block>
      ) : (
        <div className={styles['news-block__wrap']}>
          {articles.map((article) => (
            <CardRead key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
};
