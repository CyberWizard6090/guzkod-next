import { RenderBlocks } from 'entities/blocks';
import type { Metadata } from 'next';
import { getPageById } from 'shared/api/pages';
import { Block } from 'shared/ui/block';
import { EmptyPageStub } from 'shared/ui/empty-page-stub';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const data = await getPageById(params.pageId);

  return {
    title: data.namepage,
    openGraph: {
      title: data.namepage,
    },
  };
}

const DefaultPage = async ({ params }: any) => {
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
};

export default DefaultPage;
