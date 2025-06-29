import { RenderBlocks } from 'entities/blocks';
import { Metadata } from 'next';
import { getPageById } from 'shared/api/pages';
import { Block } from 'shared/ui/block';
import { EmptyPageStub } from 'shared/ui/empty-page-stub';

type Props = {
  params: { pageId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getPageById(params.pageId);
  return {
    title: data.namepage,

    openGraph: {
      title: data.namepage,
    },
  };
}

export default async function DefaultPage({ params }: Readonly<Props>) {
  const data = await getPageById(params.pageId);

  return (
    <Block>
      {data.layout && data.layout.length > 0 ? (
        <RenderBlocks layout={data.layout} />
      ) : (
        <EmptyPageStub />
      )}
    </Block>
  );
}
