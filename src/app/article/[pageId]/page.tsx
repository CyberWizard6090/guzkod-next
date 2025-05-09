'use client';

import { CardRead } from 'entities/card-read';
import { useEffect, useState } from 'react';

import { Article } from 'shared/types/article';

// import './articlePage.scss';

export default function ArticlePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.docs);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка загрузки статей:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="Page-Article animation-reveal">
      {articles.map((item, index) => (
        <CardRead key={index} article={item} />
      ))}
    </div>
  );
}
