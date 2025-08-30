import { ArticleList } from 'features/article-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Новости и профилактика',
  description:
    'На этой странице вы можете прочитать последние новости и статьи о профилактике заболеваний',
  openGraph: {
    title: 'Новости и профилактика',
    description:
      'На этой странице вы можете прочитать последние новости и статьи о профилактике заболеваний',
  },
  twitter: {
    title: 'Новости и профилактика',
    description:
      'На этой странице вы можете прочитать последние новости и статьи о профилактике заболеваний',
  },
};
const ArticlePage = () => {
  return <ArticleList />;
};
export default ArticlePage;
