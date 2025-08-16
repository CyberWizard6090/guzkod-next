import Link from 'next/link';
import { Article } from 'shared/types/article';
import { formatDate } from 'shared/lib/format';

import styles from './ArticleCard.module.scss';

type ArticleCardProps = {
  article: Article;
};

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Link href={`/article/${article.id}`} className={styles['article-card__link']}>
      <div className={styles['article-card']}>
        <div className={styles['article-card__imgWrap']}>
          <img
            className={styles['article-card__img']}
            src={article.wallpaper.sizes.tablet.url ?? ''}
            alt={article.title}
            loading="lazy"
          />
        </div>
        <div className={styles['article-card__content']}>
          <div className={styles['article-card__top-bar']}>
            <div className={styles['article-card__date']}>
              <span>{formatDate(article.date)}</span>
            </div>
            <div className={styles['article-card__type']}>
              {article.type === 'News' ? 'Новость' : 'Профилактика'}
            </div>
          </div>
          <div className={styles['article-card__title']}>
            <h3>{article.title}</h3>
          </div>
          <div className={styles['article-card__textContainer']}>
            <div className={styles['article-card__truncate-text']}>{article.text}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
