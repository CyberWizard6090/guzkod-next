import React from 'react';
import { Block } from 'shared/ui/block';
import Image from 'shared/assets/image/zabaikalmedstrakh-widget-img.png';

export const ZabaikalmedstrakhWidget = () => {
  return (
    <Block>
      <img src={Image.src} alt="Изображение Забайкалмедстрах" />
    </Block>
  );
};
