import React from 'react';
import Image from 'shared/assets/image/takzdorovo-widget-img.png';
import AlignWrapper from 'shared/ui/align-wrapper';
import { Block } from 'shared/ui/block';
import { Button } from 'shared/ui/button';

export const TakzdorovoWidget = () => {
  return (
    <Block>
      <img src={Image.src} alt="Так здорово" />
      <AlignWrapper align={'center'}>
        <a href="https://www.takzdorovo.ru/" target="_blank">
          <Button>Перейти на сайт</Button>
        </a>
      </AlignWrapper>
    </Block>
  );
};
