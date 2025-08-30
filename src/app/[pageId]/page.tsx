import { RenderBlocks } from 'entities/blocks';
import { getPageById } from 'shared/api/pages';
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

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  const data = await getPageById(params.pageId);

  const pageTitle = data.namepage ?? SITE_NAME;
  const pageDescription = data.description ?? SITE_DESCRIPTION;
  const pageUrl = `${SITE_URL}${params.pageId}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: 'article',
      images: [
        {
          url: data.ogImage ?? OG_IMAGE,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [data.ogImage ?? OG_IMAGE],
    },
  };
};

const DefaultPage = async ({ params }: any) => {
  const data = await getPageById(params.pageId);

  return (
    <>
      {data.layout && data.layout.length > 0 ? (
        <Block>
          <RenderBlocks layout={data.layout} />
        </Block>
      ) : (
        <EmptyState />
      )}
    </>
  );
};

export default DefaultPage;
