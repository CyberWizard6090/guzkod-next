import { RenderBlocks } from 'entities/blocks';
import { getPage } from 'shared/api/pages';
import { Block } from 'shared/ui/block';
import { EmptyState } from 'shared/ui/empty-state';

import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
  SITE_LOCALE,
  OG_IMAGE,
} from 'shared/consts/site.constants';

import type { Metadata } from 'next';

type PageParams = {
  pageId: string;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> => {
  const { pageId } = await params;
  const data = await getPage(pageId);
  const pageTitle = data.meta?.title || data.namepage || SITE_NAME;
  const pageDescription = data.meta?.description || data.description || SITE_DESCRIPTION;
  const pageUrl = `${SITE_URL}/${data.url || pageId}`;
  const pageImage = data.meta?.image ?? data.ogImage ?? OG_IMAGE;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      images: [{ url: pageImage, width: 1200, height: 630, alt: pageTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
    },
  };
};

const DefaultPage = async ({ params }: { params: Promise<PageParams> }) => {
  const { pageId } = await params;

  const data = await getPage(pageId);
  if (!data) return <EmptyState />;

  return (
    <Block>
      <RenderBlocks layout={data.layout ?? []} />
    </Block>
  );
};

export default DefaultPage;
