import { useEffect, useState } from 'react';
import './NewsBlock.scss';
import { CardRead } from 'entities/CardRead';
import { Article } from 'shared/types/article';
import { getArticles } from 'shared/api/articles';

export const NewsBlock = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getArticles()
      .then((data) => {
        setArticles(data.docs || []);
      })
      .catch((err) => {
        setError('Ошибка загрузки новостей');
        console.error('Error fetching articles:', err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="NewsBlock">
      <h2>Новости</h2>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p className="NewsBlock_error">{error}</p>
      ) : (
        <div className="NewsBlock_wrap">
          {articles.map((item) => (
            <CardRead key={item.id} article={item} />
          ))}
        </div>
      )}
    </div>
  );
};
