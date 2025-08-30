import Link from 'next/link';
import { Block } from 'shared/ui/block';
import { Button } from 'shared/ui/button';

import { VerticalContainer } from 'shared/ui/vertical-container';
import AlignWrapper from 'shared/ui/align-wrapper';
import { Metadata } from 'next';
import { ReviewList } from 'features/reviews-list';

export const metadata: Metadata = {
  title: 'Отзывы',
  description: 'Форма для отправки отзыва',
};

const ReviewsPage = () => {
  return (
    <VerticalContainer>
      <Block>
        <h2>Оставьте свой отзыв</h2>
        <p>Нам важно ваше мнение! Пожалуйста, поделитесь своим опытом.</p>
        <AlignWrapper align={'right'}>
          <Link href={'/reviews/form'}>
            <Button>Оставить отзыв</Button>
          </Link>
        </AlignWrapper>
      </Block>

      <ReviewList />
    </VerticalContainer>
  );
};
export default ReviewsPage;
