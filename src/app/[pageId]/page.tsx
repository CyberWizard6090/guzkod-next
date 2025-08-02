import { RenderBlocks } from 'entities/blocks';
import { getPageById } from 'shared/api/pages';
import { Block } from 'shared/ui/block';
import { EmptyPageStub } from 'shared/ui/empty-page-stub';

import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
  SITE_LOCALE,
  OG_IMAGE,

} from 'shared/consts/site.constants';

import type { Metadata } from 'next';

type Params = {
  params: {
    pageId: string;
  };
};


export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
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


export const DefaultPage = async ({ params }: Params) => {
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
