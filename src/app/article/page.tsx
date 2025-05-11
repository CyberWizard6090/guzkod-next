'use client';

import { CardRead, CardReadSkeleton } from 'entities/card-read';
import { useEffect, useState } from 'react';

import { Article } from 'shared/types/article';

// import './articlePage.scss';

export default function ArticlePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const res = await fetch('api/article', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          mode: 'cors',
        });
        if (!res.ok) throw new Error('Ошибка ответа сервера');
        const data = await res.json();
        setArticles(data.docs);
      } catch (err) {
        console.error('Ошибка загрузки статей:', err);
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, []);
  console.log(articles);
  if (loading)
    return (
      <>
        <CardReadSkeleton />
        <CardReadSkeleton />
        <CardReadSkeleton />
      </>
    );

  return (
    <>
      {articles.map((item, index) => (
        <CardRead key={index} article={item} />
      ))}
    </>
  );
}
