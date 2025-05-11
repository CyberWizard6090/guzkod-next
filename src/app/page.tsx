'use client';

import React, { useEffect, useState } from 'react';
// import './homePage.scss';
import { NewsBlock } from 'widgets/newsBlock';
import { Carousel } from 'widgets/carousel';
import { Banner, SimpleRichText } from 'shared/ui/blocks';
import { Block } from 'shared/ui/block';
import { Page } from 'shared/ui/page';

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
  body: any;
};

type BlockContent = TextBlock | ImageBlock | BannerBlock | CodeBlock | RichTextBlock;

type PageBlock = {
  title: string;
  width: number;
  content: BlockContent[];
};

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
                return <img key={i} src={item.image.url} alt={item.altText || 'Изображение'} />;
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

const HomePage = () => {
  const [pageData, setPageData] = useState<PageBlock[]>([]);

  useEffect(() => {
    fetch('/api/globals/home-page')
      .then((res) => res.json())
      .then((data) => {
        setPageData(data.blocks || []);
      })
      .catch((err) => {
        console.error('Ошибка загрузки страницы:', err);
      });
  }, []);

  return (
    <div className="home animation-reveal">
      <div className="home__content">
        <RenderBlocks blocks={pageData} />
        <NewsBlock />
      </div>
    </div>
  );
};

export default HomePage;
