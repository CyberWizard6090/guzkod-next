import Link from 'next/link';
import './CardRead.scss';
import { Article } from 'shared/types/article';
import clsx from 'clsx';
import { formatDate } from 'shared/lib/format';
type CardReadProps = {
  article: Article;
};
export const CardRead = ({ article }: CardReadProps) => {
  return (
    <Link href={`/article/${article.id}`} className="card-read__link">
      <div className="card-read">
        <div className="card-read__img__wrap">
          <img
            className="card-read__img"
            src={article.wallpaper.sizes.tablet.url ?? ''}
            alt={article.title}
            loading="lazy"
          />
        </div>
        <div className="card-read_content">
          <div className="card-read_top-bar">
            <div className="card-read__date">
              <span>{formatDate(article.date)}</span>
            </div>
            <div className={'card-read__type'}>
              {article.type === 'News' ? 'Новость' : 'Профилактика'}
            </div>
          </div>
          <div className={'card-read_title'}>
            <h3>{article.title}</h3>
          </div>
          <div className="card-read_text-container">
            <div className="truncate-text">{article.text}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
