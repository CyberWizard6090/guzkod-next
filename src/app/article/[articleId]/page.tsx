import { RenderBlocks } from 'entities/blocks';
import { Metadata } from 'next';
import { getArticleById } from 'shared/api/articles';
import { SITE_HOST } from 'shared/consts/site.constants';
import { Block } from 'shared/ui/block';
import 'shared/styles/pages/article.scss';
import { ShareButton } from 'features/share';
import AlignWrapper from 'shared/ui/align-wrapper';
import { cleanMetaDescription } from 'shared/lib/seo/cleanMetaDescription';
import { formatDate } from 'shared/lib/format';

type PageParams = {
  articleId: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { articleId } = await params;
  const data = await getArticleById(articleId);
  const title = `${data.type === 'News' ? 'Новость' : 'Профилактика'}: ${data.title ?? data.namepage}`;
  const description = cleanMetaDescription({ text: data.text });
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: data.text,
      url: `${SITE_HOST}/article/${articleId}`,
    },
  };
}

const ArticlePage = async ({ params }: { params: Promise<PageParams> }) => {
  const { articleId } = await params;
  const data = await getArticleById(articleId);

  return (
    <Block>
      {data.title && (
        <div className="article">
          <div className="article__header">
            <div className="article__type">{data.type === 'News' ? 'Новость' : 'Профилактика'}</div>
            <span className="article__date">{formatDate(data.date)}</span>
          </div>
          <h1 className="article__title">{data.title}</h1>
        </div>
      )}
      <RenderBlocks layout={data.layout} />
      <AlignWrapper align="right">
        <ShareButton title={'data.title'} />
      </AlignWrapper>
    </Block>
  );
};
export default ArticlePage;
