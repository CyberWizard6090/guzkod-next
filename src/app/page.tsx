/* eslint-disable react/prop-types */
import { NewsBlock } from 'widgets/news-block';
import { Carousel } from 'widgets/carousel';
import { Banner, SimpleRichText } from 'shared/ui/blocks';
import { Block } from 'shared/ui/block';
import { Page } from 'shared/ui/page';
import { getHomePage } from 'shared/api/home';
import 'shared/styles/pages/home-page.scss';

type TextBlock = {
  blockType: 'text';
  text: string;
};

type ImageBlock = {
  blockType: 'image';
  image: { url: string };
  altText?: string;
};

type BannerBlock = {
  blockType: 'banner-block';
  selectedBanners: {
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: { sizes: any; url: string };
    text?: string;
    buttonLink?: string;
    showButton?: boolean;
  }[];
};

type CodeBlock = {
  blockType: 'code';
  code: string;
};

type RichTextBlock = {
  blockType: 'simpleRichText';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
};

type BlockContent = TextBlock | ImageBlock | BannerBlock | CodeBlock | RichTextBlock;

type PageBlock = {
  title: string;
  width: number;
  content: BlockContent[];
};

// eslint-disable-next-line react/prop-types
const RenderBlocks: React.FC<{ blocks: PageBlock[] }> = ({ blocks }) => {
  return (
    <Page>
      {blocks.map((block, index) => (
        <div key={index} className="Cell" style={{ width: `${block.width}%` }}>
          {block.title?.trim() && <h2>{block.title}</h2>}

          {block.content.map((item, i) => {
            switch (item.blockType) {
              case 'text':
                return (
                  <Block key={i}>
                    <pre>{item.text}</pre>
                  </Block>
                );
              case 'image':
                return (
                  <img
                    key={i}
                    className="shadow__style"
                    src={item.image.url}
                    alt={item.altText ?? 'Изображение'}
                  />
                );
              case 'banner-block':
                return (
                  <Carousel key={i}>
                    {item.selectedBanners.map((banner) => (
                      <Banner
                        key={banner.id}
                        image={banner.image.url}
                        link={banner.buttonLink}
                        title={banner.text}
                        buttonDisabled={!banner.showButton}
                      />
                    ))}
                  </Carousel>
                );
              case 'code':
                return (
                  <pre key={i}>
                    <code>{item.code}</code>
                  </pre>
                );
              case 'simpleRichText':
                return (
                  <Block key={i}>
                    <SimpleRichText body={item.body} />
                  </Block>
                );
              default:
                return null;
            }
          })}
        </div>
      ))}
    </Page>
  );
};

export default async function HomePage() {
  const data = await getHomePage();

  return (
    <Page>
      <RenderBlocks blocks={data.blocks} />
      <NewsBlock />
    </Page>
  );
}
