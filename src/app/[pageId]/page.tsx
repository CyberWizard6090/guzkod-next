import { RenderBlocks } from 'entities/blocks';
import { Metadata } from 'next';
import { getPageById } from 'shared/api/pages';
import { Block } from 'shared/ui/block';

type Props = {
  params: { pageId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getPageById(params.pageId);
  return {
    title: data.title ?? data.namepage ?? 'Страница',

    openGraph: {
      title: data.title ?? data.namepage ?? 'Страница',
    },
  };
}

export default async function DefaultPage({ params }: Readonly<Props>) {
  const data = await getPageById(params.pageId);

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
