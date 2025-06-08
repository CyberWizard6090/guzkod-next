import { RenderBlocks } from 'entities/blocks';
import { Metadata } from 'next';
import { getArticleById } from 'shared/api/articles';
import { SITE_HOST, SITE_NAME } from 'shared/consts/site.constants';
import { Block } from 'shared/ui/block';
import 'shared/styles/pages/article.scss';
import { ShareButton } from 'features/share';
import AlignWrapper from 'shared/ui/align-wrapper';

type Props = {
  params: { articleId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getArticleById(params.articleId);
  return {
    title: data.title || data.namepage,
    description: data.text,
    openGraph: {
      title: data.title || data.namepage,
      description: data.text,
      url: `${SITE_HOST}/article/${params.articleId}`,
      siteName: SITE_NAME,
      images: [
        {
          url: data.wallpaper.sizes.tablet.url || '',
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export default async function DefaultPage({ params }: Props) {
  const data = await getArticleById(params.articleId);

  const date = new Date(data.date).toLocaleString('ru-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Block>
      {data.title && (
        <div className="content-block">
          <span className="date-text">{date}</span>
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
