import React from 'react';
import { Block } from 'shared/ui/block';
import Image from 'shared/assets/image/national-projects-widget-img.png';
import { Button } from 'shared/ui/button';
import AlignWrapper from 'shared/ui/align-wrapper';

type Props = {};

export const NationalProjectsWidget = (props: Props) => {
  return (
    <Block>
      <img src={Image.src} alt="Национальные проекты России" />
      <AlignWrapper align={'center'}>
      <a href="https://национальныепроекты.рф/" target="_blank">
        <Button>Перейти на сайт</Button>
      </a>
      </AlignWrapper>
    </Block>
  );
};
