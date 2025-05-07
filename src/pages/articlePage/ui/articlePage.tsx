import { CardRead } from 'entities/CardRead';
import { Article } from 'shared/types/article';
import { useDocumentTitle } from 'shared/lib/hooks/useDocumentTitle';
import { useLoaderData } from 'react-router-dom';
import './articlePage.scss';

export const ArticlePage = () => {
  useDocumentTitle('Статьи');
  const data = useLoaderData() as { docs: Article[] };

  return (
    <div className="Page-Article animation-reveal">
      {data.docs.map((item: Article, index: number) => (
        <CardRead key={index} article={item} />
      ))}
    </div>
  );
};
