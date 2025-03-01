import React, { useEffect, useState } from 'react';
import './homePage.scss';
import { NewsBlock } from 'widgets/newsBlock';
import { Carousel } from 'widgets/carousel';
import { Banner, SimpleRichText } from 'shared/ui/blocks';
import { Block } from 'shared/ui/block';

type TextBlock = {
  blockType: 'text';
  text: string;
};

type ImageBlock = {
  blockType: 'image';
  image: {
    url: string;
  };
  altText?: string;
};

type BannerBlock = {
  blockType: 'banner-block';
  selectedBanners: {
    id: string;
    image: {
      sizes: any;
      url: string;
    };
    text?: string;
    buttonLink?: string;
    showButton?: boolean;
  }[];
};

type CodeBlock = {
  blockType: 'code';
  code: string;
};

type Block = {
  title: string;
  width: number;
  content: (TextBlock | ImageBlock | BannerBlock | CodeBlock | any)[];
};

type RenderBlocksProps = {
  blocks: Block[];
};

const RenderBlocks: React.FC<RenderBlocksProps> = ({ blocks }) => {
  return (
    <div className="table-page">
      {blocks.map((block, index) => (
        <div key={index} className="Cell" style={{ width: `${block.width}%` }}>
          {block.title.trim() ? <h2>{block.title}</h2> : <></>}
          {block.content.map((contentItem, i) => {
            switch (contentItem.blockType) {
              case 'text':
                return (
                  <Block>
                    {' '}
                    <p key={i}>
                      {' '}
                      <pre>{contentItem.text} </pre>
                    </p>
                  </Block>
                );
              case 'image':
                return (
                  <img
                    key={i}
                    src={contentItem.image.url}
                    alt={contentItem.altText || 'Изображение'}
                  />
                );
              case 'banner-block':
                return (
                  <Carousel key={i}>
                    {contentItem.selectedBanners.map((banner: any) => (
                      <>
                        {' '}
                        {console.log(banner)}
                        <Banner
                          key={i}
                          image={banner.image.url}
                          link={banner.buttonLink}
                          title={banner.text}
                          buttonDisabled={banner.showButton}
                        />
                      </>
                    ))}
                  </Carousel>
                );
              case 'code':
                return (
                  <pre key={i}>
                    <code>{contentItem.code}</code>
                  </pre>
                );
              case 'simpleRichText':
                return (
                  <Block>
                    <SimpleRichText body={contentItem.body} />{' '}
                  </Block>
                );
              default:
                return null;
            }
          })}
        </div>
      ))}
    </div>
  );
};

export const HomePage = () => {
  const url = '/api/globals/home-page';
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched blocks:', data.blocks); // Inspect fetched data
        setPageData(data.blocks);
      })
      .catch((err) => {
        console.error('Fetch error:', err.message);
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
