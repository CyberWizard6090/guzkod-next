import { RenderBlocks } from 'entities/blocks';
import { Metadata } from 'next';
import { getArticleById } from 'shared/api/articles';
import { SITE_HOST, SITE_NAME } from 'shared/consts/site.constants';
import { Block } from 'shared/ui/block';

type Props = {
  params: { pageId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getArticleById(params.pageId);
  return {
    title: data.title || data.namepage || 'Страница',
    description: data.text || 'Описание страницы',
    openGraph: {
      title: data.title || data.namepage || 'Страница',
      description: data.text || 'Описание страницы',
      url: `${SITE_HOST}/article/${params.pageId}`,
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
  const data = await getArticleById(params.pageId);

  const date = new Date(data.date).toLocaleString('ru-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Block>
      {data.title && (
        <div>
          <span>{date}</span>
          <h1>{data.title}</h1>
        </div>
      )}
      <RenderBlocks layout={data.layout} />
    </Block>
  );
}
