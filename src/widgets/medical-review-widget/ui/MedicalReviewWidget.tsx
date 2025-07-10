import React from 'react';
import { Block } from 'shared/ui/block';
import Image from 'shared/assets/image/medical-review-widget-img.png';
import './MedicalReviewWidget.scss';

export const MedicalReviewWidget = () => {
  return (
    <Block className="medical-review-widget">
      <img src={Image.src} alt="" className="medical-review-widget__image" />

      <div className="medical-review-widget__name">
        НЕЗАВИСИМАЯ ОЦЕНКА КАЧЕСТВА УСЛОВИЙ ОКАЗАНИЯ УСЛУГ МЕДИЦИНСКИМИ ОРГАНИЗАЦИЯМИ
      </div>
      <div className="medical-review-widget__link">
        <a
          target="_blank"
          href="https://anketa.minzdrav.gov.ru/ambulator/47ecb287-0529-4111-9ec3-74c06346f95f/44abcc06-c850-4804-b4f2-63e5963b898b"
        >
          Оценить
        </a>
      </div>
    </Block>
  );
};
