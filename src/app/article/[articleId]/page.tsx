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

type Props = {
  params: { articleId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getArticleById(params.articleId);
  const title = `Вакансия: ${data.title ?? data.namepage}`;
  const description = cleanMetaDescription({ text: data.text });
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: data.text,
      url: `${SITE_HOST}/article/${params.articleId}`,
    },
  };
}

export default async function DefaultPage({ params }: Props) {
  const data = await getArticleById(params.articleId);

  return (
    <Block>
      {data.title && (
        <div className="content-block">
          <span className="date-text">{formatDate(data.date)}</span>
          <h1 className="title-heading">{data.title}</h1>
        </div>
      )}
      <RenderBlocks layout={data.layout} />
      <AlignWrapper align="right">
        <ShareButton title={'data.title'} />
      </AlignWrapper>
    </Block>
  );
}
